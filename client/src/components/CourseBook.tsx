import type { ComponentPropsWithoutRef } from "react";
import styles from "./CourseBook.module.css";

export default function CourseBook({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"main">) {
  return <main className={`${className} ${styles.book}`} {...props} />;
}
