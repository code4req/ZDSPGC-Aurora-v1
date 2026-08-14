import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaPaperPlane,
  FaCheckCircle,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from(infoRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      x: -60,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: FaEnvelope, title: 'Email', value: 'info@zdspgc.edu.ph', link: 'mailto:info@zdspgc.edu.ph' },
    { icon: FaPhoneAlt, title: 'Phone', value: '+63 (62) 123-4567', link: 'tel:+63621234567' },
    { icon: FaMapMarkerAlt, title: 'Address', value: 'Pagadian City, Zamboanga del Sur', link: '#' },
  ];

  const socialLinks = [
    { icon: FaGithub, link: '#' },
    { icon: FaTwitter, link: '#' },
    { icon: FaLinkedin, link: '#' },
    { icon: FaInstagram, link: '#' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Contact Us
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question or want to learn more about ZDSPGC? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.link}
                      className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                        <Icon className="text-purple-400 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{item.title}</p>
                        <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.link}
                        className="p-3 bg-white/5 rounded-lg hover:bg-purple-500/30 transition-all duration-300 hover:scale-110"
                      >
                        <Icon className="text-gray-400 hover:text-purple-400 transition-colors text-lg" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {['24/7 Support', 'Fast Response', '100% Free'].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-purple-400">✓</div>
                  <p className="text-xs text-gray-400 mt-1">{stat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="w-full px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    required
                    className="w-full px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitted ? (
                      <>
                        <FaCheckCircle className="animate-bounce" />
                        Sent Successfully!
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;