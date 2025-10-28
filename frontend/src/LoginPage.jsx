import { useState } from "react"
import { authClient } from "./auth-client.js"; 

export default function LoginPage(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleSubmit = async (e) => {
       e.preventDefault();
       try {
      const res = await authClient.signIn.email({email, password});
      // console.log("Login successful:", res);
      if(res.error) {
        console.error("Login error:", res.error.message);
      }else{
        console.log(`Login successful! ${JSON.stringify(res)}`);
      }
       }
        catch (error) {
   console.error("Login failed:", error.response?.data || error.message);
  }
  }



async function handleGoogleSignIn() {
    // You would typically use a pre-configured client instance here:
    // import { authClient } from "./auth-client";
    // await authClient.signIn.social({ provider: "google" });

    // Since we are simulating, we make a direct call that triggers the OAuth flow.
    const signInEndpoint = "/api/auth/sign-in/social";
    const callbackURL = `${window.location.origin}/dashboard`; // post-login URL in your app

    // Construct the request body
    const requestBody = {
        provider: "google",
        callbackURL: callbackURL 
    };

    try {
      setIsGoogleLoading(true);
      const response = await fetch(signInEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      // If server really sent a 302 (rare with fetch), handle it
      if (response.redirected && response.url) {
        window.location.href = response.url;
        return;
      }

      // Most Better Auth setups return JSON { url, redirect: true }
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const result = await response.json();
        if ((result.redirect || result.url) && result.url) {
          window.location.href = result.url;
          return;
        }
        throw new Error(result.error?.message || 'Unknown error');
      } else {
        const text = await response.text();
        throw new Error(text || 'Unknown error');
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      alert(`Sign-in failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsGoogleLoading(false);
    }
}



  return(
<div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="card shadow-sm" style={{ width: "100%", maxWidth: "400px", border: "none" }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{ color: "#000000" }}>
              Sign in
            </h2>
            <p className="text-muted small">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold" style={{ color: "#000000" }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderColor: "#e0e0e0",
                  padding: "0.75rem",
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold" style={{ color: "#000000" }}>
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderColor: "#e0e0e0",
                    padding: "0.75rem",
                  }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderColor: "#e0e0e0" }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label small" htmlFor="remember" style={{ color: "#666666" }}>
                  Remember me
                </label>
              </div>
              <a href="#" className="small text-decoration-none" style={{ color: "#000000" }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-semibold"
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "0.75rem",
                border: "none",
              }}
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <div style={{ height: 1, backgroundColor: "#e0e0e0", flex: 1 }} />
            <span className="mx-2 text-muted small">or</span>
            <div style={{ height: 1, backgroundColor: "#e0e0e0", flex: 1 }} />
          </div>

          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="btn w-100 fw-semibold d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "0.75rem",
              border: "1px solid #e0e0e0",
            }}
          >
            {/* Google G icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
              width="20"
              height="20"
              style={{ marginRight: 8 }}
            >
              <path fill="#EA4335" d="M533.5 278.4c0-18.5-1.6-37.1-5-55.1H272.1v104.4h147c-6.3 33.9-25.8 62.6-55 81.7v67.7h88.8c52-47.9 80.6-118.5 80.6-198.7z"/>
              <path fill="#34A853" d="M272.1 544.3c72.9 0 134.3-24.1 179-65.6l-88.8-67.7c-24.7 16.6-56.4 26.2-90.2 26.2-69.3 0-128-46.8-149-109.6h-92.6v68.8c44.8 88.9 137.1 147.9 241.6 147.9z"/>
              <path fill="#4A90E2" d="M123.1 327.6c-10.5-31.4-10.5-65.9 0-97.3v-68.8H30.5c-42.8 84.9-42.8 182.3 0 267.2l92.6-68.8z"/>
              <path fill="#FBBC05" d="M272.1 106.9c38.5-.6 75.7 13.4 104.2 39.4l77.5-77.5C404.3 24.3 339.3-1.1 272.1 0 167.6 0 75.3 59 30.5 147.9l92.6 68.8C144.1 153.9 202.8 106.9 272.1 106.9z"/>
            </svg>
            {isGoogleLoading ? "Redirecting…" : "Sign in with Google"}
          </button>

          <div className="text-center mt-4">
            <p className="small text-muted mb-0">
              Don't have an account?{" "}
              <a href="#" className="text-decoration-none fw-semibold" style={{ color: "#000000" }}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}