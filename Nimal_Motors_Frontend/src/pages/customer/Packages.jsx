import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

export default function Packages() {
  const packages = [
    {
      title: "Basic Service Package",
      items: [
        "Engine oil change (with filter)",
        "Air filter cleaning/replacement",
        "Brake inspection",
        "Fluid top-up (coolant, brake, power steering)",
        "Battery check",
        "Tire pressure check & rotation",
      ],
    },
    {
      title: "Full Service Package",
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
      items: [
        "Includes everything in the Full Service Package",
        "Engine diagnostic scan",
        "Suspension & steering check",
        "Transmission oil change",
        "AC gas recharge & filter replacement",
        "Headlight focusing & polishing",
      ],
    },
    {
      title: "Mechanical Repair Package",
      items: [
        "Brake pad replacement",
        "Clutch plate & pressure plate replacement",
        "Suspension repairs",
        "Steering system inspection & repair",
        "Engine belt & timing belt replacement",
      ],
    },
    {
      title: "Electrical & Battery Care Package",
      items: [
        "Battery testing & replacement",
        "Alternator & starter motor check",
        "Wiring & fuse inspection",
        "Headlights & tail light repair/replacement",
        "ECU & sensor diagnosis",
      ],
    },
    {
      title: "Body & Paint Protection Package",
      items: [
        "Full body wash & wax polish",
        "Paint correction & touch-up",
        "Dent removal",
        "Undercoating & rust-proofing",
        "Interior vacuum & detailing",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Hero */}
      <section className="hero bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
        <div className="hero-content max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Service Packages</h1>
          <p className="text-lg text-gray-600">Choose from a variety of packages tailored for your vehicle's needs.</p>
        </div>
      </section>

      {/* Packages */}
      <section className="packages py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="package bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">{pkg.title}</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                {pkg.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-blue-400 mt-1"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}