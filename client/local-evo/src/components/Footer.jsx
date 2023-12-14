import React from "react";

const Footer = () => {
    return (
        <footer className="footer fixed-bottom py-3 bg-dark text-light">
          <div className="container">
            <div className="text-center">
              <p className="mb-0">
                Connect with me on:
                <a href="https://github.com/scarywalker/" target="_blank" rel="noopener noreferrer" className="ml-2 text-light">
                  <i className="fab fa-github fa-lg"></i>
                </a>
                <a href="https://www.linkedin.com/in/gabriel-dischon-5013b4152/" target="_blank" rel="noopener noreferrer" className="ml-2 text-light">
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
              </p>
            </div>
          </div>
        </footer>
      );
};

export default Footer;
