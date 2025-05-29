import { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., send to backend or MongoDB)
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", feedback: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer className="bg-gray-800 text-gray-200 py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
      <div className="footer-container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Opening Hours */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Opening Hours</h3>
          <p className="text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
          <p className="text-sm">Saturday: 8:00 AM - 4:00 PM</p>
          <p className="text-sm">Sunday: Closed</p>
        </div>

        {/* Address */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Address</h3>
          <p className="text-sm">No 321/2 Galle Rd,</p>
          <p className="text-sm">Aluthgama 12080, Sri Lanka</p>
        </div>

        {/* Contact */}
        <div className="footer-section" id="contact">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Contact</h3>
          <p className="text-sm flex items-center gap-2">
            <i className="fas fa-phone text-blue-400"></i>
            <a href="tel:+94717286020" className="hover:text-blue-400 transition-colors duration-200">
              +94 71 728 6020
            </a>
          </p>
          <p className="text-sm flex items-center gap-2">
            <i className="fas fa-envelope text-blue-400"></i>
            <a
              href="mailto:heshandinuka.hd@gmail.com"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              heshandinuka.hd@gmail.com
            </a>
          </p>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Follow Us</h3>
          <div className="social-icons flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Feedback</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-600 bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-600 bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="feedback"
              placeholder="Your Feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              className="border border-gray-600 bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium hover:bg-red-500 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-8 border-t border-gray-600 text-center">
        <p className="text-sm text-gray-400">© 2025 Nimal Motors. All Rights Reserved.</p>
      </div>
    </footer>
  );
}