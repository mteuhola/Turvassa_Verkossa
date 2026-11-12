const LockIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect
      x="5"
      y="11"
      width="14"
      height="10"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M8 11V7a4 4 0 018 0v4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16" r="1.5" fill={color} />
  </svg>
);

const EmailIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="6"
      width="18"
      height="13"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M3 9l9 6 9-6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 14l3-3M15 11l3 3"
      stroke="#E24B4A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MaskIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.5
         C7.5 2.5 4.5 5.5 4.5 10
         C4.5 13 5.5 16 7.5 18.5
         C9 20.3 10.5 21.5 12 21.5
         C13.5 21.5 15 20.3 16.5 18.5
         C18.5 16 19.5 13 19.5 10
         C19.5 5.5 16.5 2.5 12 2.5 Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    <path
      d="M12 2.5
         C7.5 2.5 4.5 5.5 4.5 10
         C4.5 13 5.5 16 7.5 18.5
         C9 20.3 10.5 21.5 12 21.5
         L12 2.5 Z"
      fill={color}
      opacity="0.5"
    />

    <ellipse cx="9" cy="10.5" rx="1.1" ry="1.2" fill={color} opacity="0.9" />

    <ellipse
      cx="15"
      cy="10.5"
      rx="1.1"
      ry="1.4"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
    />

    <path
      d="M10 16.3 Q11 15.6 12 16.2"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />

    <path
      d="M12 16.2 Q13 17.2 14 15.8"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export function CourseIcon({ courseId }: { courseId: string }) {
  switch (courseId) {
    case "passwords":
      return <LockIcon color="currentColor" />;
    case "phishing":
      return <EmailIcon color="currentColor" />;
    case "financial-fraud":
      return <MaskIcon color="currentColor" />;
    default:
      return null;
  }
}
