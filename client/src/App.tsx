import { courseQuizzes } from "./pages/Quiz/quizData";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import CourseSelection from "./pages/CourseSelection/CourseSelection";
import { useTextSize } from "./useTextSize";
import TopicSelection from "./pages/TopicSelection/TopicSelection";
import { useCourseProgress } from "./progress/useCourseProgress";
import CourseAccess from "./progress/CourseAccess";

const PasswordCourse = lazy(
  () => import("./pages/PasswordCourse/PasswordCourse"),
);

const PhishingLesson = lazy(
  () => import("./pages/PhishingCourse/PhishingLesson"),
);

function LegacyFinancialRoute() {
  const location = useLocation();
  return (
    <Navigate
      replace
      to={
        location.pathname.replace(
          "/course/romance-fraud",
          "/course/financial-fraud",
        ) +
        location.search +
        location.hash
      }
    />
  );
}

const InvestmentActivity = lazy(
  () => import("./pages/FinancialFraud/InvestmentActivity"),
);
const RomanceActivity = lazy(
  () => import("./pages/FinancialFraud/RomanceActivity"),
);

const Theory = lazy(() => import("./pages/Theory/Theory"));
const SannaActivity = lazy(
  () => import("./pages/PasswordCourse/SannaActivity"),
);

const Quiz = lazy(() => import("./pages/Quiz/Quiz"));
const KaarloActivity = lazy(
  () => import("./pages/PhishingCourse/KaarloActivity"),
);

const activityRoutes = [
  { path: "/course/financial-fraud/theory", Component: RomanceActivity },
  {
    path: "/course/financial-fraud/investment-offers",
    Component: InvestmentActivity,
  },
  { path: "/course/passwords/password-strength", Component: PasswordCourse },
  { path: "/course/passwords/help-sanna", Component: SannaActivity },
  { path: "/course/phishing/help-kaarlo", Component: KaarloActivity },
];

function App() {
  const textSizeProps = useTextSize();
  const { courses, markComplete, resetProgress } = useCourseProgress();
  const progressProps = (path: string) => ({
    isComplete: courses.some((course) =>
      course.topics.some((topic) => topic.path === path && topic.isComplete),
    ),
    onComplete: () => markComplete(path),
  });
  return (
    <BrowserRouter>
      <CourseAccess courses={courses}>
        <Routes>
          {activityRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
                  <Component
                    key={path}
                    {...textSizeProps}
                    {...progressProps(path)}
                  />
                </Suspense>
              }
            />
          ))}
          <Route
            path="/course/romance-fraud/*"
            element={<LegacyFinancialRoute />}
          />
          <Route
            path="/"
            element={
              <CourseSelection
                {...textSizeProps}
                progressCourses={courses}
                onResetProgress={resetProgress}
              />
            }
          />
          <Route
            path="/course/passwords/introduction"
            element={
              <Suspense fallback={<p role="status">Ladataan aihetta…</p>}>
                <PasswordCourse
                  key="password-introduction"
                  mode="introduction"
                  {...textSizeProps}
                  {...progressProps("/course/passwords/introduction")}
                />
              </Suspense>
            }
          />
          <Route
            path="/course/passwords/theory"
            element={
              <Navigate replace to="/course/passwords/password-strength" />
            }
          />
          <Route
            path="/course/phishing/suspicious-email"
            element={<Navigate replace to="/course/phishing/introduction" />}
          />
          <Route
            path="/course/phishing/theory"
            element={<Navigate replace to="/course/phishing/safe-responses" />}
          />
          {(["introduction", "safe-responses"] as const).map((mode) => (
            <Route
              key={mode}
              path={`/course/phishing/${mode}`}
              element={
                <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
                  <PhishingLesson
                    key={mode}
                    mode={mode}
                    {...textSizeProps}
                    {...progressProps(`/course/phishing/${mode}`)}
                  />
                </Suspense>
              }
            />
          ))}
          {courses.flatMap((course) =>
            course.topics.map((topic) =>
              topic.kind === "theory" &&
              topic.path !== "/course/phishing/help-kaarlo" &&
              topic.path !== "/course/phishing/introduction" &&
              topic.path !== "/course/passwords/introduction" &&
              topic.path !== "/course/passwords/help-sanna" ? (
                <Route
                  key={topic.path}
                  path={topic.path}
                  element={
                    <Suspense fallback={<p role="status">Ladataan aihetta…</p>}>
                      <Theory
                        key={topic.path}
                        course={course}
                        topic={topic}
                        {...textSizeProps}
                        isComplete={topic.isComplete}
                        onComplete={() => markComplete(topic.path)}
                      />
                    </Suspense>
                  }
                />
              ) : null,
            ),
          )}
          {courses.map((course) => (
            <Route
              key={course.id}
              path={course.path}
              element={<TopicSelection course={course} {...textSizeProps} />}
            />
          ))}
          {courses.map((course) => (
            <Route
              key={`${course.id}-quiz`}
              path={`${course.path}/quiz`}
              element={
                <Suspense fallback={<p role="status">Ladataan tietovisaa…</p>}>
                  <Quiz
                    key={course.id}
                    course={course}
                    quiz={courseQuizzes[course.id]}
                    {...textSizeProps}
                    {...progressProps(`${course.path}/quiz`)}
                  />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </CourseAccess>
    </BrowserRouter>
  );
}

export default App;
