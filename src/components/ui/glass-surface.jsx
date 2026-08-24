function GlassSurface({ children, className = "" }) {
  return (
    <div className={`glass-surface overflow-hidden transition-all ${className}`}>
      {children}
    </div>
  );
}

export default GlassSurface;
