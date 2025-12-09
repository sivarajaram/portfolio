function Header() {
  return (
    <header className="site-header">
      <nav className="nav">
        <a href="#hero" className="logo">
          Siva<span className="dot">.</span>
        </a>

        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a href="#contact" className="nav-cta">
          Let&apos;s Talk
        </a>
      </nav>
    </header>
  );
}

export default Header;
