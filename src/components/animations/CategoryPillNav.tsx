import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export type CategoryItem = {
  label: string;
  id: string;
};

export interface CategoryPillNavProps {
  items: CategoryItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
}

const CategoryPillNav: React.FC<CategoryPillNavProps> = ({
  items,
  activeId,
  onSelect,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#22c55e', // Site Green
  pillColor = 'rgba(255, 255, 255, 0.03)', // Dark transparent
  hoveredPillTextColor = '#000000', // Black text on green circle
  pillTextColor = '#9ca3af', // Gray text
}) => {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        
        // Geometric calculation for the filling circle
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        
        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 1.2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 1.2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 20), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 1.2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    if (document.fonts) document.fonts.ready.then(layout);

    return () => window.removeEventListener('resize', layout);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.4,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: pillTextColor,
    ['--nav-h']: '42px',
    ['--pill-pad-x']: '20px',
    ['--pill-gap']: '8px'
  } as React.CSSProperties;

  return (
    <div className={`w-full overflow-x-auto scrollbar-hide ${className}`} style={cssVars}>
      <ul
        role="menubar"
        className="list-none flex items-center m-0 p-1 h-[var(--nav-h)] w-max"
        style={{ gap: 'var(--pill-gap)' }}
      >
        {items.map((item, i) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id} role="none" className="h-full">
              <button
                role="menuitem"
                onClick={() => onSelect(item.id)}
                className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-bold text-[11px] uppercase tracking-widest cursor-pointer transition-all border border-white/5"
                style={{
                  background: isActive ? 'var(--base)' : 'var(--pill-bg)',
                  color: isActive ? 'var(--hover-text)' : 'var(--pill-text)',
                  paddingLeft: 'var(--pill-pad-x)',
                  paddingRight: 'var(--pill-pad-x)',
                  borderColor: isActive ? 'var(--base)' : 'rgba(255,255,255,0.05)'
                }}
                onMouseEnter={() => !isActive && handleEnter(i)}
                onMouseLeave={() => !isActive && handleLeave(i)}
              >
                {/* Animation Circle */}
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  style={{
                    background: 'var(--base)',
                    willChange: 'transform'
                  }}
                  aria-hidden="true"
                  ref={el => {
                    circleRefs.current[i] = el;
                  }}
                />
                
                <span className="relative inline-block leading-none z-[2]">
                  {/* Default Label */}
                  <span
                    className="pill-label relative z-[2] inline-block"
                    style={{ willChange: 'transform' }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Hover Label (White/Black) */}
                  <span
                    className="pill-label-hover absolute left-0 top-0 z-[3] inline-block w-full text-center"
                    style={{
                      color: 'var(--hover-text)',
                      willChange: 'transform, opacity',
                      opacity: 0
                    }}
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white z-[10]"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryPillNav;
