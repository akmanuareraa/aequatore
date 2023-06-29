import React from "react";

import logoW from "../assets/svg/logo-white.svg";
import rightArrow from "../assets/svg/right-arrow.svg";
import rightArrowW from "../assets/svg/right-arrowW.svg";
import ParticleCustom from "../components/ParticleCustom";
import upc from "../assets/svg/upc.svg";
import downc from "../assets/svg/downc.svg";

import ucone from "../assets/svg/ucone.svg";
import uctwo from "../assets/svg/uctwo.svg";
import ucthree from "../assets/svg/ucthree.svg";
import ucfour from "../assets/svg/ucfour.svg";
import ucfive from "../assets/svg/ucfive.svg";
import ucsix from "../assets/svg/ucsix.svg";
import ucseven from "../assets/svg/ucseven.svg";
import uceight from "../assets/svg/uceight.svg";
import ucnine from "../assets/svg/ucnine.svg";
import ucten from "../assets/svg/ucten.svg";

function Landing(props) {
  return (
    <>
      <div className="relative flex flex-col items-center w-full mt-20 space-y-8">
        <div className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none">
          <ParticleCustom />
        </div>
        <div className="flex flex-col">
          {/* navbar */}
          <div className="fixed top-0 left-0 w-full px-10 py-7">
            {/* Your navbar content goes here */}
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  {/* logo block */}
                  <div className="flex flex-row items-center mr-16 space-x-2">
                    <img src={logoW} alt="logo" className="w-12 h-12" />
                    <p className="text-3xl font-extrabold text-white">
                      Æquatore
                    </p>
                  </div>
                </div>

                {/* menu block */}
                {/* <div className="flex flex-row items-center space-x-8">
                  <div
                    className="flex flex-row items-center hover:border-b-2 hover:border-b-white"
                    onClick={() => console.log("clicked")}
                  >
                    <p className="mt-2 text-white">Who we are</p>
                  </div>
                  <div
                    className="flex flex-row items-center hover:border-b-2 hover:border-b-white"
                    onClick={() => console.log("clicked")}
                  >
                    <p className="mt-2 text-white">Our Mission</p>
                  </div>
                  <div
                    className="flex flex-row items-center hover:border-b-2 hover:border-b-white"
                    onClick={() => console.log("clicked")}
                  >
                    <p className="mt-2 text-white">What we do</p>
                  </div>
                  <div
                    className="flex flex-row items-center hover:border-b-2 hover:border-b-white"
                    onClick={() => console.log("clicked")}
                  >
                    <p className="mt-2 text-white">Where</p>
                  </div>
                  <div
                    className="flex flex-row items-center hover:border-b-2 hover:border-b-white"
                    onClick={() => console.log("clicked")}
                  >
                    <p className="mt-2 text-white">Join Us</p>
                  </div>
                </div> */}
              </div>

              {/* to platform button */}
              <div className="flex flex-row items-center mt-2">
                <button className="px-12 py-2 font-bold text-black bg-white rounded-full">
                  <div className="flex flex-row items-center space-x-4">
                    <p>To Platform</p>
                    <img
                      src={rightArrow}
                      alt="right-arrow"
                      className="w-4 h-4"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* hero */}
          <div className="z-10 flex flex-col items-center justify-center mt-4">
            {/* hero text */}
            <p className="text-white">A Research Initiative</p>

            {/* hero title */}
            <p className="text-[100px] font-extrabold text-center text-white leading-tight">
              <span>Technology</span>
              <br />
              <span>Empowerment</span>
              <br />
              <span>Equality</span>
            </p>

            {/* hero subtitle */}
            <p className="text-center text-white w-[700px] mt-6">
              Secure microfinancing for women in developing countries using
              blockchain technology. Empowering financial independence and
              entrepreneurship.
            </p>

            {/* hero buttons */}
            <div className="flex flex-row items-center space-x-8">
              <button className="px-12 py-2 mt-10 font-bold text-black bg-white rounded-full">
                <div className="flex flex-row items-center space-x-4">
                  <p>Learn More</p>
                  <img src={rightArrow} alt="right-arrow" className="w-4 h-4" />
                </div>
              </button>

              <button className="px-12 py-2 mt-10 font-bold text-white bg-black border-2 border-white rounded-full">
                <div className="flex flex-row items-center space-x-4">
                  <p>Join Us</p>
                  <img
                    src={rightArrowW}
                    alt="right-arrow"
                    className="w-4 h-4 hover:bg-black"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* who we are */}
          <div className="z-10 flex flex-row items-center justify-center p-8 mt-40 mb-28 space-x-36">
            {/* left container */}
            <div className="flex flex-col justify-center">
              <p className="text-6xl font-extrabold text-center text-white">
                Who We Are.
              </p>
              <p className="text-lg text-center text-white">
                Breaking Barriers, Building Futures
              </p>
            </div>

            {/* right container */}
            <div className="flex flex-col justify-center space-y-8 w-[450px]">
              <p className="text-white ">
                We are a team of computer scientists and economists with a
                mission to reduce gender inequalities and promote sustainable
                and inclusive development. Together, we are committed to
                promoting equality between men and women.
              </p>
              <p className="text-white ">
                Thanks to our experience in the blockchain industry and
                supporting social and sustainable development, we offer new
                tools and opportunities to women in rural areas of developing
                countries, enabling them to achieve economic and financial
                independence.
              </p>
            </div>
          </div>

          {/* our mission */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-12 mb-12 w-[1000px]">
            {/* heading */}
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-6xl font-extrabold text-center text-white">
                Our <br /> Mission.
              </p>
              <p className="text-lg text-center text-white">
                Achieving gender equality is our mission.
              </p>
            </div>

            {/* cards */}
            <div className="flex flex-row items-stretch justify-center mt-8 space-x-8">
              {/* card 1 */}
              <div className="flex flex-col justify-center p-8 space-y-4 rounded-3xl">
                <p className="font-semibold text-white text-md">
                  EMPOWERING SUSTAINABLE AND INCLUSIVE DEVELOPMENT
                </p>
                <p className="text-white ">
                  Our vision is a world where sustainable and inclusive
                  development is a tangible reality.We believe that gender
                  equality is a fundamental right, and we want to do our part to
                  ensure that every woman has access to the same opportunities
                  as men.
                </p>
              </div>

              {/* card 2 */}
              <div className="flex flex-col justify-center p-8 space-y-4 rounded-3xl">
                <p className="font-semibold text-left text-white text-md">
                  WOMEN'S CHALLENGES IN <br />
                  DEVELOPING COUNTRIES
                </p>
                <p className="text-white ">
                  Women in developing countries face discrimination and
                  gender-based stereotypes, varying from country to country and
                  context. They have limited access to food, education, and
                  employment opportunities. Particularly in the agrifood sector,
                  where female employment is often concentrated, women lack
                  access to productive resources, especially land, which has
                  implications for their access to banking and financial
                  services, as well as productivity.
                </p>
              </div>
            </div>

            {/* cards */}
            <div className="flex flex-row items-stretch justify-center mt-8 space-x-8">
              {/* card 3 */}
              <div className="flex flex-col justify-center p-8 space-y-4 rounded-3xl">
                <p className="font-semibold text-white text-md">
                  UNLOCKING OPPORTUNITIES FOR WOMEN
                  <br />
                  THROUGH BLOCKCHAIN INNOVATION
                </p>
                <p className="text-white ">
                  Through blockchain technology, we create innovative solutions
                  that allow women to access financial services, manage their
                  finances, and start entrepreneurial activities. We create
                  opportunities to develop the potential of every woman in every
                  place. We believe that our work can have a significant impact
                  on the lives of women and the communities in which they live.
                </p>
              </div>

              {/* card 4 */}
              <div className="flex flex-col justify-center p-8 space-y-4 rounded-3xl">
                <p className="font-semibold text-white text-md">
                  JOIN US IN CREATING
                  <br />A FAIR AND JUST FUTURE
                </p>
                <p className="text-white ">
                  A fairer and more just future is possible, and we are ready to
                  work towards it. Join us in our mission to promote gender
                  equality and inclusive sustainable development through
                  blockchain technology.
                </p>
              </div>
            </div>
          </div>

          {/* what we do */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-20 mb-20 w-[600px]">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-6xl font-extrabold text-center text-white">
                What We Do.
              </p>
              <p className="text-lg text-center text-white">
                Revolutionizing Financial Inclusion
              </p>
              <p className="pt-6 text-center text-white w-[600px]">
                We use blockchain to create a decentralized platform where women
                can provide collateral and obtain microfinancing. Blockchain
                ensures that all transactions are traceable, immutable, and
                secure.
              </p>
            </div>
          </div>

          {/* where */}
          {/* <div className="z-10 flex flex-col self-center justify-center p-8 mt-28 mb-36 w-[1000px]"> */}
          {/* heading */}
          {/* <div className="flex flex-row items-center justify-center space-x-12">
              <p className="text-6xl font-extrabold text-center text-white">
                Where.
              </p>
              <div className="flex flex-row space-x-4">
                <img src={upc} alt="upc" className="w-4 mb-8" />
                <p className="mt-4 mb-4 text-white">
                  The pilot project will be tested in XX.
                </p>
                <img src={downc} alt="upc" className="w-4 mt-8" />
              </div>
            </div> */}
          {/* </div> */}

          {/* use cases */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-28 mb-36">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-6xl font-extrabold text-center text-white">
                Blockchain in Æquatore
              </p>
              <p className="pb-4 text-lg text-center text-white">Use Cases</p>
              <div className="grid items-center justify-center grid-cols-5 grid-rows-2 space-x-8 space-y-10">
                <div className="flex flex-col items-center justify-center mt-10 ml-4 space-y-0">
                  <img src={ucone} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Transparent Transactions</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={uctwo} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Decentralized Microfinancing</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucthree} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Immutable Record-Keeping</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucfour} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Secure Digital Identities</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucfive} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Traceability of Funds</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucsix} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Smart Loan Management</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucseven} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Cross-Border Transactions</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={uceight} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Empowering Women</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucnine} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Peer-to-Peer Lending</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucten} alt="upc" className="w-16 h-16" />
                  <p className="text-white">Supply Chain Financing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* join us */}
        <div className="z-10 flex flex-col items-center justify-center w-full px-16 py-12 mt-16 space-y-16 bg-white/90">
          <div className="flex flex-row items-center space-x-28">
            <p className="font-extrabold text-black text-[100px]">Join Us.</p>
            <p className="text-center text-black font-md w-[700px]">
              If you share our vision and want to support women's empowerment in
              developing countries, join us. We are constantly seeking partners,
              supporters, and investors who believe in the power of social
              change through technology and gender equity. Together, we can make
              a difference in the lives of women in developing countries.
            </p>
          </div>
          <button className="px-16 py-4 text-white capitalize bg-black border-0 rounded-full btn w-fit hover:bg-black ">
            Join Us
          </button>
        </div>
      </div>
    </>
  );
}

export default Landing;
