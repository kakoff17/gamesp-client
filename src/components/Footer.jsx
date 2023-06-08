import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const styles = {
  footer: {
    position: "sticky",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "lightgray",
    padding: "10px",
    textAlign: "center",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  links: {
    marginTop: "10px",
  },
  link: {
    margin: "0 5px",
    color: "#333",
    textDecoration: "none",
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      <h5 style={styles.text}>Web app by Carlos Ponce</h5>
      <div style={styles.links}>
        <a
          href="https://www.linkedin.com/in/carlos-ponce-diez-875001268/"
          style={styles.link}
        >
          <FaLinkedin size={20} />
        </a>
        <a href="https://github.com/kakoff17" style={styles.link}>
          <FaGithub size={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
