import garage3 from "../../assets/images/garage3.jpg";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

export default function About() {
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Hero */}
      <section className="hero bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
        <div className="hero-content max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Nimal Motors</h1>
          <p className="text-lg text-gray-600">Your trusted partner for all vehicle repairs and services.</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="company-overview py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="content md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-sm md:text-base text-gray-600">
              Nimal Motors has been providing high-quality vehicle maintenance and repair services for over a decade. Our expert team is committed to excellence, ensuring that every customer leaves satisfied. We specialize in a wide range of services, from mechanical repairs to bodywork and electrical diagnostics, using state-of-the-art technology to keep your vehicle in top condition.
            </p>
          </div>
          <img
            src={garage3}
            alt="Nimal Motors Garage"
            className="md:w-1/2 h-64 md:h-80 object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">Why Choose Us?</h2>
        <div className="features max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature flex flex-col items-center bg-white rounded-lg shadow-md p-12 hover:shadow-lg transition-shadow duration-200">
            <i className="fas fa-tools text-3xl text-blue-400 mb-4"></i>
            <span className="text-sm md:text-base font-medium text-gray-800">Skilled Technicians</span>
          </div>
          <div className="feature flex flex-col items-center bg-white rounded-lg shadow-md p-12 hover:shadow-lg transition-shadow duration-200">
            <i className="fas fa-car text-3xl text-blue-400 mb-4"></i>
            <span className="text-sm md:text-base font-medium text-gray-800">Latest Technology</span>
          </div>
          <div className="feature flex flex-col items-center bg-white rounded-lg shadow-md p-12 hover:shadow-lg transition-shadow duration-200">
            <i className="fas fa-check-circle text-3xl text-blue-400 mb-4"></i>
            <span className="text-sm md:text-base font-medium text-gray-800">Quality Assurance</span>
          </div>
          <div className="feature flex flex-col items-center bg-white rounded-lg shadow-md p-12 hover:shadow-lg transition-shadow duration-200">
            <i className="fas fa-user text-3xl text-blue-400 mb-4"></i>
            <span className="text-sm md:text-base font-medium text-gray-800">Customer Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}