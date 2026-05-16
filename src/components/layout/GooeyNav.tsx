import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: string[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 150, // Ultra Fast
  particleCount = 10,
  particleDistances = [70, 5],
  particleR = 80,
  timeVariance = 50, // Minimal variance for snappiness
  colors = ['#22c55e', '#10b981', '#ffffff', '#ffffff'],
  initialActiveIndex = -1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const location = useLocation();
  
  // Find current active index based on route
  const currentPath = location.pathname + location.hash;
  const foundIndex = items.findIndex(item => item.href === currentPath);
  const [activeIndex, setActiveIndex] = useState<number>(foundIndex !== -1 ? foundIndex : initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', p.color);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const link = element.querySelector('a') || element;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = link.getBoundingClientRect();
    
    const x = pos.left - containerRect.left;
    const y = pos.top - containerRect.top;
    
    filterRef.current.style.width = `${pos.width}px`;
    filterRef.current.style.height = `${pos.height}px`;
    filterRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    textRef.current.style.width = `${pos.width}px`;
    textRef.current.style.height = `${pos.height}px`;
    textRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    textRef.current.innerText = (link as HTMLElement).innerText;
    
    filterRef.current.style.opacity = '1';
    textRef.current.style.opacity = '1';
  };

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent, index: number) => {
    const liEl = (e.currentTarget as HTMLElement).closest('li');
    if (!liEl || activeIndex === index) return;
    
    setActiveIndex(index);
    updateEffectPosition(liEl);
    
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current!.removeChild(p));
      filterRef.current.classList.remove('active');
      void filterRef.current.offsetWidth;
      filterRef.current.classList.add('active');
      makeParticles(filterRef.current);
    }
    
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      if (textRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.classList.add('active');
      }
      if (filterRef.current) {
        filterRef.current.style.opacity = '1';
        filterRef.current.classList.add('active');
      }
    } else {
      if (textRef.current) textRef.current.style.opacity = '0';
      if (filterRef.current) filterRef.current.style.opacity = '0';
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  // Handle outside route changes
  useEffect(() => {
    const found = items.findIndex(item => item.href === currentPath);
    if (found !== -1 && found !== activeIndex) {
      setActiveIndex(found);
    }
  }, [currentPath]);

  return (
    <div className="relative" ref={containerRef}>
      <style>
        {`
          .effect {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
            transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), width 0.2s cubic-bezier(0.22, 1, 0.36, 1), height 0.2s cubic-bezier(0.22, 1, 0.36, 1);
            transform-origin: top left;
          }
          .effect.text {
            color: #ffffff;
            font-size: 0.875rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            pointer-events: none;
            z-index: 10;
          }
          .effect.text.active {
            color: #000000;
          }
          .effect.filter {
            z-index: 1;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: #22c55e;
            border-radius: 9999px;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            opacity: 0;
            transform: scale(0.8);
          }
          .effect.active::after {
            opacity: 1;
            transform: scale(1);
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 150ms;
            position: absolute;
            top: calc(50% - 6px);
            left: calc(50% - 6px);
            animation: particle calc(var(--time)) ease 1;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          
          .nav-item-gooey {
            position: relative;
            z-index: 5;
            color: rgba(255, 255, 255, 0.5);
            transition: color 0.2s ease;
          }
          .nav-item-gooey.active {
            color: transparent !important;
          }
          .nav-item-gooey:hover {
            color: #22c55e;
          }
        `}
      </style>
      
      <nav className="flex relative items-center">
        <ul
          ref={navRef}
          className="flex gap-4 list-none p-0 m-0 relative z-[3]"
        >
          {items.map((item, index) => {
            const isHash = item.href.includes('#');
            const isActive = activeIndex === index;
            
            const linkProps = {
              onClick: (e: any) => handleClick(e, index),
              className: `nav-item-gooey block px-5 py-2 text-sm font-semibold tracking-wide outline-none ${isActive ? 'active' : ''}`,
            };

            return (
              <li key={index} className="relative">
                <Link 
                  to={item.href} 
                  {...linkProps}
                  onClick={(e) => {
                    // Call the visual effect click handler
                    handleClick(e as any, index);
                    
                    if (isHash) {
                      const id = item.href.split('#')[1];
                      const element = document.getElementById(id);
                      if (element) {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
