import { useEffect, useRef } from "react";

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  draw() {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) this.shimmer();
    else this.size += this.sizeStep;
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }

    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

const VARIANTS = {
  default: {
    gap: 5,
    speed: 35,
    colors: "#ecfeff,#cffafe,#bae6fd",
    noFocus: false,
  },
};

function getSpeed(value, reducedMotion) {
  const speed = Number.parseInt(value, 10);
  if (speed <= 0 || reducedMotion) return 0;
  return Math.min(speed, 100) * 0.001;
}

function PixelCard({
  as: Tag = "div",
  variant = "default",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  children,
  ...rest
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const previousTimeRef = useRef(performance.now());
  const reducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ).current;

  const settings = VARIANTS[variant] ?? VARIANTS.default;
  const finalGap = gap ?? settings.gap;
  const finalSpeed = speed ?? settings.speed;
  const finalColors = colors ?? settings.colors;
  const finalNoFocus = noFocus ?? settings.noFocus;

  const createPixels = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const { width, height } = container.getBoundingClientRect();
    const context = canvas.getContext("2d");
    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const palette = finalColors.split(",");
    const pixels = [];
    for (let x = 0; x < width; x += Number.parseInt(finalGap, 10)) {
      for (let y = 0; y < height; y += Number.parseInt(finalGap, 10)) {
        const distance = Math.hypot(x - width / 2, y - height / 2);
        pixels.push(
          new Pixel(
            canvas,
            context,
            x,
            y,
            palette[Math.floor(Math.random() * palette.length)],
            getSpeed(finalSpeed, reducedMotion),
            reducedMotion ? 0 : distance,
          ),
        );
      }
    }
    pixelsRef.current = pixels;
  };

  const animate = (method) => {
    animationRef.current = requestAnimationFrame(() => animate(method));
    const now = performance.now();
    const elapsed = now - previousTimeRef.current;
    if (elapsed < 1000 / 60) return;
    previousTimeRef.current = now - (elapsed % (1000 / 60));

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    let allIdle = true;
    pixelsRef.current.forEach((pixel) => {
      pixel[method]();
      if (!pixel.isIdle) allIdle = false;
    });
    if (allIdle) cancelAnimationFrame(animationRef.current);
  };

  const startAnimation = (method) => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => animate(method));
  };

  useEffect(() => {
    createPixels();
    const observer = new ResizeObserver(createPixels);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [finalColors, finalGap, finalSpeed]);

  return (
    <Tag
      ref={containerRef}
      className={`pixel-card ${className}`.trim()}
      onMouseEnter={() => startAnimation("appear")}
      onMouseLeave={() => startAnimation("disappear")}
      onFocus={finalNoFocus ? undefined : () => startAnimation("appear")}
      onBlur={finalNoFocus ? undefined : () => startAnimation("disappear")}
      {...rest}
    >
      <canvas ref={canvasRef} className="pixel-card-canvas" aria-hidden="true" />
      <div className="pixel-card-content">{children}</div>
    </Tag>
  );
}

export default PixelCard;
