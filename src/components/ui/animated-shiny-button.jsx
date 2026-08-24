function AnimatedShinyButton({ children, href, download, type = "button", onClick, disabled, className = "" }) {
  const classes = `shiny-button ${className}`.trim();

  if (href) {
    return (
      <a href={href} download={download} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export default AnimatedShinyButton;
