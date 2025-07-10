import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

export default function Packages() {
  const packages = [
    {
      title: "Basic Service Package",
      price: "LKR 22,000",
      featured: false,
      items: [
        "Engine oil change (with filter)",
        "Air filter cleaning/replacement",
        "Brake inspection",
        "Fluid topping (coolant, brake, power steering)",
        "Battery check",
        "Tire pressure check & rotation",
      ],
    },
    {
      title: "Full Service Package",
      price: "LKR 32,000",
      featured: true,
      items: [
        "Includes everything in the Basic Package",
        "Spark plug inspection & replacement",
        "Engine tuning",
        "Wheel alignment & balancing",
        "AC filter cleaning",
        "Underbody check & lubrication",
      ],
    },
    {
      title: "Premium Care Package",
      price: "LKR 55,000",
      featured: false,
      items: [
        "Free inspection & diagnostic report",
        "Includes everything in the Full Service Package",
        "Engine diagnostic scan",
        "Suspension & steering check",
        "Transmission oil change",
        "AC gas recharge & filter replacement",
        "Headlight focusing & polishing",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <NavBar />

      {/* Hero */}
      <section className="hero relative bg-gradient-to-r from-red-300 to-red-500 py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="hero-content max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Our Service Packages
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Premium vehicle care packages designed to keep your car running smoothly and safely.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Choose Your Perfect Package
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive service packages to suit every need and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  pkg.featured
                    ? "border-2 border-blue-500 transform scale-105 z-10"
                    : "border border-gray-200"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div
                  className={`p-1 ${
                    pkg.featured ? "bg-blue-500" : "bg-gray-800"
                  }`}
                ></div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {pkg.title}
                  </h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-blue-600">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Our Service Packages?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 mb-4">
                <svg
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
              <p className="text-gray-600">
                Our efficient processes ensure minimal wait times without compromising quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 mb-4">
                <svg
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified Experts</h3>
              <p className="text-gray-600">
                All services performed by certified technicians with years of experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 mb-4">
                <svg
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Value for Money</h3>
              <p className="text-gray-600">
                Competitive pricing with premium quality parts and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}