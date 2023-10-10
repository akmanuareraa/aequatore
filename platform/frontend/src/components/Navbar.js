import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "./../AppContext";

import symbol from "../assets/svg/logo-symbol-w-c.svg";
import name from "../assets/svg/logo-name-w-c.svg";
import farmW from "../assets/svg/farm-w.svg";
import farmB from "../assets/svg/farm-b.svg";
import animalsW from "../assets/svg/animals-w.svg";
import animalsB from "../assets/svg/animals-b.svg";
import goalsW from "../assets/svg/goals-w.svg";
import goalsB from "../assets/svg/goals-b.svg";
import scheduleW from "../assets/svg/schedule-w.svg";
import scheduleB from "../assets/svg/schedule-b.svg";
import inventoryW from "../assets/svg/inventory-w.svg";
import inventoryB from "../assets/svg/inventory-b.svg";
import reportsW from "../assets/svg/reports-w.svg";
import reportsB from "../assets/svg/reports-b.svg";
import pastureManagementW from "../assets/svg/pasture-management-w.svg";
import pastureManagementB from "../assets/svg/pasture-management-b.svg";
import feedManagementW from "../assets/svg/feed-management-w.svg";
import feedManagementB from "../assets/svg/feed-management-b.svg";
import faqW from "../assets/svg/faqs-w.svg";
import faqB from "../assets/svg/faqs-b.svg";
import enquiriesW from "../assets/svg/enquiries-w.svg";
import enquiriesB from "../assets/svg/enquiries-b.svg";
import contactUsW from "../assets/svg/contact-us-w.svg";
import contactUsB from "../assets/svg/contact-us-b.svg";
import lineW from "../assets/svg/line-w.svg";
import lineB from "../assets/svg/line-b.svg";

