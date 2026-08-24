import { useRef } from "react";

function SpecularButton({ as: Tag = "a", className = "", children, ...rest }) {
  const buttonRef = useRef(null);

  const handleMouseMove = (event) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    button.style.setProperty("--specular-x", `${event.clientX - rect.left}px`);
    button.style.setProperty("--specular-y", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className={`specular-button ${className}`.trim()}
      {...rest}
    >
      <span className="specular-button-glow" aria-hidden="true" />
      <span className="specular-button-content">{children}</span>
    </Tag>
  );
}

export default SpecularButton;
