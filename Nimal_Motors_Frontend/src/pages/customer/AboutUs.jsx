import React, { useEffect, useState } from "react";
import garage1 from "../../assets/images/garage1.jpeg";
import garage2 from "../../assets/images/garage2.jpeg";
import garage3 from "../../assets/images/garage3.jpeg";
import galary4 from "../../assets/images/galary4.jpeg";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";

export default function About() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/Feedback");
        const feedbacksData = response.data.feedbacks;
        if (!Array.isArray(feedbacksData)) {
          throw new Error("Invalid feedback format received from API");
        }
        setFeedbacks(feedbacksData);
      } catch (err) {
        setError(err.message || "Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const renderStars = (count = 0) => {
    const stars = [];
    const fullStars = Math.min(Math.max(count, 0), 5);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-5 h-5 text-yellow-400 inline-block fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.196-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
      );
    }
    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-5 h-5 text-yellow-400 inline-block fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.196-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-r from-red-300 to-red-500 py-24 px-4 sm:px-6 lg:px-8">
        <div className="hero-content max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Nimal Motors</h1>
          <p className="text-lg text-white opacity-90">
            Your trusted partner for all vehicle repairs and services.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="company-overview py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="content md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Nimal Motors has been providing high-quality vehicle maintenance and repair services for over a decade.
              Our expert team is committed to excellence, ensuring every customer leaves satisfied. We specialize in a wide
              range of services, from mechanical repairs to bodywork and electrical diagnostics, using state-of-the-art
              technology to keep your vehicle in top condition.
            </p>
          </div>
          <img
            src={garage3}
            alt="Nimal Motors Garage"
            className="md:w-1/2 h-64 md:h-80 object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Our Workshop Gallery</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <img src={garage1} alt="Workshop 1" className="rounded-lg shadow-md object-cover h-60 w-full" />
          <img src={garage2} alt="Workshop 2" className="rounded-lg shadow-md object-cover h-60 w-full" />
          <img src={garage3} alt="Workshop 3" className="rounded-lg shadow-md object-cover h-60 w-full" />
          <img src={galary4} alt="Workshop 4" className="rounded-lg shadow-md object-cover h-60 w-full" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Why Choose Us?</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card bg-gray-100 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <i className="fas fa-tools text-3xl text-red-500 mb-4"></i>
            <p className="font-semibold text-gray-700">Skilled Technicians</p>
          </div>
          <div className="feature-card bg-gray-100 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <i className="fas fa-car text-3xl text-red-500 mb-4"></i>
            <p className="font-semibold text-gray-700">Latest Technology</p>
          </div>
          <div className="feature-card bg-gray-100 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <i className="fas fa-check-circle text-3xl text-red-500 mb-4"></i>
            <p className="font-semibold text-gray-700">Quality Assurance</p>
          </div>
          <div className="feature-card bg-gray-100 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <i className="fas fa-user text-3xl text-red-500 mb-4"></i>
            <p className="font-semibold text-gray-700">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback bg-red-300 py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Customer Feedback</h2>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-blue-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-3 text-lg">Loading feedback...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg max-w-md mx-auto">
              <h3 className="text-xl font-bold">Error loading feedback</h3>
              <p className="mt-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          ) : feedbacks.length === 0 ? (
            <p className="text-center text-gray-500">No feedback available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {feedbacks.map((fb, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold uppercase">
                      {fb.Email?.charAt(0)}
                    </div>
                    <div className="text-sm text-gray-700 font-semibold truncate">{fb.Email}</div>
                  </div>
                  <div className="text-gray-700 italic text-base mb-3">"{fb.description}"</div>
                  <div className="flex">{renderStars(fb.rating)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
