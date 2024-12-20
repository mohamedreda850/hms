import React from "react";
import { Link } from "react-router-dom";
import logoInput from "../../../assets/images/Staycation..png";

function ForgotTitle() {
  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          marginRight: "50px",
          marginBottom: "50px",
        }}
      >
        <img src={logoInput} alt="" />
      </div>
      <div style={{ paddingInline: "40px" }}>
        <h5 style={{ fontSize: "2rem" }}>Forgot password</h5>
        <p>If you already have an account register</p>
        <p>
          You can{" "}
          <Link
            style={{
              paddingLeft: "10px",
              textDecoration: "none",
              color: "red",
              fontWeight: "bold",
            }}
            to="/auth/login"
          >
            Login Here !
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default ForgotTitle;
