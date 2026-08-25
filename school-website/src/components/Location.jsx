import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Location = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Visit <span className="text-emerald-400">Our Campus</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Find us at Aurora, Zamboanga del Sur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map / Location Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-emerald-400 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Address</h3>
                <p className="text-white/60">
                  Aurora, Zamboanga del Sur<br />
                  Philippines 7020
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-emerald-400 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Phone</h3>
                <p className="text-white/60">+63 (123) 456-7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-emerald-400 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-white/60">info@zdspgc.edu.ph</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <FaClock className="text-emerald-400 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Office Hours</h3>
                <p className="text-white/60">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 8:00 AM - 12:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5!2d123.5!3d8.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzAnMDAuMCJOIDEyM8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sph!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ZDSPGC Aurora Campus Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;