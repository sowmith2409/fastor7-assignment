import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function LoginPage() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      localStorage.setItem("mobile", mobile);
      navigate("/otp");
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  return (
    <div className="login-container">
        <div className="container">
            <h2 className="login-heading">Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="number"
                className="input"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                />
                <button type="submit" className="button">Get OTP</button>
            </form>
        </div>
    </div>
  );
}

export default LoginPage;
