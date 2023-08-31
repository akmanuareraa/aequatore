import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../services/firebase.config";
import { AppContext } from "../../AppContext";

import HeaderLite from "../../components/HeaderLite";
import { toast } from "react-hot-toast";

function Signin(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const collectionRef = collection(db, "users");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(false);

  const handleFormSubmit = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, user.uid);

          const userDataQuery = query(
            collectionRef,
            where("userUid", "==", user.uid)
          );
          const userDataSnapshot = await getDocs(userDataQuery);

          if (!userDataSnapshot.empty) {
            userDataSnapshot.forEach((doc) => {
              const userData = doc.data();
              console.log("userData:", userData);
              if (userData.role === "livestockOwner") {
                toast.success("Signed in successfully");
                setAppData((prevSate) => {
                  return {
                    ...prevSate,
                    userProfile: userData,
                  };
                });
                navigate("/dashboard/my-farm");
              } else if (userData.role === "banker") {
                setOtp(true);
                toast.success("Moving to OTP stage");
                // toast.success("Signed in successfully");
                // setAppData((prevSate) => {
                //   return {
                //     ...prevSate,
                //     userProfile: {
                //       generalInfo: userData,
                //     },
                //   };
                // });
              }
            });
          } else {
            console.log("No matching documents found for the user.");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("Incorrect Credentials");
          console.log(errorMessage);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {
            // otp input container
            otp === true ? (
              <div className="flex flex-col items-center justify-center py-6 pb-12 space-y-3">
                {/* otp  */}
                <div className="w-full max-w-xs form-control">
                  <label className="label">
                    <span className="font-bold text-white label-text">OTP</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your OTP"
                    className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
            ) : null
          }

          {/* submit button */}
          <button
            className="w-full py-2 text-lg text-black capitalize border-0 rounded-full bg-gGreen btn"
            onClick={handleFormSubmit}
          >
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
