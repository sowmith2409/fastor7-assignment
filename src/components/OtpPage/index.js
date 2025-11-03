import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = (event) => {
    event.preventDefault();
    if (otp === "123456") {
      localStorage.setItem("isLoggedIn", true);
      navigate("/restaurants");
    } else {
      alert("Invalid OTP. Try 123456");
    }
  };

  return (
    <div className="otp-container">
        <div className="container">
             <h2 className="otp-heading">Enter OTP</h2>
            <form onSubmit={handleVerify}>
                <input
                className="input"
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                required
                />
                <button type="submit" className="button">Verify</button>
            </form>
        </div>
    </div>
  );
}

export default OtpPage;
