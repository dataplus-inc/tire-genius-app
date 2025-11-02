import { Button } from "@/components/ui/button";
import { ArrowRight, Search, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tires.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl">
              T
            </div>
            <span className="text-xl font-bold">Wheels & Deals Auto & Services Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#finder" className="text-sm font-medium hover:text-accent transition-colors">Find Your Tires</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-accent transition-colors">How It Works</a>
            <a href="#contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
            <Link to="/auth" className="text-sm font-medium hover:text-accent transition-colors">Admin Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional tire display" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Find Your Perfect Tires in{" "}
              <span className="text-accent">Seconds</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Professional tire recommendations based on your vehicle's exact specifications. 
              Get a custom quote instantly with our smart tire finder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/finder">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2" />
                  Find Your Tires
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Getting the right tires for your vehicle has never been easier
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Select Your Vehicle</h3>
              <p className="text-muted-foreground">
                Choose your vehicle's year, make, model, and trim to get exact tire specifications.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">View Tire Options</h3>
              <p className="text-muted-foreground">
                See your tire size with detailed breakdown and browse recommended tire options.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Request a Quote</h3>
              <p className="text-muted-foreground">
                Submit your info and get a personalized quote within 2 business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose TireShop Pro?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Exact Specifications</h3>
                    <p className="text-muted-foreground">
                      Get tire sizes that perfectly match your vehicle's requirements
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Expert Recommendations</h3>
                    <p className="text-muted-foreground">
                      Curated tire options across all price ranges and seasons
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Fast Response</h3>
                    <p className="text-muted-foreground">
                      Get your personalized quote within 2 business hours
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/finder">
                <Button variant="accent" size="lg" className="mt-8">
                  Get Started Now
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-hero rounded-2xl p-8 shadow-elevated">
              <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">Quick Quote Request</h3>
                <p className="text-muted-foreground mb-6">
                  Start by selecting your vehicle to find the perfect tires
                </p>
                <Link to="/finder">
                  <Button variant="hero" className="w-full" size="lg">
                    <Search className="mr-2" />
                    Find Your Tires
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl">
                  T
                </div>
                <span className="text-xl font-bold">Wheels & Deals Auto & Services</span>
              </div>
              <p className="text-primary-foreground/80">
                Your trusted partner for professional tire services and expert recommendations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>Email: info@tireshoppro.com</p>
                <p>Phone: (614) 879-9219</p>
                <p>Address: 227 E Main St, West Jefferson, OH 43162</p>
                <p>Hours: Mon-Sat 9AM-7PM</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/finder" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  Tire Finder
                </Link>
                <a href="#how-it-works" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  How It Works
                </a>
                <a href="#contact" className="block text-primary-foreground/80 hover:text-accent transition-colors">
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
