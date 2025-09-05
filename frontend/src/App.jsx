import './App.css'

function App() {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <i className="bi bi-cone me-2"></i>
            LawnConnect - Brody Was here!
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-it-works">How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">Reviews</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item ms-2">
                <a className="btn btn-accent-custom btn-sm" href="#signup">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section fade-in">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 slide-up">
                Connect with Local <span className="text-accent">Lawn Care</span> Professionals
              </h1>
              <p className="lead mb-4 slide-up">
                Get your lawn mowed by trusted professionals in your area. Quick, reliable, and affordable lawn care services at your fingertips.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 slide-up">
                <button className="btn btn-accent-custom btn-lg px-4">
                  <i className="bi bi-search me-2"></i>
                  Find Lawn Care
                </button>
                <button className="btn btn-outline-light btn-lg px-4">
                  <i className="bi bi-briefcase me-2"></i>
                  Join as Professional
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <i className="bi bi-house-door display-1 text-white opacity-75"></i>
                <i className="bi bi-scissors position-absolute top-50 start-50 translate-middle display-4 text-accent"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Professional Lawn Care Services</h2>
              <p className="lead text-muted">
                From basic mowing to complete landscape maintenance, our network of professionals has you covered.
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="service-card p-4 h-100 hover-lift">
                <div className="text-center mb-3">
                  <i className="bi bi-scissors display-4 text-accent"></i>
                </div>
                <h4 className="text-center mb-3">Lawn Mowing</h4>
                <p className="text-muted text-center">
                  Regular grass cutting and edging to keep your lawn looking pristine and well-maintained.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-4 h-100 hover-lift">
                <div className="text-center mb-3">
                  <i className="bi bi-flower1 display-4 text-accent"></i>
                </div>
                <h4 className="text-center mb-3">Landscaping</h4>
                <p className="text-muted text-center">
                  Complete garden design and maintenance including planting, pruning, and seasonal cleanup.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-4 h-100 hover-lift">
                <div className="text-center mb-3">
                  <i className="bi bi-droplet display-4 text-accent"></i>
                </div>
                <h4 className="text-center mb-3">Fertilizing</h4>
                <p className="text-muted text-center">
                  Professional lawn fertilization and weed control to ensure healthy, green grass year-round.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">How LawnConnect Works</h2>
              <p className="lead text-muted">
                Getting professional lawn care has never been easier. Just three simple steps to a beautiful lawn.
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <div className="bg-accent rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-geo-alt text-white display-6"></i>
                </div>
              </div>
              <h4 className="mb-3">1. Enter Your Location</h4>
              <p className="text-muted">
                Tell us where you need lawn care services and we'll show you available professionals in your area.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <div className="bg-accent rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-calendar-check text-white display-6"></i>
                </div>
              </div>
              <h4 className="mb-3">2. Book Your Service</h4>
              <p className="text-muted">
                Choose your preferred date and time, select the services you need, and book instantly online.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <div className="bg-accent rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-check2-circle text-white display-6"></i>
                </div>
              </div>
              <h4 className="mb-3">3. Enjoy Your Lawn</h4>
              <p className="text-muted">
                Sit back and relax while our trusted professionals take care of your lawn care needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <h3 className="display-4 fw-bold text-accent">500+</h3>
              <p className="text-muted">Trusted Professionals</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-4 fw-bold text-accent">10K+</h3>
              <p className="text-muted">Lawns Serviced</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-4 fw-bold text-accent">4.9</h3>
              <p className="text-muted">Average Rating</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-4 fw-bold text-accent">24h</h3>
              <p className="text-muted">Average Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonial-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">What Our Customers Say</h2>
              <p className="lead text-muted">
                Don't just take our word for it. Here's what our satisfied customers have to say.
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="card-text">
                    "LawnConnect made it so easy to find reliable lawn care. My yard has never looked better!"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                      <span className="text-white fw-bold">JS</span>
                    </div>
                    <div>
                      <h6 className="mb-0">John Smith</h6>
                      <small className="text-muted">Homeowner</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="card-text">
                    "Professional service, fair pricing, and great communication. Highly recommend!"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="bg-accent rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                      <span className="text-white fw-bold">MD</span>
                    </div>
                    <div>
                      <h6 className="mb-0">Maria Davis</h6>
                      <small className="text-muted">Property Manager</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="card-text">
                    "As a lawn care professional, LawnConnect helps me connect with customers easily."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                      <span className="text-white fw-bold">RT</span>
                    </div>
                    <div>
                      <h6 className="mb-0">Robert Taylor</h6>
                      <small className="text-muted">Lawn Care Pro</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-3">Ready to Get Started?</h2>
              <p className="lead mb-4">
                Join thousands of satisfied customers who trust LawnConnect for their lawn care needs.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button className="btn btn-accent-custom btn-lg px-4">
                  <i className="bi bi-download me-2"></i>
                  Get the App
                </button>
                <button className="btn btn-outline-light btn-lg px-4">
                  <i className="bi bi-globe me-2"></i>
                  Book Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-custom py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-scissors me-2"></i>
                LawnConnect
              </h5>
              <p className="text-light opacity-75">
                Connecting homeowners with trusted lawn care professionals for beautiful, well-maintained lawns.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-light opacity-75">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-light opacity-75">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-light opacity-75">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-light opacity-75">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Services</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Lawn Mowing</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Landscaping</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Fertilizing</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Cleanup</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light opacity-75 text-decoration-none">About</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Press</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Blog</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Help Center</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Safety</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Terms</a></li>
              </ul>
            </div>
           
          </div>
          <hr className="my-4 opacity-25" />
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-light opacity-75 mb-0">
                © 2025 LawnConnect. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="#" className="text-light opacity-75 text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-light opacity-75 text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  )
}

export default App