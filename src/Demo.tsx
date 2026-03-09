import DeepSwipeCarousel from './components/DeepSwipeCarousel';
import StickyLayerBuild from './components/StickyLayerBuild';
import ScrollReveal, { StillPoint } from './components/ScrollReveal';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import type { CSSProperties } from 'react';

const section: CSSProperties = {
  padding: '40px 16px',
  borderBottom: '1px solid #ddd',
};

const heading: CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
};

const grey: CSSProperties = {
  background: '#e0e0e0',
  padding: 24,
  textAlign: 'center',
};

export default function Demo() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* ---- 1. DeepSwipeCarousel ---- */}
      <div style={section}>
        <div style={heading}>1. DeepSwipeCarousel</div>
        <DeepSwipeCarousel
          cards={Array.from({ length: 5 }, (_, i) => (
            <div style={grey}>Card {i + 1}</div>
          ))}
          detailContent={
            <div>
              <h2>Detail View</h2>
              <p>Swipe past the last card to see this.</p>
              <p>Swipe from left edge or press Back to close.</p>
              <div
                style={{ ...grey, height: 300, marginTop: 16 }}
              >
                Placeholder detail content
              </div>
            </div>
          }
          onDetailOpen={() => console.log('detail opened')}
          onDetailClose={() => console.log('detail closed')}
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
          Swipe past last card to open detail view
        </p>
      </div>

      {/* ---- 2. StickyLayerBuild ---- */}
      <div style={section}>
        <div style={heading}>2. StickyLayerBuild</div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
          Scroll down — layers appear one by one
        </p>
        <StickyLayerBuild
          layers={[
            () => (
              <svg width="300" height="300">
                <rect
                  x="10"
                  y="10"
                  width="280"
                  height="280"
                  fill="#ddd"
                  stroke="#aaa"
                />
              </svg>
            ),
            () => (
              <svg width="300" height="300">
                <rect
                  x="40"
                  y="40"
                  width="220"
                  height="220"
                  fill="#ccc"
                  stroke="#999"
                />
              </svg>
            ),
            () => (
              <svg width="300" height="300">
                <circle cx="150" cy="150" r="80" fill="#bbb" stroke="#888" />
              </svg>
            ),
            () => (
              <svg width="300" height="300">
                <circle cx="150" cy="150" r="40" fill="#aaa" stroke="#777" />
              </svg>
            ),
          ]}
          triggerHeight={80}
        />
      </div>

      {/* ---- 3. ScrollReveal ---- */}
      <div style={section}>
        <div style={heading}>3. ScrollReveal</div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
          Items reveal as they scroll into view
        </p>

        <ScrollReveal>
          <div style={{ ...grey, marginBottom: 16 }}>
            Single reveal block
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} style={{ ...grey, marginBottom: 12 }}>
              Staggered item {i + 1}
            </div>
          ))}
        </ScrollReveal>

        <StillPoint>
          <div style={grey}>StillPoint — centered content</div>
        </StillPoint>
      </div>

      {/* ---- 4. HorizontalScrollSection ---- */}
      <div style={section}>
        <div style={heading}>4. HorizontalScrollSection</div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
          Vertical scroll maps to horizontal movement (touch: swipe sideways)
        </p>
      </div>
      <HorizontalScrollSection
        items={Array.from({ length: 6 }, (_, i) => (
          <div style={{ fontSize: 24 }}>Item {i + 1}</div>
        ))}
        scrollHeight={300}
      />

      {/* Footer spacer */}
      <div style={{ height: '50vh', ...section }}>
        <div style={heading}>End of demo</div>
        <p>All four components rendered above.</p>
      </div>
    </div>
  );
}
