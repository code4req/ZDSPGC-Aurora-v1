import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
    >
      <div className="container mx-auto px-4">
        <div ref={formRef} className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-400">
              We'd love to hear from you
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none transition resize-none"
            />
            <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;