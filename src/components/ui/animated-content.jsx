import { useEffect, useRef, useState } from "react";

// React Bits'in AnimatedContent bileşenindeki gibi yön (direction) ve ters
// yön (reverse) desteği: varsayılan "vertical" + reverse=false, mevcut tüm
// kullanım yerlerini (aşağıdan yukarıya belirme) hiç değiştirmeden korur.
// Proje satırları gibi yerlerde direction="horizontal" ile soldan/sağdan
// kayarak giren bir varyant elde edilir.
function AnimatedContent({
  children,
  delay = 0,
  onScroll = false,
  direction = "vertical",
  reverse = false,
  distance = 24,
  className = "",
}) {
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!onScroll)
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [onScroll]);

  if (!onScroll) {
    return (
      <div
        className={`hero-enter ${className}`.trim()}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }

  const enterX = direction === "horizontal" ? (reverse ? distance : -distance) : 0;
  const enterY = direction === "vertical" ? (reverse ? -distance : distance) : 0;

  return (
    <div
      ref={contentRef}
      className={`${isVisible ? "content-enter is-visible" : "content-enter"} ${className}`.trim()}
      style={{
        transitionDelay: `${delay}ms`,
        "--enter-x": `${enterX}px`,
        "--enter-y": `${enterY}px`,
      }}
    >
      {children}
    </div>
  );
}

export default AnimatedContent;
