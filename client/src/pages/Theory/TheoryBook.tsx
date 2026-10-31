import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type Ref,
} from "react";
import HTMLFlipBook from "react-pageflip";
import type { TheoryContent } from "./theoryData";
import styles from "./Theory.module.css";
import { turnVisibleSheet } from "./theoryPageTurn";

interface FlipEngine {
  flipNext: (corner: "top" | "bottom") => void;
  flipPrev: (corner: "top" | "bottom") => void;
  turnToPage: (index: number) => void;
  getCurrentPageIndex: () => number;
  getState: () => string;
  getRender: () => Parameters<typeof turnVisibleSheet>[0];
  destroy: () => void;
}
interface FlipHandle {
  pageFlip: () => FlipEngine | undefined;
}
export interface TheoryBookHandle {
  turnTo: (index: number) => void;
}
interface Props {
  ref: Ref<TheoryBookHandle>;
  content: TheoryContent;
  title: string;
  pageIndex: number;
  onPageChange: (index: number) => void;
  onTurningChange: (turning: boolean) => void;
}

function PageContent({
  section,
  index,
  count,
}: {
  section: TheoryContent["sections"][number] | undefined;
  index: number;
  count: number;
}) {
  return (
    <article className={styles.sheetContent}>
      <div className={styles.content}>
        <p className={styles.pageCount}>
          Sivu {index + 1} / {Math.max(1, count)}
        </p>
        {section && (
          <section className={styles.section}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            {section.image && (
              <figure className={styles.figure}>
                <img src={section.image.src} alt={section.image.alt} />
                {section.image.caption && (
                  <figcaption>{section.image.caption}</figcaption>
                )}
              </figure>
            )}
          </section>
        )}
      </div>
    </article>
  );
}

// Remount the engine when measurements change: this version reads sizes only on creation.
function SizedBook({
  width,
  height,
  pages,
  startPage,
  engineRef,
  onPageChange,
  onTurningChange,
}: {
  width: number;
  height: number;
  pages: TheoryContent["sections"];
  startPage: number;
  engineRef: React.RefObject<FlipHandle | null>;
  onPageChange: Props["onPageChange"];
  onTurningChange: Props["onTurningChange"];
}) {
  const layer = useRef<HTMLDivElement>(null);
  const children = useMemo(
    () =>
      (pages.length ? pages : [undefined]).map((section, index) => (
        <div key={index} className={styles.sheet} data-density="hard">
          <PageContent section={section} index={index} count={pages.length} />
        </div>
      )),
    [pages],
  );

  useEffect(() => {
    const handle = engineRef.current;
    return () => {
      // The React wrapper does not dispose its engine on unmount.
      handle?.pageFlip()?.destroy();
    };
  }, [engineRef]);

  return (
    <div ref={layer} className={styles.flipLayer} aria-hidden="true">
      <HTMLFlipBook
        ref={engineRef}
        className={styles.flipBook}
        style={{ width, height }}
        width={width}
        height={height}
        size="fixed"
        minWidth={width}
        maxWidth={width}
        minHeight={height}
        maxHeight={height}
        startPage={startPage}
        usePortrait
        autoSize={false}
        showCover={false}
        drawShadow
        maxShadowOpacity={0.18}
        flippingTime={900}
        startZIndex={1}
        mobileScrollSupport={false}
        clickEventForward={false}
        useMouseEvents={false}
        swipeDistance={30}
        showPageCorners={false}
        // Mouse events are already off. The corner-only guard also blocks
        // programmatic backward flips in the library's portrait layout.
        disableFlipByClick={false}
        renderOnlyPageLengthChange
        onFlip={(event: { data: number }) => onPageChange(event.data)}
        onChangeState={(event: { data: string }) => {
          const turning = event.data !== "read";
          if (layer.current) layer.current.dataset.turning = String(turning);
          onTurningChange(turning);
        }}
      >
        {children}
      </HTMLFlipBook>
    </div>
  );
}

export default function TheoryBook({
  ref,
  content,
  title,
  pageIndex,
  onPageChange,
  onTurningChange,
}: Props) {
  const measurements = useRef<HTMLDivElement>(null);
  const engine = useRef<FlipHandle>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const pages = content.sections;

  useEffect(() => {
    const element = measurements.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const width = element.getBoundingClientRect().width;
      const height = Math.ceil(element.getBoundingClientRect().height);
      setSize((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height },
      );
      onTurningChange(false);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [onTurningChange]);

  useImperativeHandle(
    ref,
    () => ({
      turnTo(index) {
        const flip = engine.current?.pageFlip();
        if (!flip || flip.getState() !== "read") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          flip.turnToPage(index);
        } else if (index > flip.getCurrentPageIndex()) {
          turnVisibleSheet(flip.getRender(), "forward", () =>
            flip.flipNext("top"),
          );
        } else {
          turnVisibleSheet(flip.getRender(), "backward", () =>
            flip.flipPrev("top"),
          );
        }
      },
    }),
    [],
  );

  return (
    <div className={styles.bookViewport}>
      <div
        ref={measurements}
        className={styles.measurements}
        aria-hidden="true"
        inert
      >
        {(pages.length ? pages : [undefined]).map((section, index) => (
          <PageContent
            key={index}
            section={section}
            index={index}
            count={pages.length}
          />
        ))}
      </div>
      {size.width > 0 && size.height > 0 && (
        <SizedBook
          key={`${size.width}:${size.height}`}
          {...size}
          pages={pages}
          startPage={pageIndex}
          engineRef={engine}
          onPageChange={onPageChange}
          onTurningChange={onTurningChange}
        />
      )}
      <div className={styles.screenReaderPage} aria-label={title}>
        <PageContent
          section={pages[pageIndex]}
          index={pageIndex}
          count={pages.length}
        />
      </div>
    </div>
  );
}
