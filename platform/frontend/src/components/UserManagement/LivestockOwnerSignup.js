import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import addGreen from "../../assets/svg/add-green.svg";
import backbutton from "../../assets/svg/left-arrow.svg";
import removeGreen from "../../assets/svg/remove-green.svg";

function LivestockSignup(props) {
  const {
    appData,
    setAppData,
    signupLivestockOwner,
    initializeWeb3,
    disconnectWallet,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    income: "",
    householdSize: "",
  });

  // const [livestockList, setLivestockList] = useState([
  //   { name: "", population: "" },
  // ]);

  // const handleLivestockChange = (index, field, value) => {
  //   const updatedList = [...livestockList];
  //   updatedList[index][field] = value;
  //   setLivestockList(updatedList);
  // };

  // const addLivestockBlock = () => {
  //   setLivestockList([...livestockList, { name: "", population: "" }]);
  // };

  // const removeLivestockBlock = (index) => {
  //   const updatedList = [...livestockList];
  //   updatedList.splice(index, 1);
  //   setLivestockList(updatedList);
  // };

  const handleFormSubmit = async () => {
    const validations = [
      [formData.name, "Please enter your name"],
      [formData.email, "Please enter your email"],
      [formData.password, "Please provide a password"],
      [formData.confirmPassword, "Please confirm your password"],
      [
        formData.password === formData.confirmPassword,
        "Passwords do not match",
      ],
      [formData.password.length >= 6, "Password must be atleast 6 characters"],
      [formData.age, "Please enter your age"],
      [formData.income, "Please enter your income"],
      [formData.householdSize, "Please enter your household size"],

      // [livestockList.length !== 0, "Please enter your livestock details [1]"],
    ];

    // for (const [field, errorMessage] of validations) {
    //   if (!field) {
    //     toast.error(errorMessage);
    //     console.log("error", livestockList.length);
    //     return;
    //   }
    // }

    // for (const livestock of livestockList) {
    //   if (!livestock.name || !livestock.population) {
    //     toast.error("Please enter livestock details [2]");
    //     return;
    //   }
    // }

    const signupResult = await signupLivestockOwner(formData);
    console.log("signupResult", signupResult);
  };

  return (
    <div className="flex items-center justify-center pt-12">
      {/* inner container */}
      <div className="flex flex-col w-[800px]">
        {/* title bar */}
        <div className="flex flex-row items-end justify-between">
          {/* title */}
          <div className="flex flex-col items-start">
            <p className="text-sm text-center text-white">Livestock Owner</p>
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

        {/* basic details input container */}
        <div className="grid items-center justify-center w-full grid-cols-2 grid-rows-2 gap-y-4">
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>

          {/* email */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
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
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
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
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
            />
          </div>
          {/* age */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Age</span>
            </label>
            <input
              type="text"
              placeholder="Enter your age"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
              }}
            />
          </div>
          {/* income */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Income</span>
            </label>
            <input
              type="text"
              placeholder="Enter your income"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.income}
              onChange={(e) => {
                setFormData({ ...formData, income: e.target.value });
              }}
            />
          </div>
          {/* household size */}
          <div className="col-span-2 form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Household Size
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your household size"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.householdSize}
              onChange={(e) => {
                setFormData({ ...formData, householdSize: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-row items-center w-full col-span-2 mt-4 space-x-8">
            {appData.blockchain.address === "" ||
            appData.blockchain.address === undefined ? (
              <button
                className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
                onClick={() => initializeWeb3()}
              >
                Connect Your Wallet
              </button>
            ) : (
              <button
                className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
                onClick={() => disconnectWallet()}
              >
                Disconnect Wallet
              </button>
            )}
            <p className="text-white ">
              {appData.blockchain.address === undefined ||
              appData.blockchain.address === ""
                ? "No Wallet Connected"
                : appData.blockchain.address}
            </p>
          </div>
        </div>

        {/* livestock input container */}
        {/* livestock details input container */}
        <div className="flex flex-col mt-12">
          {/* title bar */}
          {/* <p className="text-3xl font-bold text-white">Add Livestock</p>
          <p className="text-sm text-white">
            Provide details about the livestock you own
          </p> */}

          {/* livestock input container */}
          {/* <div className="flex flex-col mt-4 space-y-4">
            {livestockList.map((livestock, index) => (
              <div key={index} className="flex items-center space-x-4">
                name
                <input
                  type="text"
                  placeholder="Livestock Name"
                  className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-2"
                  value={livestock.name}
                  onChange={(e) =>
                    handleLivestockChange(index, "name", e.target.value)
                  }
                />
                population
                <input
                  type="text"
                  placeholder="Population"
                  className="w-[150px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-2"
                  value={livestock.population}
                  onChange={(e) =>
                    handleLivestockChange(index, "population", e.target.value)
                  }
                />
                remove button
                {livestockList.length > 1 ? (
                  <button>
                    <img
                      src={removeGreen}
                      alt="add"
                      className="w-8 h-8"
                      onClick={() => removeLivestockBlock(index)}
                    />
                  </button>
                ) : null}

                {index === livestockList.length - 1 ? (
                  <button>
                    <img
                      src={addGreen}
                      alt="add"
                      className="w-8 h-8"
                      onClick={addLivestockBlock}
                    />
                  </button>
                ) : null}
              </div>
            ))}
          </div>*/}
        </div>

        {/* submit button */}
        <button
          className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
          onClick={() => {
            if (
              appData.blockchain.address === "" ||
              appData.blockchain.address === undefined
            ) {
              toast.error("Please connect your wallet");
              return;
            } else {
              handleFormSubmit();
            }
          }}
        >
          Sign Up
        </button>
        {/* forward to sign in */}
        <div>
          <p className="pt-4 pb-16 text-sm text-white">
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

export default LivestockSignup;
