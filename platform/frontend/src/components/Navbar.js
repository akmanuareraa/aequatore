import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [feedManagementDropdown, setFeedManagementDropdown] = useState(false);
  const [inventoryDropdown, setInventoryDropdown] = useState(false);
  const [reportsDropdown, setReportsDropdown] = useState(false);

  useEffect(() => {
    console.log(location.pathname);
  },[])

  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" ? (
        <aside
          id="sidebar-multi-level-sidebar"
          // class="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
          class="w-[420px] h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full px-6 py-4 overflow-y-auto bg-gray-50 bg-gGray">
            {/* logo container */}
            <div className="flex flex-row items-center justify-center py-3 space-x-2">
              <img src={symbol} className="w-10 h-10" alt="aequatore logo" />
              <img src={name} className="h-10 pt-1 w-44" alt="aequatore logo" />
            </div>
            <div className="mt-2 mb-0 divider before:bg-white/10 after:bg-white/10"></div>

            {/* main menu title */}
            <div className="px-4 pt-6 pb-8">
              <p className="tracking-[13px] text-white/40 text-sm">MAIN MENU</p>
            </div>

            {/* main menu options */}
            <ul class="space-y-2 font-medium">
              {/* my farm */}
              <li>
                <div
                  class={
                    location.pathname === "/dashboard/my-farm"
                      ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                      : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                  }
                  onClick={() => navigate("/dashboard/my-farm")}
                >
                  <img
                    src={
                      location.pathname === "/dashboard/my-farm" ? farmB : farmW
                    }
                    className="w-5 h-5"
                    alt="farm icon"
                  />
                  <span class="ml-3">My Farm</span>
                </div>
              </li>

              {/* animals */}
              <li>
                <div
                  class={
                    location.pathname === "/dashboard/animals"
                      ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                      : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                  }
                  onClick={() => navigate("/dashboard/animals")}
                >
                  <img
                    src={
                      location.pathname === "/dashboard/animals"
                        ? animalsB
                        : animalsW
                    }
                    className="w-5 h-5"
                    alt="farm icon"
                  />
                  <span class="ml-3">Animals</span>
                </div>
              </li>

              {/* livestock goals */}
              <li>
                <div
                  class={
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
                  <span class="ml-3">Livestock Goals</span>
                </div>
              </li>

              {/* my schedule */}
              <li>
                <div
                  class={
                    location.pathname === "/dashboard/my-schedule"
                      ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                      : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                  }
                  onClick={() => navigate("/dashboard/my-schedule")}
                >
                  <img
                    src={
                      location.pathname === "/dashboard/my-schedule"
                        ? scheduleB
                        : scheduleW
                    }
                    className="w-5 h-5"
                    alt="farm icon"
                  />
                  <span class="ml-3">My Schedule</span>
                </div>
              </li>

              {/* pasture management */}
              <li>
                <div
                  class={
                    location.pathname === "/dashboard/pasture-management"
                      ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen"
                      : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                  }
                  onClick={() => navigate("/dashboard/pasture-management")}
                >
                  <img
                    src={
                      location.pathname === "/dashboard/pasture-management"
                        ? pastureManagementB
                        : pastureManagementW
                    }
                    className="w-5 h-5"
                    alt="farm icon"
                  />
                  <span class="ml-3">Pasture Management</span>
                </div>
              </li>

              {/* inventory */}
              <li>
                <div
                  class={
                    inventoryDropdown
                      ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer group "
                      : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                  }
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                  onClick={() => setInventoryDropdown(!inventoryDropdown)}
                >
                  <img
                    src={inventoryDropdown ? inventoryW : inventoryW}
                    className="w-5 h-5"
                    alt="feed management icon"
                  />
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">
                    Inventory
                  </span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
                <ul
                  id="dropdown-example"
                  className={`${
                    inventoryDropdown ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <div
                      class={
                        location.pathname === "/dashboard/inventory/equipments"
                          ? "flex items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer group bg-gGreen ml-8"
                          : "flex items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group ml-8"
                      }
                      onClick={() =>
                        navigate("/dashboard/inventory/equipments")
                      }
                    >
                      <img
                        src={
                          location.pathname ===
                          "/dashboard/inventory/equipments"
                            ? lineB
                            : lineW
                        }
                        className="w-3 h-5 mr-4"
                      ></img>
                      <p>Equipments</p>
                    </div>
                  </li>
                </ul>
              </li>

              {/* reports */}
              <li>
                <div
                  class={
                    reportsDropdown
                      ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg hover:cursor-pointer group text-white"
                      : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                  }
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                  onClick={() => setReportsDropdown(!reportsDropdown)}
                >
                  <img
                    src={reportsDropdown ? reportsW : reportsW}
                    className="w-5 h-5"
                    alt="feed management icon"
                  />
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">
                    Reports
                  </span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
                <ul
                  id="dropdown-example"
                  className={`${
                    reportsDropdown ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <div
                      class={
                        location.pathname ===
                        "/dashboard/reports/breeder-report"
                          ? "flex items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen ml-8"
                          : "flex items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group ml-8"
                      }
                      onClick={() =>
                        navigate("/dashboard/reports/breeder-report")
                      }
                    >
                      <img
                        src={
                          location.pathname ===
                          "/dashboard/reports/breeder-report"
                            ? lineB
                            : lineW
                        }
                        className="w-3 h-5 mr-4"
                      ></img>
                      <p>Breeder Report</p>
                    </div>
                  </li>
                  <li>
                    <div
                      class={
                        location.pathname === "/dashboard/reports/health-report"
                          ? "flex items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen ml-8"
                          : "flex items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group ml-8"
                      }
                      onClick={() =>
                        navigate("/dashboard/reports/health-report")
                      }
                    >
                      <img
                        src={
                          location.pathname ===
                          "/dashboard/reports/health-report"
                            ? lineB
                            : lineW
                        }
                        className="w-3 h-5 mr-4"
                      ></img>
                      <p>Health Report</p>
                    </div>
                  </li>
                </ul>
              </li>

              {/* feed management */}
              <li>
                <div
                  class={
                    feedManagementDropdown
                      ? "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg hover:cursor-pointer group text-white"
                      : "flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group"
                  }
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                  onClick={() =>
                    setFeedManagementDropdown(!feedManagementDropdown)
                  }
                >
                  <img
                    src={
                      feedManagementDropdown ? feedManagementW : feedManagementW
                    }
                    className="w-5 h-5"
                    alt="feed management icon"
                  />
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">
                    Feed Management
                  </span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
                <ul
                  id="dropdown-example"
                  className={`${
                    feedManagementDropdown ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <div
                      class={
                        location.pathname ===
                        "/dashboard/feed-management/ration-library"
                          ? "flex items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen ml-8"
                          : "flex items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group ml-8"
                      }
                      onClick={() =>
                        navigate("/dashboard/feed-management/ration-library")
                      }
                    >
                      <img
                        src={
                          location.pathname ===
                          "/dashboard/feed-management/ration-library"
                            ? lineB
                            : lineW
                        }
                        className="w-3 h-5 mr-4"
                      ></img>
                      <p>Ration Library</p>
                    </div>
                  </li>
                  <li>
                    <div
                      class={
                        location.pathname ===
                        "/dashboard/feed-management/ingredient-inventory"
                          ? "flex items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group bg-gGreen ml-8"
                          : "flex items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group ml-8"
                      }
                      onClick={() =>
                        navigate(
                          "/dashboard/feed-management/ingredient-inventory"
                        )
                      }
                    >
                      <img
                        src={
                          location.pathname ===
                          "/dashboard/feed-management/ingredient-inventory"
                            ? lineB
                            : lineW
                        }
                        className="w-3 h-5 mr-4"
                      ></img>
                      <p>Ingredient Inventory</p>
                    </div>
                  </li>
                  <li>
                    <div
                      class={
                        location.pathname ===
                        "/dashboard/feed-management/ingredient-library"
                          ? "flex items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer group bg-gGreen ml-8"
                          : "flex items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group ml-8"
                      }
                      onClick={() =>
                        navigate(
                          "/dashboard/feed-management/ingredient-library"
                        )
                      }
                    >
                      <img
                        src={
                          location.pathname ===
                          "/dashboard/feed-management/ingredient-library"
                            ? lineB
                            : lineW
                        }
                        className="w-3 h-5 mr-4"
                      ></img>
                      <p>Ingredient Library</p>
                    </div>
                  </li>
                  <li>
                    <div
                      class={
                        location.pathname ===
                        "/dashboard/feed-management/suppliers"
                          ? "flex items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer group bg-gGreen ml-8"
                          : "flex items-center px-4 py-3 text-gray-900 rounded-lg text-white hover:cursor-pointer hover:bg-white/10 group ml-8"
                      }
                      onClick={() =>
                        navigate("/dashboard/feed-management/suppliers")
                      }
                    >
                      <img
                        src={
                          location.pathname ===
                          "/dashboard/feed-management/suppliers"
                            ? lineB
                            : lineW
                        }
                        className="w-3 h-5 mr-4"
                      ></img>
                      <p>Suppliers</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            {/* support title */}
            <div className="px-4 pt-24 pb-5">
              <p className="tracking-[13px] text-white/40 text-sm">SUPPORT</p>
            </div>

            {/* support options */}
            <ul class="space-y-2 font-medium">
              {/* faqs */}
              <li>
                <div
                  class={
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
                  <span class="ml-3">FAQs</span>
                </div>
              </li>

              {/* enquiry */}
              <li>
                <div
                  class={
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
                  <span class="ml-3">Enquiry</span>
                </div>
              </li>

              {/* contact us */}
              <li>
                <div
                  class={
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
                  <span class="ml-3">Contact Us</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      ) : null}
    </>
  );
}

export default Navbar;
