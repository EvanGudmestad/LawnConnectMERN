
import { useState } from "react"
import { authClient } from "./auth-client.js"; 

export default function LoginPage(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
       e.preventDefault();
       try {
      const res = await authClient.signIn.email({email, password});
      // console.log("Login successful:", res);
      if(res.error) {
        console.error("Login error:", res.error.message);
      }
       }
        catch (error) {
   console.error("Login failed:", error.response?.data || error.message);
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