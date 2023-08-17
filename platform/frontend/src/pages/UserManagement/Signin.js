import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderLite from "../../components/HeaderLite";

function Signin(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <HeaderLite />
      <div className="flex flex-col items-center justify-center w-full">
        {/* sign in outer container */}
        <div className="flex flex-col items-center justify-center p-8 space-y-2">
          {/* title */}
          <p className="text-5xl font-bold text-center text-white">Sign In</p>
          {/* input container */}
          <div className="flex flex-col items-center justify-center py-6 pb-12 space-y-3">
            {/* email  */}
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="font-bold text-white label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              />
            </div>
            {/* password */}
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Password
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your password"
                className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              />
            </div>
          </div>

          {/* banker otp check */}
          <p className="text-center text-white">
            An OTP has been sent to your provided email.<br></br> The OTP will
            be valid for only 5 minutes.
          </p>
          {/* otp input */}
          <div className="w-full max-w-xs py-12 pt-4 form-control">
            <label className="label">
              <span className="font-bold text-white label-text">OTP</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email OTP"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
            />
          </div>

          {/* submit button */}
          <button className="w-full py-2 text-lg text-black capitalize border-0 rounded-full bg-gGreen btn">
            Sign In
          </button>

          {/* forward to sign up */}
          <div>
            <p className="pt-2 text-sm text-white">
              Don't have an account?{" "}
              <span
                className="font-bold text-white underline hover:cursor-pointer underline-offset-2"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>

          <div className="py-8 divider before:bg-white/10 after:bg-white/10"></div>

          {/* forgot password */}
          <div>
            <p className="font-bold text-center text-white underline hover:cursor-pointer underline-offset-2">
              Forgot Password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
