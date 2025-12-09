import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-left">
          <h3 className="footer-logo">Sivanandan</h3>
          <p className="footer-text">
            Passionate Full Stack Developer building modern web experiences.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <h4>Contact</h4>
          <p>rajaramsiva19.@gmail.com</p>
          <p>Location: India</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Sivanandan. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
