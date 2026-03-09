import {
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
  Children,
} from 'react';

export interface ScrollRevealProps {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  stagger?: boolean;
  children: ReactNode;
}

export default function ScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  delay = 0,
  stagger = false,
  children,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = stagger
      ? Array.from(container.children) as HTMLElement[]
      : [container];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('scroll-reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin, stagger]);

  // Inject styles once
  useEffect(() => {
    const id = 'scroll-reveal-styles';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `
        .scroll-reveal-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 600ms ease, transform 600ms ease;
        }
        .scroll-reveal-item.scroll-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (stagger) {
    const childArray = Children.toArray(children);
    return (
      <div ref={containerRef}>
        {childArray.map((child, i) => (
          <div
            key={i}
            className="scroll-reveal-item"
            style={{
              transitionDelay: `${delay + i * 150}ms`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="scroll-reveal-item"
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}

// StillPoint: centered content wrapper with 60vh min-height
export interface StillPointProps {
  children: ReactNode;
}

const stillPointStyle: CSSProperties = {
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export function StillPoint({ children }: StillPointProps) {
  return <div style={stillPointStyle}>{children}</div>;
}
