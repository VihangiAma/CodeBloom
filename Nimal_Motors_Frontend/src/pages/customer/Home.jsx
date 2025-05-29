import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import garage1 from "../../assets/images/garage1.jpg";
import garage2 from "../../assets/images/garage2.jpg";
import garage3 from "../../assets/images/garage3.jpg";
import mechanical from "../../assets/images/mechanical.jpg";
import bodyshop from "../../assets/images/bodyshop.jpg";
import electrical from "../../assets/images/electrical.jpg";
import service from "../../assets/images/service.jpg";
import sup1 from "../../assets/images/sup1.jpg";
import sup2 from "../../assets/images/sup2.jpg";
import sup3 from "../../assets/images/sup3.jpg";
import sup4 from "../../assets/images/sup4.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [visible, setVisible] = useState(false);
  const slides = [
    { src: garage1, alt: "Garage Image 1" },
    { src: garage2, alt: "Garage Image 2" },
    { src: garage3, alt: "Garage Image 3" },
  ];
  const sections = [
    { src: mechanical, alt: "Mechanical Section", title: "Mechanical Section", info: "" },
    { src: bodyshop, alt: "Bodyshop Section", title: "Bodyshop Section", info: "" },
    { src: electrical, alt: "Electrical Section", title: "Electrical Section", info: "" },
    { src: service, alt: "Vehicle Service Section", title: "Vehicle Service Section", info: "" },
  ];
  const experts = [
    { src: sup1, alt: "Supervisor 1", name: "John Doe", phone: "+94717286020", email: "john.doe@example.com" },
    { src: sup2, alt: "Supervisor 2", name: "Jane Smith", phone: "+94717286021", email: "jane.smith@example.com" },
    { src: sup3, alt: "Supervisor 3", name: "Michael Brown", phone: "+94717286022", email: "michael.brown@example.com" },
    { src: sup4, alt: "Supervisor 4", name: "Emily White", phone: "+94717286023", email: "emily.white@example.com" },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const plusSlides = (n) => {
    setCurrentSlide((prev) => {
      let newIndex = prev + n;
      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
                <section className="slidesho">
                  <div className="slideshow-container max-w-7xl mx-auto relative">
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className={`slide ${index === currentSlide ? "block" : "hidden"} transition-opacity duration-500`}
                      >
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                        />
                      </div>
                    ))}
                    <a
                      className="prev absolute top-1/2 left-4 transform -translate-y-1/2 text-2xl text-white bg-black bg-opacity-50 px-3 py-1 rounded-full cursor-pointer hover:bg-opacity-75 transition"
                      onClick={() => plusSlides(-1)}
                    >
                      ❮
                    </a>
                    <a
                      className="next absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl text-white bg-black bg-opacity-50 px-3 py-1 rounded-full cursor-pointer hover:bg-opacity-75 transition"
                      onClick={() => plusSlides(1)}
                    >
                      ❯
                    </a>
                  </div>
                </section>

                {/* Sections */}
                <section className="sections py-24 px-4 sm:px-6 lg:px-8 bg-white" id="sections">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Our Sections</h2>
                  <div className="sections-container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sections.map((section, index) => (
                      <div
                        key={index}
                        className="section-card bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                      >
                        <img
                          src={section.src}
                          alt={section.alt}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 mt-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h3>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium hover:bg-red-400 transition-colors duration-200"
                          >
                            View Details
                          </button>
                          {/* { visible && <p className="text-sm text-gray-600 mt-2">{section.info}</p>} */}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Experts */}
                <section className="experts py-24 px-4 sm:px-6 lg:px-8 bg-gray-50" id="experts">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Our Experts</h2>
                  <div className="experts-container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {experts.map((expert, index) => (
                      <div
                        key={index}
                        className="expert-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                      >
                        <img
                          src={expert.src}
                          alt={expert.alt}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 flex gap-12 justify-center items-center mt-6">
                          <h3 className="text-lg font-semibold text-gray-800">{expert.name}</h3>
                          <div className="contact-icons flex gap-4 justify-center">
                            <a
                              href={`tel:${expert.phone}`}
                              className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
                              aria-label={`Call ${expert.name}`}
                            >
                              <i className="fas fa-phone text-xl"></i>
                            </a>
                            <a
                              href={`mailto:${expert.email}`}
                              className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
                              aria-label={`Email ${expert.name}`}
                            >
                              <i className="fas fa-envelope text-xl"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
      </main>
      <Footer />
    </div>
  );
}