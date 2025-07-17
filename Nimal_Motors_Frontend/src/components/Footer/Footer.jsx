import { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    description: "",
    rating: 0 // Added rating field
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5001/api/Feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitStatus({ success: true, message: 'Thank you for your feedback!' });
        setFormData({ Name: "", Email: "", description: "", rating: 0 });
      } else {
        const errorData = await response.json();
        setSubmitStatus({ 
          success: false, 
          message: errorData.message || 'Failed to submit feedback' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: 'Network error. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Opening Hours</h3>
          <p className="text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
          <p className="text-sm">Saturday: 8:00 AM - 4:00 PM</p>
          <p className="text-sm">Sunday: Closed</p>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Address</h3>
          <p className="text-sm">No 321/2 Galle Rd,</p>
          <p className="text-sm">Aluthgama 12080, Sri Lanka</p>
        </div>

        {/* Contact */}
        <div id="contact">
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
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Follow Us</h3>
          <div className="flex gap-4">
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
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Feedback</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="Name"
              placeholder="Your Name"
              value={formData.Name}
              onChange={handleChange}
              required
              className="border border-gray-600 bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="Email"
              placeholder="Your Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="border border-gray-600 bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= (hoverRating || formData.rating) ? (
                    <span className="text-yellow-400">★</span>
                  ) : (
                    <span className="text-gray-400">☆</span>
                  )}
                </button>
              ))}
            </div>
            <textarea
              name="description"
              placeholder="Your Feedback"
              value={formData.description}
              onChange={handleChange}
              required
              className="border border-gray-600 bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-500'
              } text-white px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium transition-colors duration-200`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {submitStatus && (
              <p className={`text-sm ${
                submitStatus.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {submitStatus.message}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-600 text-center">
        <p className="text-sm text-gray-400">© 2025 Nimal Motors. All Rights Reserved.</p>
      </div>
    </footer>
  );
}