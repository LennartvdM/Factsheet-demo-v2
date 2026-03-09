import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from 'react';

export interface StickyLayerBuildProps {
  layers: (() => ReactNode)[];
  triggerHeight?: number; // vh per trigger spacer, default 80
}

const styles: Record<string, CSSProperties> = {
  outer: {
    position: 'relative',
    width: '100%',
  },
  stickyContainer: {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 1,
  },
  canvas: {
    position: 'relative',
    width: 300,
    height: 300,
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 600ms ease',
  },
  spacer: {
    position: 'relative',
  },
};

export default function StickyLayerBuild({
  layers,
  triggerHeight = 80,
}: StickyLayerBuildProps) {
  const [visibleLayers, setVisibleLayers] = useState<boolean[]>(
    () => new Array(layers.length).fill(false)
  );
  const spacerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    spacerRefs.current.forEach((spacer, index) => {
      if (!spacer) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Trigger when spacer top crosses ~60% of viewport
            const rect = entry.boundingClientRect;
            const viewportH = window.innerHeight;
            const triggerLine = viewportH * 0.6;
            const isTriggered = rect.top < triggerLine;

            setVisibleLayers((prev) => {
              if (prev[index] === isTriggered) return prev;
              const next = [...prev];
              next[index] = isTriggered;
              return next;
            });
          });
        },
        {
          threshold: Array.from({ length: 20 }, (_, i) => i / 19),
        }
      );

      observer.observe(spacer);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [layers.length]);

  // Also track scroll for more precise triggering
  useEffect(() => {
    const onScroll = () => {
      const viewportH = window.innerHeight;
      const triggerLine = viewportH * 0.6;

      setVisibleLayers((prev) => {
        let changed = false;
        const next = prev.map((visible, i) => {
          const spacer = spacerRefs.current[i];
          if (!spacer) return visible;
          const rect = spacer.getBoundingClientRect();
          const isTriggered = rect.top < triggerLine;
          if (isTriggered !== visible) changed = true;
          return isTriggered;
        });
        return changed ? next : prev;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [layers.length]);

  const totalHeight = triggerHeight * layers.length;

  return (
    <div style={{ ...styles.outer, height: `${totalHeight}vh` }}>
      {/* Sticky visual container */}
      <div style={styles.stickyContainer}>
        <div style={styles.canvas}>
          {layers.map((renderLayer, i) => (
            <div
              key={i}
              style={{
                ...styles.layer,
                opacity: visibleLayers[i] ? 1 : 0,
              }}
            >
              {renderLayer()}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll trigger spacers */}
      {layers.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            spacerRefs.current[i] = el;
          }}
          style={{
            ...styles.spacer,
            height: `${triggerHeight}vh`,
          }}
        />
      ))}
    </div>
  );
}