function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { appData, setAppData } = useContext(AppContext);
  const [feedManagementDropdown, setFeedManagementDropdown] = useState(false);
  const [inventoryDropdown, setInventoryDropdown] = useState(false);
  const [reportsDropdown, setReportsDropdown] = useState(false);

  useEffect(() => {
    // console.log(location.pathname);
  }, []);

  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" ? (
        <aside
          id="sidebar-multi-level-sidebar"
          // className="fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full w-72 sm:translate-x-0"
          className="w-[420px] h-full transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-6 py-4 overflow-y-auto bg-gray-50 bg-gGray">
            {/* logo container */}
            <div className="flex flex-row items-center justify-center py-3 space-x-2">
              <img src={symbol} className="w-10 h-10" alt="aequatore logo" />
              <img src={name} className="h-10 pt-1 w-44" alt="aequatore logo" />
            </div>
            <div className="mt-2 mb-0 divider before:bg-white/10 after:bg-white/10"></div>

            <div className="">
              {/* main menu title */}
              <div className="px-4 pt-6 pb-8">
                <p className="tracking-[13px] text-white/40 text-sm">
                  MAIN MENU
                </p>
              </div>

              {/* main menu options */}
              <ul className="space-y-2 font-medium">
                {appData.userProfile ? (
                  appData.userProfile.role === "banker" ? (
                    <li>
                      {/* banker dashboard */}
                      <div
                        className={
                          location.pathname === "/dashboard/banker" ||
                          location.pathname === "/dashboard/livestockOwner/view"
                            ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                            : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                        }
                        onClick={() => navigate("/dashboard/banker")}
                      >
                        <img
                          src={
                            location.pathname === "/dashboard/banker" ||
                            location.pathname ===
                              "/dashboard/livestockOwner/view"
                              ? farmB
                              : farmW
                          }
                          className="w-5 h-5"
                          alt="farm icon"
                        />
                        <span className="ml-3">Dashboard</span>
                      </div>
                    </li>
                  ) : (
                    <>
                      {/* my farm */}
                      <li>
                        <div
                          className={
                            location.pathname === "/dashboard/my-farm"
                              ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                              : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                          }
                          onClick={() => navigate("/dashboard/my-farm")}
                        >
                          <img
                            src={
                              location.pathname === "/dashboard/my-farm"
                                ? farmB
                                : farmW
                            }
                            className="w-5 h-5"
                            alt="farm icon"
                          />
                          <span className="ml-3">My Farm</span>
                        </div>
                      </li>

                      {/* animals */}
                      <li>
                        <div
                          className={
                            location.pathname === "/dashboard/animals" ||
                            location.pathname ===
                              "/dashboard/animals/register" ||
                            location.pathname === "/dashboard/animals/view"
                              ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                              : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                          }
                          onClick={() => navigate("/dashboard/animals")}
                        >
                          <img
                            src={
                              location.pathname === "/dashboard/animals" ||
                              location.pathname ===
                                "/dashboard/animals/register" ||
                              location.pathname === "/dashboard/animals/view"
                                ? animalsB
                                : animalsW
                            }
                            className="w-5 h-5"
                            alt="farm icon"
                          />
                          <span className="ml-3">Animals</span>
                        </div>
                      </li>

                      {/* livestock goals */}
                      {/* <li>
                        <div
                          className={
                            location.pathname === "/dashboard/livestock-goals"
                              ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer group bg-gGreen"
                              : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                          }
                          onClick={() => navigate("/dashboard/livestock-goals")}
                        >
                          <img
                            src={
                              location.pathname === "/dashboard/livestock-goals"
                                ? goalsB
                                : goalsW
                            }
                            className="w-5 h-5"
                            alt="farm icon"
                          />
                          <span className="ml-3">Livestock Goals</span>
                        </div>
                      </li> */}

                      {/* livestock value */}
                      <li>
                        <div
                          className={
                            location.pathname === "/dashboard/livestock-value"
                              ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer group bg-gGreen"
                              : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                          }
                          onClick={() => navigate("/dashboard/livestock-value")}
                        >
                          <img
                            src={
                              location.pathname === "/dashboard/livestock-value"
                                ? goalsB
                                : goalsW
                            }
                            className="w-5 h-5"
                            alt="farm icon"
                          />
                          <span className="ml-3">Livestock Value</span>
                        </div>
                      </li>
                    </>
                  )
                ) : null}
              </ul>
              {/* support title */}
              <div className="px-4 pb-5 pt-[400px]">
                <p className="tracking-[13px] text-white/40 text-sm">SUPPORT</p>
              </div>

              {/* support options */}
              <ul className="space-y-2 font-medium">
                {/* faqs */}
                <li>
                  <div
                    className={
                      location.pathname === "/support/faq"
                        ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                        : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                    }
                    onClick={() => navigate("/support/faq")}
                  >
                    <img
                      src={location.pathname === "/support/faq" ? faqB : faqW}
                      className="w-5 h-5"
                      alt="farm icon"
                    />
                    <span className="ml-3">FAQs</span>
                  </div>
                </li>

                {/* enquiry */}
                <li>
                  <div
                    className={
                      location.pathname === "/support/enquiry"
                        ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                        : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                    }
                    onClick={() => navigate("/support/enquiry")}
                  >
                    <img
                      src={
                        location.pathname === "/support/enquiry"
                          ? enquiriesB
                          : enquiriesW
                      }
                      className="w-5 h-5"
                      alt="farm icon"
                    />
                    <span className="ml-3">Enquiry</span>
                  </div>
                </li>

                {/* contact us */}
                <li>
                  <div
                    className={
                      location.pathname === "/support/contact"
                        ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                        : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                    }
                    onClick={() => navigate("/support/contact")}
                  >
                    <img
                      src={
                        location.pathname === "/support/contact"
                          ? contactUsB
                          : contactUsW
                      }
                      className="w-5 h-5"
                      alt="farm icon"
                    />
                    <span className="ml-3">Contact Us</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}

export default Navbar;
