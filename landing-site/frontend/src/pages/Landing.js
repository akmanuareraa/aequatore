import React from "react";

import logoW from "../assets/svg/logo-white.svg";
import rightArrow from "../assets/svg/right-arrow.svg";
import rightArrowW from "../assets/svg/right-arrowW.svg";
import ParticleCustom from "../components/ParticleCustom";
import upc from "../assets/svg/upc.svg";
import downc from "../assets/svg/downc.svg";
import logoSymbolWhite from "../assets/svg/logo-symbol-w-c.svg";
import logoNameWhite from "../assets/svg/logo-name-w-c.svg";

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
          <div className="fixed top-0 left-0 w-full lg:px-10 py-7">
            {/* navbar content */}
            <div className="flex flex-row items-center justify-center w-screen lg:justify-between lg:w-full">
              {/* name and symbol */}
              <div className="flex flex-row items-center justify-center lg:justify-between">
                <div className="flex flex-row items-center justify-center">
                  {/* logo block */}
                  <div className="flex flex-row items-center space-x-6 lg:mr-16">
                    <img
                      src={logoSymbolWhite}
                      alt="logo"
                      className="w-16 h-16"
                    />
                    <img
                      src={logoNameWhite}
                      alt="logo"
                      className="w-40 h-16 mt-1"
                    />
                    {/* <p className="text-3xl font-extrabold text-white">
                      Æquatore
                    </p> */}
                  </div>
                </div>
              </div>

              {/* to platform button */}
              <div className="flex-row items-center hidden mt-2 lg:flex">
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
            <p className="mt-8 text-xs text-white lg:text-lg lg:mt-0">
              A Research Initiative
            </p>

            {/* hero title */}
            <p className="lg:text-[100px] text-[45px]  font-extrabold text-center text-white leading-tight">
              <span>Technology</span>
              <br />
              <span>Empowerment</span>
              <br />
              <span>Equality</span>
            </p>

            {/* hero subtitle */}
            <p className="text-center text-white lg:w-[700px] w-[300px]  mt-6 lg:text-lg text-xs">
              Secure microfinancing for women in developing countries using
              blockchain technology. Empowering financial independence and
              entrepreneurship.
            </p>

            {/* hero buttons */}
            <div className="flex flex-col items-center mt-8 space-y-4 lg:space-y-0 lg:space-x-8 lg:flex-row lg:mt-10">
              <button className="px-12 py-2 font-bold text-black bg-white rounded-full">
                <div className="flex flex-row items-center space-x-4">
                  <p>Learn More</p>
                  <img src={rightArrow} alt="right-arrow" className="w-4 h-4" />
                </div>
              </button>

              <button className="px-12 py-2 font-bold text-white bg-black border-2 border-white rounded-full">
                <div className="flex flex-row items-center space-x-4">
                  <p>Join Us</p>
                  <img
                    src={rightArrowW}
                    alt="right-arrow"
                    className="w-4 h-4 hover:bg-black"
                  />
                </div>
              </button>

              <button className="px-12 py-2 font-bold text-black bg-white rounded-full lg:hidden">
                <div className="flex flex-row items-center space-x-4">
                  <p>To Platform</p>
                  <img src={rightArrow} alt="right-arrow" className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* who we are */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-24 lg:mt-36 mb-8 lg:w-[1200px] w-[300px] lg:items-center">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
              <p className="text-4xl font-extrabold text-center text-white lg:text-6xl lg:hidden">
                Who We Are
              </p>
              <p className="text-sm text-center lg:hidden text-white/50 lg:text-lg">
                Inspiring Positive Change
              </p>
              <div className="flex-col justify-center hidden space-y-2 lg:flex">
                <p className="text-4xl font-extrabold text-center text-white lg:text-6xl">
                  Who We Are
                </p>
                <p className="text-sm text-center text-white/50 lg:text-lg">
                  Inspiring Positive Change
                </p>
              </div>
              <p className="pt-3 lg:pt-0 text-center text-white w-[300px] lg:w-[600px] lg:text-lg text-sm">
                We are a team of experts in finance and economics, driven by one
                mission: to reduce gender inequalities and foster sustainable
                and inclusive development.
              </p>
            </div>
          </div>

          {/* Our focus */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-24 mb-8 lg:w-[600px] w-[300px]">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-4xl font-extrabold text-center text-white lg:text-6xl">
                Our Focus
              </p>
              <p className="text-sm text-center text-white/50 lg:text-lg">
                Financial Inclusion, Empowering Women
              </p>
              <div className="flex flex-col p-6 pt-3 rounded-2xl lg:pt-6 bg-white/10">
                <p className="text-center text-white w-[300px] lg:w-[600px] lg:text-lg text-sm">
                  We provide women in rural areas of developing countries with
                  new tools and opportunities. By combining our expertise in
                  blockchain technology and social development, we empower women
                  to achieve economic and financial independence.
                </p>
              </div>
            </div>
          </div>

          {/* our mission */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-24 lg:mt-36 mb-8 lg:w-[1200px] w-[300px] lg:items-center">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
              <p className="text-4xl font-extrabold text-center text-white lg:text-6xl lg:hidden">
                Our Mission
              </p>
              <p className="text-sm text-center lg:hidden text-white/50 lg:text-lg">
                Empowering Dreams, Rural Women United
              </p>
              <p className="pt-3 lg:pt-0 text-center text-white w-[300px] lg:w-[600px] lg:text-lg text-sm">
                We are dedicated to unlocking the potential of every woman,
                regardless of her location. Through the transformative power of
                blockchain, we strive for gender equality and sustainable
                development.
              </p>
              <div className="flex-col justify-center hidden space-y-2 lg:flex">
                <p className="text-4xl font-extrabold text-center text-white lg:text-6xl">
                  Our Mission
                </p>
                <p className="text-sm text-center text-white/50 lg:text-lg">
                  Empowering Dreams, Rural Women United
                </p>
              </div>
            </div>
          </div>

          {/* what we do */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-24 lg:mt-36 mb-8 lg:w-[1200px] w-[300px] lg:items-center">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
              <p className="text-4xl font-extrabold text-center text-white lg:text-6xl lg:hidden">
                What We Do
              </p>
              <p className="text-sm text-center lg:hidden text-white/50 lg:text-lg">
                Microfinance Reinvented for Rural Women
              </p>
              <div className="flex-col justify-center hidden space-y-2 lg:flex">
                <p className="text-4xl font-extrabold text-center text-white lg:text-6xl">
                  What We Do
                </p>
                <p className="text-sm text-center text-white/50 lg:text-lg">
                  Microfinance Reinvented for Rural Women
                </p>
              </div>
              <p className="pt-3 lg:pt-0 text-center text-white w-[300px] lg:w-[600px] lg:text-lg text-sm">
                We establish a decentralized platform where women can use their
                assets as collateral, opening doors to financial services and
                enabling them to pursue entrepreneurial opportunities. With
                blockchain technology, every transaction is traceable, secure,
                and unalterable. We create opportunities to develop the
                potential of every woman everywhere Unlocking their Economic
                Independence
              </p>
            </div>
          </div>

          {/* why it matters */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-24 lg:mt-36 mb-8 lg:w-[1200px] w-[300px] lg:items-center">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
              <p className="text-4xl font-extrabold text-center text-white lg:text-6xl lg:hidden">
                Why it Matters
              </p>
              <p className="text-sm text-center lg:hidden text-white/50 lg:text-lg">
                Empowerment for Her, Progress for All
              </p>
              <p className="pt-3 lg:pt-0 text-center text-white w-[300px] lg:w-[600px] lg:text-lg text-sm">
                Women in developing countries often face discrimination and
                stereotypes based on their gender. They have limited access to
                food, education, and employment. In sectors such as agri-food,
                where many women work, access to productive resources,
                especially land, is lacking. This has profound implications for
                their ability to access financial services and maximize their
                productivity.
              </p>
              <div className="flex-col justify-center hidden space-y-2 lg:flex">
                <p className="text-4xl font-extrabold text-center text-white lg:text-6xl">
                  Why it Matters
                </p>
                <p className="text-sm text-center text-white/50 lg:text-lg">
                  Empowerment for Her, Progress for All
                </p>
              </div>
            </div>
          </div>

          {/* how we do it */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-24 mb-8 lg:w-[600px] w-[300px]">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-4xl font-extrabold text-center text-white lg:text-6xl">
                How we do it
              </p>
              <p className="text-sm text-center text-white/50 lg:text-lg">
                Building Futures, Blockchain-Driven Empowerment
              </p>
              <div className="flex flex-col p-6 pt-3 rounded-2xl lg:pt-6 bg-white/10">
                <p className="text-center text-white w-[300px] lg:w-[600px] lg:text-lg text-sm">
                  We offer women new tools and opportunities in rural areas of
                  developing countries such as an user-friendly decentralized
                  platform where women can use their assets as collateral. This
                  opens up access to essential financial services and enables
                  them to pursue entrepreneurial endeavours.
                  <br />
                  <br /> With the power of blockchain technology, every
                  transaction is secure, traceable, and cannot be altered.
                  Through our expertise in the blockchain industry and
                  commitment to social and sustainable development, we help
                  women achieve economic and financial independence. <br />
                  <br />
                  We believe that by empowering women, we can create a positive
                  impact on their lives and their Thanks to our experience in
                  the blockchain industry and social and sustainable
                  development, we allow women to achieve economic and financial
                  independence. Our innovative solutions leverage blockchain
                  technology to empower women.
                </p>
              </div>
            </div>
          </div>

          {/* use cases */}
          <div className="z-10 flex flex-col self-center justify-center p-8 mt-6 lg:mt-28 mb-36">
            {/* heading */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-4xl font-extrabold text-center text-white lg:text-6xl">
                {/* Blockchain in Æquatore */}
                Blockchain in Agriculture
              </p>
              <p className="pb-4 text-center text-white text-md lg:text-lg">
                Use Cases
              </p>
              <div className="grid items-center justify-center grid-cols-2 grid-rows-5 space-y-10 lg:space-x-8 lg:grid-cols-5 lg:grid-rows-2">
                <div className="flex flex-col items-center justify-center mt-10 ml-4 space-y-0">
                  <img src={ucone} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Transparent Transactions
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={uctwo} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Decentralized Microfinancing
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucthree} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Immutable Record-Keeping
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucfour} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Secure Digital Identities
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucfive} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Traceability of Funds
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucsix} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Smart Loan Management
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucseven} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Cross-Border Transactions
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={uceight} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">Empowering Women</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucnine} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">Peer-to-Peer Lending</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-0">
                  <img src={ucten} alt="upc" className="w-16 h-16" />
                  <p className="text-center text-white">
                    Supply Chain Financing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* join us */}
        <div className="z-10 flex flex-col items-center justify-center w-full px-16 py-12 pb-32 mt-16 space-y-16 bg-white/90">
          <div className="flex flex-col items-center space-y-8 lg:space-y-0 lg:flex-row lg:space-x-28">
            <p className="font-extrabold text-black lg:text-[100px] text-[50px] text-center">
              Join Us.
            </p>
            <p className="text-center text-black font-md lg:w-[700px] w-[300px]">
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
        {/* bottom bar */}
        <div className="fixed bottom-0 left-0 z-10 w-full py-3 lg:px-10 custom-bottom-bar">
          <div className="flex flex-row items-center justify-between w-full px-3 lg:px-0">
            <div className="flex flex-col space-y-0">
              <p className="hidden font-bold text-white lg:flex text-md lg:text-lg">
                Empowering Dreams, Transforming Lives
              </p>
              <p className="font-bold text-white lg:hidden text-md lg:text-lg">
                Empowering Dreams<br></br> Transforming Lives
              </p>
              <p className="hidden text-xs text-white lg:flex lg:text-md">
                Join our blockchain-powered initiative to empower women and
                foster sustainable development in developing countries.
              </p>
              <p className="w-[250px] text-xs text-white lg:hidden lg:text-md">
                Join our blockchain-powered initiative to empower women and
                foster sustainable development in developing countries.
              </p>
            </div>
            <button className="px-6 py-2 text-sm font-bold text-black bg-white rounded-full lg:px-12 lg:text-lg">
              Join Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
