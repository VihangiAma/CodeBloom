import garage1 from "../../assets/images/garage1.jpeg";
import garage2 from "../../assets/images/garage2.jpeg";
import garage3 from "../../assets/images/garage3.jpeg";
import galary4 from "../../assets/images/galary4.jpeg";
//import galary5 from "../../assets/images/galary5.jpeg";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Gallery Showcase */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
