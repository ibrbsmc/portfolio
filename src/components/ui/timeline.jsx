import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "./spotlight-card";

gsap.registerPlugin(ScrollTrigger);

function Timeline({ data }) {
  const containerRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );

      // Yolculuk kartları da sitedeki diğer tüm scroll animasyonlarıyla aynı
      // yönde (aşağıdan yukarıya doğru belirerek) girer; önceden burada
      // yatay (x) bir kayma kullanılıyordu, bu da diğer bölümlerle
      // tutarsızdı.
      const items = containerRef.current.querySelectorAll(".timeline-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={containerRef} className="timeline relative">
      <div className="timeline-line">
        <div ref={fillRef} className="timeline-line-fill" />
      </div>

      <div className="flex flex-col gap-7">
        {data.map((item) => (
          <div className="timeline-item flex gap-5" key={item.heading}>
            <div className="flex w-6 flex-none justify-center">
              <span className="timeline-dot" />
            </div>

            <SpotlightCard className="timeline-card flex-1">
              <div className="timeline-meta">
                <span>{item.type}</span>
                <small>{item.period}</small>
              </div>
              <h4>{item.heading}</h4>
              {item.subheading && (
                <p className="timeline-subheading">{item.subheading}</p>
              )}
              <p>{item.description}</p>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
