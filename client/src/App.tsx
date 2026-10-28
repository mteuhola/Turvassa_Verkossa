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

const Theory = lazy(() => import("./pages/Theory/Theory"));
const SannaActivity = lazy(
  () => import("./pages/PasswordCourse/SannaActivity"),
);

const Quiz = lazy(() => import("./pages/Quiz/Quiz"));
const KaarloActivity = lazy(
  () => import("./pages/PhishingCourse/KaarloActivity"),
);

function App() {
  const textSizeProps = useTextSize();
  const { courses, markComplete, resetProgress } = useCourseProgress();
  const isComplete = (path: string) =>
    courses.some((course) =>
      course.topics.some((topic) => topic.path === path && topic.isComplete),
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/course/romance-fraud/*"
          element={<LegacyFinancialRoute />}
        />
        <Route
          path="/course/financial-fraud/investment-offers"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <InvestmentActivity
                {...textSizeProps}
                isComplete={isComplete(
                  "/course/financial-fraud/investment-offers",
                )}
                onComplete={() =>
                  markComplete("/course/financial-fraud/investment-offers")
                }
              />
            </Suspense>
          }
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
                isComplete={isComplete("/course/passwords/introduction")}
                onComplete={() =>
                  markComplete("/course/passwords/introduction")
                }
              />
            </Suspense>
          }
        />
        <Route
          path="/course/passwords/password-strength"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <PasswordCourse
                key="password-practice"
                {...textSizeProps}
                isComplete={isComplete("/course/passwords/password-strength")}
                onComplete={() =>
                  markComplete("/course/passwords/password-strength")
                }
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
          path="/course/passwords/help-sanna"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <SannaActivity
                {...textSizeProps}
                isComplete={isComplete("/course/passwords/help-sanna")}
                onComplete={() => markComplete("/course/passwords/help-sanna")}
              />
            </Suspense>
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
                  isComplete={isComplete(`/course/phishing/${mode}`)}
                  onComplete={() => markComplete(`/course/phishing/${mode}`)}
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
        <Route
          path="/course/phishing/help-kaarlo"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <KaarloActivity
                {...textSizeProps}
                isComplete={isComplete("/course/phishing/help-kaarlo")}
                onComplete={() => markComplete("/course/phishing/help-kaarlo")}
              />
            </Suspense>
          }
        />
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
                  isComplete={isComplete(`${course.path}/quiz`)}
                  onComplete={() => markComplete(`${course.path}/quiz`)}
                />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
