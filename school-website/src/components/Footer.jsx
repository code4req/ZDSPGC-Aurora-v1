function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              SchoolName
            </h3>
            <p className="text-gray-400">
              Empowering minds, building futures since 2000.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#programs" className="hover:text-white transition">Programs</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 School Street</li>
              <li>📞 (123) 456-7890</li>
              <li>✉️ info@schoolname.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-purple-400 transition">📘</a>
              <a href="#" className="hover:text-purple-400 transition">🐦</a>
              <a href="#" className="hover:text-purple-400 transition">📷</a>
              <a href="#" className="hover:text-purple-400 transition">💼</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 SchoolName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;