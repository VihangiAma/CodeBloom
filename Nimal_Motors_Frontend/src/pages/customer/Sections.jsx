import React, { useState } from 'react';
import { Phone, Mail, MapPin, Award, Users, Calendar, ChevronDown, ChevronUp, MessageSquare, Wrench, Car, Battery, Settings } from 'lucide-react';
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"
import ChatBot from "../../components/ChatSection/Chatbot"
import sup1 from "../../assets/images/sup1.jpeg"
import sup2 from "../../assets/images/sup2.jpg"
import sup3 from "../../assets/images/sup3.jpg"
import sup4 from "../../assets/images/sup4.jpg"
import sec1 from "../../assets/images/sec1.jpg"
import sec2 from "../../assets/images/sec2.jpg"
import sec3 from "../../assets/images/sec3.jpg"

const SupervisorSection = () => {
  const [expandedSupervisor, setExpandedSupervisor] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sample supervisor data
  const supervisors = [
    {
      id: 1,
      name: "Kavindu Nirmal",
      position: "mechanical Supervisor",
      department: "Mechanical Section",
      image: sup1,
      phone: "0745566777",
      email: "chamath.gunasekara@gmail.com",
      location: "Service Bay 1-5",
      experience: "3+ years",
      teamSize: 8,
      bio: "Kavindu Nirmal leads our mechanical repair team with extensive experience in engine diagnostics, transmission repair, and automotive maintenance. His expertise ensures all mechanical work meets the highest industry standards.",
      responsibilities: [
        "Engine diagnostics and repair",
        "Transmission and drivetrain services",
        "Brake system maintenance",
        "Suspension and steering repair",
        "Team training and quality control"
      ],
      achievements: [
        "Reduced average repair time by 30%",
        "Achieved 98% customer satisfaction rate",
        "Implemented advanced diagnostic procedures",
        "Certified master technician trainer"
      ],
      certifications: ["ASE Master Technician", "Advanced Engine Performance", "Brake System Specialist"]
    },
    {
      id: 2,
      name: "Nimal Sirisena",
      position: "Lead Supervisor",
      department: "Bodyshop Section",
      image: sup2,
      phone: "076 2233445",
      email: "suresh.fernando@gmail.com",
      location: "Paint & Body Shop",
      experience: "4+ years",
      teamSize: 5,
      bio: "Nimal Sirisena oversees our bodyshop operations with expertise in collision repair, paint matching, and frame straightening. She ensures every vehicle leaves our shop looking like new with perfect paint finishes.",
      responsibilities: [
        "Collision damage assessment",
        "Paint mixing and color matching",
        "Frame alignment and repair",
        "Quality control inspections",
        "Insurance claim coordination"
      ],
      achievements: [
        "Achieved perfect paint match rate of 99.5%",
        "Reduced bodywork turnaround time by 25%",
        "Implemented eco-friendly paint systems",
        "Zero rework claims for 12 months"
      ],
      certifications: ["I-CAR Platinum Certification", "PPG Paint Specialist", "Frame Repair Certified"]
    },
    {
      id: 3,
      name: "Dasun Tharindu",
      position: "Electricals Supervisor",
      department: "Electrical Section",
      image: sup3,
      phone: "075 3344555",
      email: "ishara.wickramasinghe@gmail.com",
      location: "Electronics Lab",
      experience: "5+ years",
      teamSize: 8,
      bio: "Dasun Tharindu specializes in automotive electrical systems, from basic wiring to complex computer diagnostics. His team handles everything from battery replacements to advanced vehicle computer programming.",
      responsibilities: [
        "Electrical system diagnostics",
        "Computer module programming",
        "Wiring harness repair",
        "Battery and charging system service",
        "Advanced driver assistance systems"
      ],
      achievements: [
        "Resolved 95% of electrical issues on first visit",
        "Specialized in hybrid vehicle systems",
        "Reduced diagnostic time by 40%",
        "Expert in latest automotive technology"
      ],
      certifications: ["ASE Electrical Specialist", "Hybrid Vehicle Certified", "Computer Systems Expert"]
    },
    {
      id: 4,
      name: "Dilani Rajapakshe",
      position: "Service Supervisor",
      department: "Vehicle Service Section",
      image: sup4,
      phone: "072 6655444",
      email: "dilani.rajapaksha@gmail.com",
      location: "Service Reception",
      experience: "5+ years",
      teamSize: 10,
      bio: "Dilani Rajapakshe manages our complete vehicle service operations, from routine maintenance to complex repairs. She ensures seamless customer service while coordinating with all technical departments for comprehensive vehicle care.",
      responsibilities: [
        "Service scheduling and coordination",
        "Customer consultation and estimates",
        "Multi-point vehicle inspections",
        "Preventive maintenance programs",
        "Quality assurance and follow-up"
      ],
      achievements: [
        "Increased service efficiency by 35%",
        "Maintained 96% customer retention rate",
        "Implemented digital inspection reports",
        "Streamlined parts ordering system"
      ],
      certifications: ["Service Management Professional", "Customer Service Excellence", "Automotive Service Advisor"]
    }
  ];

  // Section data
  const sections = [
    {
      id: 1,
      name: "Mechanical Section",
      icon: <Wrench className="w-6 h-6 text-blue-600" />,
      image: sec2,
      description: "Complete engine overhauls, transmission rebuilds, clutch repairs, brake servicing, suspension work, and comprehensive mechanical diagnostics for all vehicle makes and models.",
      services: [
        "EPS rack repair.",
        " Engine Tune up",
        "Suspension Repair.",
        "Gear Box Repair",
        "Manual-Auto conversion"
      ],
      equipment: [
        "Engine diagnostic computers",
        
      ],
      stats: [
        { label: "Annual Repairs", value: "1,000+" },
        { label: "Specialists", value: "105" },
        { label: "Warranty", value: "1 Years" }
      ],
      packages: [
        
        {
          title: "Mechanical Repair Package",
          price: "LKR 25,000",
          items: [
            "Brake pad replacement",
            "Clutch plate & pressure plate replacement",
            "Suspension repairs",
            "Steering system inspection & repair",
            "Engine belt & timing belt replacement",
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Bodyshop Section",
      icon: <Car className="w-6 h-6 text-red-600" />,
      image: sec3,
      description: "Professional accident repair, dent removal, panel beating, spray painting, frame alignment, and full vehicle restoration services with insurance claim support.",
      services: [
        "Accident repair",
        "Cut & Polish",
        "Full paint",
        "Tinkering",
        "Rust Treatment"
      ],
      equipment: [
        "Frame straightening machines",
        
      ],
      stats: [
        { label: "Annual Repairs", value: "800+" },
        { label: "Paint Jobs", value: "1,500+" },
        { label: "Warranty", value: "1 Years" }
      ],
      packages: [
       
        {
          title: "Dent Repair Package",
          price: "LKR 12,000",
          items: [
            "Up to 5 medium dents removal",
            "Paintless dent repair",
            "Color blending",
            "1-year warranty"
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Electrical Section",
      icon: <Battery className="w-6 h-6 text-yellow-600" />,
      image: sec1,
      description: "Advanced auto electrical repairs, ECU programming, wiring harness replacement, alternator/starter motor services, battery diagnostics, and modern vehicle electronics.",
      services: [
        "ECU Programming & Diagnostics",
        "HV battery service & repair",
        "ABS repair",
        "Battery Services",
        "scanning and diagnosis"
      ],
      equipment: [
        "OBD diagnostic scanners",
        
      ],
      stats: [
        { label: "Annual Repairs", value: "1,000+" },
        { label: "Diagnostics", value: "1,00+" },
        { label: "Warranty", value: "1 Years" }
      ],
      packages: [
        {
          title: "Battery Care Package",
          price: "LKR 18,000",
          items: [
            "HV battery repair & replace",
            "ECU / Meterboard Programming",
            "WagonR battery programming",
            "Key programming",
            "Battery testing & replacement",
            "Alternator & starter motor check",
            "Wiring & fuse inspection",
            "Headlights & tail light repair/replacement",
            "ECU & sensor diagnosis",
          ]
        },
        
      ]
    },
    {
      id: 4,
      name: "Vehicle Service Section",
      icon: <Settings className="w-6 h-6 text-green-600" />,
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Regular maintenance services including oil changes, tire rotations, wheel alignment, vehicle inspections, tune-ups, and preventive maintenance scheduling.",
      services: [
        "Oil Changes & Tune-ups",
        "Tire Services & Alignment",
        "Vehicle Inspections",
        "Fluid Replacements",
        "Filter Changes"
      ],
      equipment: [
        "Oil change pits",
        
      ],
      stats: [
        { label: "Annual Services", value: "2,000+" },
        { label: "Customers", value: "1,200+" },
        { label: "Warranty", value: "1 Year" }
      ],
      packages: [
        
        
      ]
    }
  ];

  const toggleSupervisor = (supervisorId) => {
    setExpandedSupervisor(expandedSupervisor === supervisorId ? null : supervisorId);
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <section className="supervisor-section py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Sections</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive automotive services across four specialized departments
            </p>
          </div>

          {/* Sections Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={section.image} 
                  alt={section.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{section.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                  <div className="mb-4">
                    {section.services.slice(0, 3).map((service, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {service}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    {expandedSection === section.id ? 'Hide Details' : 'Section Details'}
                  </button>

                  {/* Expanded Section Details */}
                  {expandedSection === section.id && (
                    <div className="mt-6 space-y-4 border-t pt-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Services Offered</h4>
                        <ul className="space-y-1">
                          {section.services.map((service, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Specialized Equipment</h4>
                        <ul className="space-y-1">
                          {section.equipment.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Service Packages</h4>
                        <div className="space-y-4">
                          {section.packages.map((pkg, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="font-bold text-blue-700">{pkg.title}</h5>
                                <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {pkg.price}
                                </span>
                              </div>
                              <ul className="space-y-1">
                                {pkg.items.map((item, idx) => (
                                  <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-lg">
                        {section.stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-lg font-bold text-blue-600">{stat.value}</div>
                            <div className="text-xs text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Supervisors Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Supervisors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our experienced supervisors who lead our teams with dedication, expertise, and commitment to excellence
            </p>
          </div>

          {/* Supervisors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supervisors.map((supervisor) => (
              <div
                key={supervisor.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image and Basic Info */}
                <div className="relative">
                  <img
                    src={supervisor.image}
                    alt={supervisor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{supervisor.name}</h3>
                    <p className="text-blue-200 font-medium">{supervisor.position}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Department and Contact */}
                  <div className="mb-4">
                    <p className="text-gray-600 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      {supervisor.department}
                    </p>
                    <p className="text-gray-600 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {supervisor.location}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={`tel:${supervisor.phone}`}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                        title={`Call ${supervisor.name}`}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${supervisor.email}`}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                        title={`Email ${supervisor.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{supervisor.teamSize}</div>
                      <div className="text-sm text-gray-600">Team Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{supervisor.experience}</div>
                      <div className="text-sm text-gray-600">Experience</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {supervisor.bio}
                  </p>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleSupervisor(supervisor.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {expandedSupervisor === supervisor.id ? 'Show Less' : 'View Details'}
                    {expandedSupervisor === supervisor.id ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </button>

                  {/* Expanded Details */}
                  {expandedSupervisor === supervisor.id && (
                    <div className="mt-6 space-y-4 border-t pt-4">
                      {/* Responsibilities */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-1">
                          {supervisor.responsibilities.map((resp, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-1">
                          {supervisor.achievements.map((achievement, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          Certifications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {supervisor.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Icon */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        onClick={toggleChat}
      >
        <div className="relative">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-200">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          {!isChatOpen && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              !
            </div>
          )}
        </div>
      </div>

      {/* Chatbot Component */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <ChatBot onClose={toggleChat} />
        </div>
      )}
    </>
  );
};

export default function Sections() {
    return (
        <>
            <NavBar />
            <SupervisorSection />
            <Footer />
        </>
    )
}