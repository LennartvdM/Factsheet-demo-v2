import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react';

export interface DeepSwipeCarouselProps {
  cards: ReactNode[];
  detailContent?: ReactNode;
  onDetailOpen?: () => void;
  onDetailClose?: () => void;
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  card: {
    flex: '0 0 85%',
    scrollSnapAlign: 'start',
    minHeight: 200,
    border: '1px solid #ccc',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    boxSizing: 'border-box',
    padding: 16,
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 6,
    padding: '8px 0',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#ccc',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  dotActive: {
    background: '#666',
  },
  detail: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: 9999,
    overflowY: 'auto',
    transition: 'transform 300ms ease',
  },
  backBtn: {
    position: 'sticky' as const,
    top: 0,
    left: 0,
    zIndex: 1,
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer',
  },
};

export default function DeepSwipeCarousel({
  cards,
  detailContent,
  onDetailOpen,
  onDetailClose,
}: DeepSwipeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const parentScrollRef = useRef(0);

  // Track deep swipe via touch
  const touchStartXRef = useRef(0);
  const atEndRef = useRef(false);
  const deepSwipeDeltaRef = useRef(0);

  // Track deep swipe via wheel
  const wheelAccumRef = useRef(0);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detail edge-swipe close
  const detailTouchStartRef = useRef({ x: 0, y: 0, edge: false });

  const isAtScrollEnd = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return false;
    return el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
  }, []);

  // Scroll position tracking for dot indicators
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.clientWidth * 0.85 + 8;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, cards.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [cards.length]);

  // Touch-based deep swipe detection
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      atEndRef.current = isAtScrollEnd();
      deepSwipeDeltaRef.current = 0;
    },
    [isAtScrollEnd]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!atEndRef.current && !isAtScrollEnd()) return;
      atEndRef.current = true;
      const delta = touchStartXRef.current - e.touches[0].clientX;
      if (delta > 0) {
        deepSwipeDeltaRef.current = delta;
      }
    },
    [isAtScrollEnd]
  );

  const handleTouchEnd = useCallback(() => {
    if (deepSwipeDeltaRef.current > 80) {
      openDetail();
    }
    deepSwipeDeltaRef.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wheel-based deep swipe detection (desktop)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isAtScrollEnd()) {
        wheelAccumRef.current = 0;
        return;
      }
      if (e.deltaX > 0) {
        wheelAccumRef.current += e.deltaX;
      }
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        wheelAccumRef.current = 0;
      }, 300);
      if (wheelAccumRef.current > 150) {
        wheelAccumRef.current = 0;
        openDetail();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAtScrollEnd]
  );

  const openDetail = useCallback(() => {
    parentScrollRef.current = window.scrollY;
    setShowDetail(true);
    onDetailOpen?.();
  }, [onDetailOpen]);

  const closeDetail = useCallback(() => {
    setShowDetail(false);
    onDetailClose?.();
    requestAnimationFrame(() => {
      window.scrollTo(0, parentScrollRef.current);
    });
  }, [onDetailClose]);

  // Detail view edge-swipe close
  const handleDetailTouchStart = useCallback((e: React.TouchEvent) => {
    const x = e.touches[0].clientX;
    detailTouchStartRef.current = {
      x,
      y: e.touches[0].clientY,
      edge: x < 30,
    };
  }, []);

  const handleDetailTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!detailTouchStartRef.current.edge) return;
      const endX = e.changedTouches[0].clientX;
      if (endX - detailTouchStartRef.current.x > 80) {
        closeDetail();
      }
    },
    [closeDetail]
  );

  // Hide scrollbar via style tag
  useEffect(() => {
    const id = 'deep-swipe-scrollbar-hide';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `
        .deep-swipe-scroll::-webkit-scrollbar { display: none; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={styles.wrapper}>
      <div
        ref={scrollRef}
        className="deep-swipe-scroll"
        style={styles.scrollContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {cards.map((card, i) => (
          <div key={i} style={styles.card}>
            {card}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={styles.dots}>
        {cards.map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.dot,
              ...(i === activeIndex ? styles.dotActive : {}),
            }}
            aria-label={`Go to card ${i + 1}`}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardWidth = el.clientWidth * 0.85 + 8;
              el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* Detail view */}
      {showDetail && (
        <div
          style={{
            ...styles.detail,
            transform: 'translateX(0)',
          }}
          onTouchStart={handleDetailTouchStart}
          onTouchEnd={handleDetailTouchEnd}
        >
          <button style={styles.backBtn} onClick={closeDetail}>
            ← Back
          </button>
          <div style={{ padding: 16 }}>
            {detailContent ?? <p>Detail view content</p>}
          </div>
        </div>
      )}
    </div>
  );
}
