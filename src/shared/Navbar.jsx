import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import profile from "../assets/images/profile.png";
import logoutIcon from "../assets/images/logout.svg";
import logo from "../assets/images/1ezybuy-logo.png";
import { ChevronDown, LogOut } from "lucide-react";


export const Navbar = () => {
  const navigate = useNavigate();
  const [isAdminRoleOpen, setIsAdminRoleOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const filteredMenu = useSelector((state) => state.menu?.filteredMenu || []);
  const dispatch = useDispatch();

  // Update filteredMenu in Redux when user changes
  useEffect(() => {
    dispatch({ type: "menu/setFilteredMenu", payload: user });
  }, [user, dispatch]);

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };
  // ...existing code...

  const linkClasses =
    "text-xl font-semibold font-inter transition-colors duration-200";

  return (
    <div className="bg-white pt-10 pb-5 w-10/12 mx-auto flex flex-col gap-9">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="1ezybuy logo" className="h-9" />
        </Link>
        <Link
          to={"/profile"}
          className="flex items-center gap-4 cursor-pointer"
        >
          <img src={profile} alt="" />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-[#363636]">
              {user?.name || "User"}
            </h1>
            <h3 className="text-base font-normal text-[#363636]">
              {user?.role === "Super Admin" ? "Super Admin" : "Admin"}
            </h3>
          </div>
        </Link>
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive
                    ? "text-[#FFBA07] border-b-2 border-[#FFBA07]"
                    : "text-[#363636]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Admin Role Dropdown (only for superAdmin) */}
          {user?.role === "Super Admin" && (
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
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-sm text-neutral-700 cursor-pointer hover:bg-gray-100"
                  >
                    Admin
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="text-[#0088ff] font-semibold text-lg font-inter flex gap-4 items-center"
        >
          <LogOut color="#0088ff" size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};
