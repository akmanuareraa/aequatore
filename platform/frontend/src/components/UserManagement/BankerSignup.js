import React from "react";

import backbutton from "../../assets/svg/left-arrow.svg";

function BankerSignup(props) {
  return (
    <div className="flex items-center justify-center pt-12">
      {/* inner container */}
      <div className="flex flex-col w-[800px]">
        {/* title bar */}
        <div className="flex flex-row items-end justify-between">
          {/* title */}
          <div className="flex flex-col items-start">
            <p className="text-sm text-center text-white">Banker</p>
            <p className="text-5xl font-bold text-center text-white">Sign Up</p>
          </div>

          {/* back button */}
          <img
            src={backbutton}
            alt="back button"
            className="w-10 h-10 cursor-pointer"
            onClick={() => props.setWindowState("role")}
          />
        </div>
        <div className="divider before:bg-white/10 after:bg-white/10"></div>

        {/* email and password input container */}
        <div className="grid items-center justify-center w-full grid-cols-2 grid-rows-2 gap-y-4">
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
            />
          </div>

          {/* confirm email */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Confirm Email
              </span>
            </label>
            <input
              type="text"
              placeholder="Re-Enter your email"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
            />
          </div>

          {/* password */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
            />
          </div>

          {/* confirm password */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Re-Enter your password"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
            />
          </div>
        </div>

        {/* banker otp check */}
        <div className="flex flex-col w-full">
          <p className="py-8 pt-12 text-center text-white w-fit">
            An OTP has been sent to your provided email. The OTP will be valid
            for only 5 minutes.
          </p>
        </div>

        {/* otp input */}
        <div className="w-full max-w-xs pb-12 form-control">
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
        <button className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn">
          Sign In
        </button>

        {/* forward to sign in */}
        <div>
          <p className="pt-4 text-sm text-white">
            Already have an account?{" "}
            <span
              className="font-bold text-white underline hover:cursor-pointer underline-offset-2"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BankerSignup;
