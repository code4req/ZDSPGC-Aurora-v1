import { useState } from 'react';
import gsap from 'gsap';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Animate success message
      gsap.from('.success-message', {
        scale: 0,
        rotation: 360,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Stay updated with school news, events, and important announcements.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <div className="success-message mt-4 text-green-400 font-semibold">
            ✅ Thank you for subscribing!
          </div>
        )}
      </div>
    </section>
  );
}

export default Newsletter;