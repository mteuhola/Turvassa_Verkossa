import styles from "./CourseCompletionBadge.module.css";

export default function CourseCompletionBadge() {
  return (
    <span className={styles.badge}>
      <svg
        aria-hidden="true"
        width="40"
        height="44"
        viewBox="0 0 40 44"
        fill="none"
      >
        <path
          d="M11 7H5v5c0 6 4 9 9 9M29 7h6v5c0 6-4 9-9 9"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M11 4h18v11c0 7-4 11-9 11s-9-4-9-11V4Z"
          fill="#f4ce68"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m20 9 2 4 4 .6-3 3 .7 4.4-3.7-2-3.7 2 .7-4.4-3-3 4-.6Z"
          fill="currentColor"
        />
        <path
          d="M20 26v9m-8 5v-5h16v5H12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>Kurssi suoritettu</span>
    </span>
  );
}
