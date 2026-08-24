// NavLinks componenti, navbar'daki bağlantıları ekrana basar.
function NavLinks({ items, isOpen, activeItem, onSelect }) {
  return (
    <div
      className={`${isOpen ? "flex" : "hidden"} flex-col gap-1 md:flex md:flex-row`}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={() => onSelect(item.label)}
          className={`pill-nav-link ${activeItem === item.label ? "is-active" : ""}`}
        >
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
}

export default NavLinks;
