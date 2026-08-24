function LogoLoop({ items }) {
  const loopItems = [...items, ...items];

  return (
    <div className="logo-loop">
      <div className="logo-loop-track">
        {loopItems.map((item, index) => (
          <div className="logo-loop-item" key={`${item.name}-${index}`} title={item.name}>
            <item.Icon size={30} style={{ color: item.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoLoop;
