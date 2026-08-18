import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaFacebook, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebook /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://instagram.com", icon: <FaInstagram /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-r from-green-700 to-emerald-800 py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left text-green-100/80">
          © 2026 ZDSPGC. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-100/80 transition-colors duration-300 ease-in-out hover:text-white hover:scale-110 transform"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:text-white transition-colors md:text-right text-green-100/80"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;