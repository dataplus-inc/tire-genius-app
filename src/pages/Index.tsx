import { useState } from "react";
import { ArrowRight, Search, CheckCircle, Clock, Wrench, Droplet, CircleDot, Disc, Menu, X } from "lucide-react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: CircleDot,
      title: "Tire Installation",
      description: "Professional tire mounting, balancing, and installation for all vehicle types. Expert service ensuring your safety on the road.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop"
    },
    {
      icon: Wrench,
      title: "Wheel Alignment",
      description: "Precision alignment service to maximize tire life, improve handling, and ensure optimal fuel efficiency.",
      image: "https://globalassets.hunter.com/images/assets/Align-WinAlignLite-Target-SelfCentering-Close.jpg/Zz0wNzA4YmRiNmIwZjgxMWVmOWJiOTYyMThkMTY1YmVmZQ==?quality=90"
    },
    {
      icon: Droplet,
      title: "Oil Change",
      description: "Quick and thorough oil changes using premium lubricants. Keep your engine running smoothly and efficiently.",
      image: "https://images.unsplash.com/photo-1632823469621-d1d6259d0ce7?w=800&h=600&fit=crop"
    },
    {
      icon: Disc,
      title: "Brake Service",
      description: "Complete brake inspection, pad replacement, and rotor service. Your safety is our top priority.",
      image: "https://images.unsplash.com/photo-1610221936190-c6cc7ab82236?w=800&h=600&fit=crop"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">W&D</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900">Wheels & Deals</div>
              <div className="text-xs text-gray-600">AUTO & SERVICES</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('finder')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">TIRES</button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">SERVICES</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">HOW IT WORKS</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">CONTACT</button>
          </div>
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('finder')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors text-left">TIRES</button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors text-left">SERVICES</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors text-left">HOW IT WORKS</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors text-left">CONTACT</button>
            </div>
          </div>
        )}
      </nav>

      {/* Promo Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-2xl md:text-3xl animate-bounce">🔥</span>
            
            <div>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-100 mb-1">
                Limited Time Offer
              </p>
              <p className="text-base md:text-xl font-bold">
                Expert Tire Installation + Free Quote Today!
              </p>
            </div>
            
            <span className="text-2xl md:text-3xl animate-bounce delay-75">🔥</span>
          </div>
          
          <div className="mt-3 flex justify-center">
            <button 
              onClick={() => scrollToSection('finder')}
              className="bg-white text-red-600 px-6 py-2 rounded-full font-bold text-sm md:text-base hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Your Free Quote →
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
      </section>

      {/* Hero Section */}
      <section id="finder" className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              FIND YOUR PERFECT TIRES IN{" "}
              <span className="text-orange-500">SECONDS</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed font-medium">
              Expert recommendations • Exact specifications • Fast quotes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                FIND YOUR TIRES
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 uppercase text-gray-900">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Getting the right tires for your vehicle has never been easier
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 hover:border-orange-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-gray-900">Select Your Vehicle</h3>
              <p className="text-gray-600">
                Choose your vehicle's year, make, model, and trim to get exact tire specifications.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 hover:border-orange-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-gray-900">View Tire Options</h3>
              <p className="text-gray-600">
                See your tire size with detailed breakdown and browse recommended tire options.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 hover:border-orange-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-gray-900">Request a Quote</h3>
              <p className="text-gray-600">
                Submit your info and get a personalized quote within 2 business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase text-gray-900">
              Our Expert Services
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Professional automotive services you can trust. Quality workmanship, competitive pricing, and exceptional customer care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 uppercase group-hover:text-orange-600 transition-colors text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <div className="inline-block bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-500 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 uppercase text-gray-900">
                Need Service Today?
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Call us or visit our shop for fast, professional service
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6148799212"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  📞 Call (614) 879-9212
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-8 rounded-full border-2 border-orange-500 transition-all duration-300 hover:scale-105"
                >
                  Visit Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase text-gray-900">
                Why Choose Wheels & Deals?
              </h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <CheckCircle className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-lg uppercase text-gray-900">Exact Specifications</h3>
                    <p className="text-gray-600">
                      Get tire sizes that perfectly match your vehicle's requirements
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-lg uppercase text-gray-900">Expert Recommendations</h3>
                    <p className="text-gray-600">
                      Curated tire options across all price ranges and seasons
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-lg uppercase text-gray-900">Fast Response</h3>
                    <p className="text-gray-600">
                      Get your personalized quote within 2 business hours
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-3 rounded-lg transition-colors flex items-center gap-2">
                GET STARTED NOW
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-orange-500">
              <h3 className="text-3xl font-bold mb-4 uppercase text-gray-900">Quick Quote Request</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Start by selecting your vehicle to find the perfect tires
              </p>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                FIND YOUR TIRES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">W&D</span>
                </div>
                <div>
                  <div className="text-xl font-bold">Wheels & Deals</div>
                  <div className="text-xs text-gray-400">AUTO & SERVICES</div>
                </div>
              </div>
              <p className="text-gray-400">
                Your trusted partner for professional tire services and expert recommendations.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase text-lg">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@wheelsdealsauto.com</p>
                <p>Phone: (614) 879-9212</p>
                <p>Address: 227 E Main St, West Jefferson, OH 43162</p>
                <p>Hours: Mon-Sat 9AM-7PM</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase text-lg">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('finder')} className="block text-gray-400 hover:text-orange-500 transition-colors font-semibold text-left">
                  Tire Finder
                </button>
                <button onClick={() => scrollToSection('services')} className="block text-gray-400 hover:text-orange-500 transition-colors font-semibold text-left">
                  Services
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="block text-gray-400 hover:text-orange-500 transition-colors font-semibold text-left">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-orange-500 transition-colors font-semibold text-left">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Wheels & Deals Auto & Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
