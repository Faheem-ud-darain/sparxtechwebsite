import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function createCardTexture(
  gl: GL,
  data: {
    text: string;
    author: string;
    designation: string;
    service: string;
    rating: number;
  }
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get 2d context');

  const width = 800;
  const height = 1000;
  canvas.width = width;
  canvas.height = height;

  // 1. Draw Background
  context.fillStyle = '#0a0a0a';
  context.fillRect(0, 0, width, height);

  // 2. Draw Stars (Golden)
  const rating = Number(data.rating) || 5;
  context.font = '54px serif';
  context.fillStyle = '#FFD700'; // Golden color
  context.textAlign = 'left';
  context.fillText('★'.repeat(rating) + '☆'.repeat(5 - rating), 60, 100);

  // 3. Draw Service in Pill Style
  const serviceText = data.service.toUpperCase();
  context.font = 'bold 22px Figtree';
  const textMetrics = context.measureText(serviceText);
  const pillWidth = textMetrics.width + 80;
  const pillHeight = 44;
  const pillX = 60;
  const pillY = 140;

  // Pill background
  context.fillStyle = 'rgba(255, 255, 255, 0.05)';
  context.beginPath();
  context.roundRect(pillX, pillY, pillWidth, pillHeight, 22);
  context.fill();
  context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  context.lineWidth = 1;
  context.stroke();

  // Glow dot
  context.fillStyle = '#4ade80';
  context.shadowBlur = 10;
  context.shadowColor = '#4ade80';
  context.beginPath();
  context.arc(pillX + 25, pillY + pillHeight / 2, 6, 0, Math.PI * 2);
  context.fill();
  context.shadowBlur = 0; // Reset shadow

  // Service text
  context.fillStyle = '#ffffff';
  context.fillText(serviceText, pillX + 50, pillY + pillHeight / 2 + 8);

  // 4. Draw Review Text (Wrapped)
  context.font = '46px Figtree';
  context.fillStyle = '#ffffff';
  const words = data.text.split(' ');
  let line = '';
  let y = 300;
  const maxWidth = width - 120;
  const lineHeight = 65;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      context.fillText(line, 60, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, 60, y);

  // 5. Draw Author Name (Gradient)
  context.font = 'bold 52px Figtree';
  const authorName = data.author;
  const authorMetrics = context.measureText(authorName);
  const gradient = context.createLinearGradient(60, 0, 60 + authorMetrics.width, 0);
  gradient.addColorStop(0, '#4ade80');
  gradient.addColorStop(1, '#6ee7b7');
  context.fillStyle = gradient;
  context.fillText(authorName, 60, height - 120);

  // 6. Draw Designation
  context.font = '32px Figtree';
  context.fillStyle = 'rgba(255, 255, 255, 0.5)';
  context.fillText(data.designation, 60, height - 70);

  const texture = new Texture(gl, { 
    generateMipmaps: true,
    minFilter: gl.LINEAR_MIPMAP_LINEAR,
    magFilter: gl.LINEAR
  });
  texture.image = canvas;
  return { texture, width, height };
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  data: any;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  data: any;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  program!: Program;
  plane!: Mesh;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({
    geometry,
    gl,
    index,
    length,
    renderer,
    scene,
    screen,
    data,
    viewport,
    bend,
    textColor,
    borderRadius = 0
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.data = data;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const { texture } = createCardTexture(this.gl, this.data);
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec4 color = texture2D(tMap, vUv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      const maxArc = R - Math.sqrt(R * R - H * H);
      
      this.plane.position.y = (this.bend > 0 ? -arc : arc) + (this.bend > 0 ? maxArc / 2 : -maxArc / 2);
      this.plane.rotation.z = (this.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / R);
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    const isMobile = this.screen.width < 768;
    this.plane.scale.y = this.viewport.height * (isMobile ? 0.5 : 0.85);
    this.plane.scale.x = this.plane.scale.y * (800 / 1000);
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = isMobile ? 1.0 : 2.0;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: any[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;

  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;

  isDown: boolean = false;
  start: number = 0;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = '#ffffff',
      borderRadius = 0,
      scrollSpeed = 2,
      scrollEase = 0.05
    }: AppConfig
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createCameraPerspective() {
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias(
    items: any[] | undefined,
    bend: number = 1,
    textColor: string,
    borderRadius: number
  ) {
    if (!items) return;
    const galleryItems = items;
    this.medias = galleryItems.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        index,
        length: galleryItems.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        data,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: Event) {
    const wheelEvent = e as WheelEvent;
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

interface CircularGalleryProps {
  items?: any[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      scrollSpeed,
      scrollEase
    });
    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, scrollSpeed, scrollEase]);
  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
}
