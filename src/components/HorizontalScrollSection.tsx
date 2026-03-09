import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from 'react';

export interface HorizontalScrollSectionProps {
  items: ReactNode[];
  scrollHeight?: number; // vh, default 300
}

const styles: Record<string, CSSProperties> = {
  outer: {
    position: 'relative',
    width: '100%',
  },
  sticky: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'hidden',
  },
  track: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    willChange: 'transform',
  },
  item: {
    flex: '0 0 80vw',
    height: '70vh',
    margin: '0 2vw',
    border: '1px solid #ccc',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 300ms ease',
    boxSizing: 'border-box',
    padding: 16,
  },
  // Fallback: plain horizontal scroll
  fallbackContainer: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    padding: '20px 0',
  },
  fallbackItem: {
    flex: '0 0 85vw',
    scrollSnapAlign: 'start',
    height: '60vh',
    margin: '0 2vw',
    border: '1px solid #ccc',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: 16,
  },
};

export default function HorizontalScrollSection({
  items,
  scrollHeight = 300,
}: HorizontalScrollSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [useTouch, setUseTouch] = useState(false);

  // Detect touch device
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setUseTouch(isTouchDevice);
  }, []);

  // Map vertical scroll to horizontal progress
  useEffect(() => {
    if (useTouch) return;

    const onScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const outerHeight = outer.offsetHeight;
      const viewportH = window.innerHeight;
      const scrollableRange = outerHeight - viewportH;

      if (scrollableRange <= 0) {
        setProgress(0);
        return;
      }

      // How far we've scrolled into the section
      const scrolledInto = -rect.top;
      const p = Math.max(0, Math.min(1, scrolledInto / scrollableRange));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [useTouch]);

  // Touch fallback: plain horizontal scroll
  if (useTouch) {
    return (
      <div style={styles.fallbackContainer} className="hss-fallback">
        {items.map((item, i) => (
          <div key={i} style={styles.fallbackItem}>
            {item}
          </div>
        ))}
        <style>{`.hss-fallback::-webkit-scrollbar { display: none; }`}</style>
      </div>
    );
  }

  // Total track width = items * (80vw + 4vw margin)
  const itemWidthVw = 84; // 80 + 4 margin
  const totalTrackVw = itemWidthVw * items.length;
  const translateX = -(totalTrackVw - 100) * progress;

  return (
    <div
      ref={outerRef}
      style={{ ...styles.outer, height: `${scrollHeight}vh` }}
    >
      <div style={styles.sticky}>
        <div
          style={{
            ...styles.track,
            transform: `translateX(${translateX}vw)`,
          }}
        >
          {items.map((item, i) => {
            // Calculate item visibility for fade
            const itemStart = i * itemWidthVw;
            const itemCenter = itemStart + itemWidthVw / 2;
            const viewCenter = -translateX + 50;
            const dist = Math.abs(itemCenter - viewCenter);
            const opacity = Math.max(0.15, 1 - dist / 100);

            return (
              <div key={i} style={{ ...styles.item, opacity }}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
