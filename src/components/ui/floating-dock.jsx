function FloatingDock({ items }) {
  return (
    <div className="floating-dock">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          download={item.download}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          aria-label={item.label}
          className="floating-dock-item"
        >
          <span className="floating-dock-tooltip">{item.label}</span>
          <item.Icon size={18} />
        </a>
      ))}
    </div>
  );
}

export default FloatingDock;
