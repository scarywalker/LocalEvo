import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-4 bg-neutral text-neutral-content fixed bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="text-center">
        <p className="mb-0">
          Connect with me on:
          <a
            href="https://github.com/scarywalker/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-light"
          >
            <i className="fab fa-github fa-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-dischon-5013b4152/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-light"
          >
            <i className="fab fa-linkedin fa-xl"></i>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
