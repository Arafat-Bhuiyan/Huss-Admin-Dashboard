import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.png";
import logoutIcon from "../assets/images/logout.svg";
import logo from "../assets/images/mtech-logo1.png";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAdminRoleOpen, setIsAdminRoleOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  const linkClasses =
    "text-xl font-semibold font-inter transition-colors duration-200";
  return (
    <div className="bg-white pt-10 pb-5 w-10/12 mx-auto flex flex-col gap-9">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Mtech logo" className="h-9" />
        </Link>
        <Link
          to={"/profile"}
          className="flex items-center gap-4 cursor-pointer"
        >
          <img src={profile} alt="" />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-[#363636]">
              Alex Johnson
            </h1>
            <h3 className="text-base font-normal text-[#363636]">
              Store Admin
            </h3>
          </div>
        </Link>
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            User
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            Wishlist
          </NavLink>

          <NavLink
            to="/promotions"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            Promotions
          </NavLink>

          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            Tracking
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                  : "text-[#363636]"
              }`
            }
          >
            Settings
          </NavLink>

          <div className="relative">
            <button
              onClick={() => setIsAdminRoleOpen((prev) => !prev)}
              className={`${linkClasses} text-[#363636] flex items-center gap-1`}
            >
              <span>Admin Role</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  isAdminRoleOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isAdminRoleOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-md outline outline-1 outline-[#BEBBBB] z-50">
                <div
                  onClick={() => {
                    // Handle Super Admin click if needed
                    setIsAdminRoleOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-neutral-700 cursor-pointer hover:bg-gray-100"
                >
                  Super Admin
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-[#DB0000] font-semibold text-lg font-inter flex gap-4 items-center"
        >
          <img src={logoutIcon} alt="Logout Icon" />
          Logout
        </button>
      </div>
    </div>
  );
};
