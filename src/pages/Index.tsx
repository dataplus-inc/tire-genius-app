import { Button } from "@/components/ui/button";
import { ArrowRight, Search, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tires.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/src/assets/wheels-deals-logo.png" alt="Wheels & Deals Auto & Services" className="h-14" />
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-foreground">Wheels & Deals</div>
              <div className="text-xs text-muted-foreground">AUTO & SERVICES</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#finder" className="text-sm font-semibold hover:text-accent transition-colors">TIRES</a>
            <a href="#how-it-works" className="text-sm font-semibold hover:text-accent transition-colors">HOW IT WORKS</a>
            <a href="#contact" className="text-sm font-semibold hover:text-accent transition-colors">CONTACT</a>
            <Link to="/auth" className="text-sm font-semibold hover:text-accent transition-colors">ADMIN</Link>
          </div>
        </div>
      </nav>

{/* Promo Banner */}
<section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-4">
  {/* Animated background effect */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
  </div>
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="flex items-center justify-center gap-3 text-center">
      {/* Animated fire emoji */}
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
    
    {/* Optional CTA button */}
    <div className="mt-3 flex justify-center">
      <Link to="/finder">
        <button className="bg-white text-red-600 px-6 py-2 rounded-full font-bold text-sm md:text-base hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Get Your Free Quote →
        </button>
      </Link>
    </div>
  </div>
  
  {/* Bottom highlight line */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
</section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional tire display" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight">
              FIND YOUR PERFECT TIRES IN{" "}
              <span className="text-accent">SECONDS</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/95 mb-8 leading-relaxed font-medium">
              Expert recommendations • Exact specifications • Fast quotes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/finder">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6">
                  <Search className="mr-2" />
                  FIND YOUR TIRES
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 uppercase">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Getting the right tires for your vehicle has never been easier
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-card border border-border hover:border-accent transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-2xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">Select Your Vehicle</h3>
              <p className="text-muted-foreground">
                Choose your vehicle's year, make, model, and trim to get exact tire specifications.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-card border border-border hover:border-accent transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-2xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">View Tire Options</h3>
              <p className="text-muted-foreground">
                See your tire size with detailed breakdown and browse recommended tire options.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-card border border-border hover:border-accent transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-2xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">Request a Quote</h3>
              <p className="text-muted-foreground">
                Submit your info and get a personalized quote within 2 business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase">
                Why Choose Wheels & Deals?
              </h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-lg uppercase">Exact Specifications</h3>
                    <p className="text-muted-foreground">
                      Get tire sizes that perfectly match your vehicle's requirements
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-lg uppercase">Expert Recommendations</h3>
                    <p className="text-muted-foreground">
                      Curated tire options across all price ranges and seasons
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-lg uppercase">Fast Response</h3>
                    <p className="text-muted-foreground">
                      Get your personalized quote within 2 business hours
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/finder">
                <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 font-bold text-lg px-8">
                  GET STARTED NOW
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-elevated border-2 border-accent">
              <h3 className="text-3xl font-bold mb-4 uppercase">Quick Quote Request</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Start by selecting your vehicle to find the perfect tires
              </p>
              <Link to="/finder">
                <Button className="w-full bg-accent hover:bg-accent/90 font-bold text-lg py-6" size="lg">
                  <Search className="mr-2" />
                  FIND YOUR TIRES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/src/assets/wheels-deals-logo.png" alt="Wheels & Deals Auto & Services" className="h-14" />
                <div>
                  <div className="text-xl font-bold">Wheels & Deals</div>
                  <div className="text-xs text-primary-foreground/80">AUTO & SERVICES</div>
                </div>
              </div>
              <p className="text-primary-foreground/80">
                Your trusted partner for professional tire services and expert recommendations.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase text-lg">Contact</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>Email: info@wheelsdealsauto.com</p>
                <p>Phone: (614) 879-9212</p>
                <p>Address: 227 E Main St, West Jefferson, OH 43162</p>
                <p>Hours: Mon-Sat 9AM-7PM</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase text-lg">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/finder" className="block text-primary-foreground/80 hover:text-accent transition-colors font-semibold">
                  Tire Finder
                </Link>
                <a href="#how-it-works" className="block text-primary-foreground/80 hover:text-accent transition-colors font-semibold">
                  How It Works
                </a>
                <a href="#contact" className="block text-primary-foreground/80 hover:text-accent transition-colors font-semibold">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2025 Wheels & Deals Auto & Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
