import { useEffect, useRef } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function HackerBackground({ color = "#22d3ee", speed = 0.42, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const fontSize = 18;
    let drops = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array(Math.ceil(canvas.width / fontSize)).fill(1);
    };

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.06)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color;
      context.font = `${fontSize}px monospace`;

      drops.forEach((drop, index) => {
        const character = characters[Math.floor(Math.random() * characters.length)];
        context.fillText(character, index * fontSize, drop * fontSize);

        if (drop * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index] += speed;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}

export default HackerBackground;
