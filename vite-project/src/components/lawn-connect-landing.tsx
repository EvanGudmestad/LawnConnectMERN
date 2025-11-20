import { HeroWithBackground } from "@/components/hero-with-background";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield, Star, Calendar, MapPin, CreditCard } from "lucide-react";

export function LawnConnectLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroWithBackground
        heading="Your Perfect Lawn, Just a Click Away"
        description="Connect with top-rated local lawn care professionals. Book instantly, pay securely, and enjoy your weekend."
        buttons={{
          primary: {
            text: "Find a Pro",
            url: "/services",
          },
          secondary: {
            text: "Become a Pro",
            url: "/signup",
          },
        }}
        backgroundImage="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose LawnConnect?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make lawn care simple, reliable, and hassle-free for homeowners and professionals alike.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle>Instant Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Schedule a mow in minutes. Choose your service, pick a time, and get matched with a pro instantly.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-background border-none shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle>Vetted Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every provider is background-checked and insured. We ensure high-quality service every time.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-background border-none shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <CreditCard className="w-6 h-6" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pay securely through the app. No cash needed. Satisfaction guaranteed or your money back.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground">Get your lawn mowed in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-background border-4 border-primary rounded-full flex items-center justify-center mb-6 shadow-lg z-10">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Enter Your Address</h3>
              <p className="text-muted-foreground">Tell us where you live to see available services and pricing in your area.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-background border-4 border-primary rounded-full flex items-center justify-center mb-6 shadow-lg z-10">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Schedule Service</h3>
              <p className="text-muted-foreground">Pick a date and time that works for you. One-time or recurring service available.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-background border-4 border-primary rounded-full flex items-center justify-center mb-6 shadow-lg z-10">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Relax & Enjoy</h3>
              <p className="text-muted-foreground">Our pro handles the work. You get a notification when it's done with a photo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Homeowner",
                content: "LawnConnect has been a lifesaver! I used to struggle finding reliable help, but now my lawn looks perfect every week.",
                rating: 5
              },
              {
                name: "Mike Thompson",
                role: "Homeowner",
                content: "Super easy to use app. The lawn care pro was professional and did a great job edging the driveway too.",
                rating: 5
              },
              {
                name: "David Chen",
                role: "Lawn Care Pro",
                content: "As a provider, this platform helps me fill my schedule and get paid on time. Highly recommended for small businesses.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to reclaim your weekend?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of happy homeowners who trust LawnConnect for their lawn care needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <a href="/signup">Get Started Now</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6" asChild>
              <a href="/services">Browse Services</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
