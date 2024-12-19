import React, { useEffect, useState } from "react";
import "./Login.css";
import png from "../assets/image/unlock.png";
import Email from "../assets/image/auth-email.png";
import bewta from "../assets/image/bewta-logo.svg";
import bg from "../assets/image/image-bg.png";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

const SuperAdmin = gql`
  query SuperAdmin($email: String!, $password: String!) {
    superadmin(email: $email, password: $password) { 
      _id
      name
      email
      isAdmin
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();


  const [superadmin, { data, loading, error }] = useLazyQuery(
    SuperAdmin
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    superadmin({ variables: { email, password } });

  };
  useEffect(() => {
    if (data) {
      Cookies.set("token", data.superadmin[0].token, { expires: 7 });
      Cookies.set("SuperAdmin", data.superadmin[0]._id);
      navigate("/dashboard", {
        state: { SuperAdmin: data.superadmin },
      });
      toast.success("Login Successful", { position: "top-right" });
    }

    if (error) {
      // Show error toast when login fails
      toast.error(`Login failed: ${error.message}`, { position: "top-right" });
    }
  }, [data, error, navigate]);


  return (
    <div className="main-container d-flex justify-content-center align-items-center w-100vw  ">
      <div className="login-container d-flex flex-column flex-sm-row ">
        <div className="left-inside d-flex flex-column justify-content-center align-items-center  ">
          <div className="img-container position-relative  ">
            <img src={bg} alt="bg" className=" img-bg  " />
            {/* <img src={overlap} alt="bg" className="img-fluid img-overlap " />  */}
            <div className="text-overlap position-absolute d-flex flex-column justify-content-center align-items-center">
              <div>
                <h1 className=" left-h1 fw-bold fs-3">
                  Hello, <br />
                  Friend!
                </h1>
              </div>
              <div className="x-line mb-4 line-bar-ab"></div>
              <div>
                <p className="left-p fs-7">
                  Fill Up personal <br />
                  information and <br /> Start Journey with us
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="right-inside">
          <div className="d-flex justify-content-center align-items-center mb-4 ">
            <img src={bewta} alt="bewta" className="mt-3" />
            <h1 className="Bewta fw-bolder  ">Bewta Super Admin</h1>
          </div>

          <div>
            <form
              className=" d-flex flex-column align-items-center"
              typeof="submit"
              onSubmit={handleSubmit}
            >
              <div>
                <h1 className=" form-heading fs-2">Sign in to Account</h1>
              </div>

              <div className=" form-content d-flex flex-column justify-content-between align-items-center">
                <label className="input-label px-2 py-1  d-flex justify-content-center align-items-center">
                  <input
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <img src={Email} alt="email" />
                </label>
                <label className="input-label px-2 py-1  d-flex justify-content-center align-items-center">
                  <input
                    type="password" 
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img src={png} alt="unlock" />
                </label>
              </div>

              <div   className="mt-2"    style={{display:"flex",justifyContent:"center",gap:"50px"}}>
                  <div className="form-check row-lg-6">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customControlInline"
                    />
                    <label
                      className="form-check-label text-muted custom-rem-ab"
                      htmlFor="customControlInline"
                    >
                      Remember me 
                    </label>
                  </div>

                  <div className="text-center row-lg-6">
                    <label
                       style={{fontSize:'14px',fontWeight:"600"}}
                      className="text-muted"
                    >
                      Forgot your password?
                    </label>
                  </div> 


              </div>


              <div className="btn-container ">
                <button className="Login-btn p-2  ">
                  {" "}
                  {loading ? "Logging in..." : "LOGIN"}
                </button>
              </div>



            </form>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 p-2 mt-3">
            <div>
              <p className="footer-p mt-2 ">
                Privacy
                <br /> Policy
              </p>
            </div>
            <div className="dot mb-4"></div>
            <div>
              {" "}
              <p className="footer-p mt-2 ">
                Terms & <br /> Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;




