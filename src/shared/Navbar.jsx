import { NavLink, useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.png";
import logoutIcon from "../assets/images/logout.svg";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  const linkClasses =
    "text-xl font-semibold font-inter transition-colors duration-200";
  return (
    <div className="bg-white pt-10 pb-5 px-28 flex flex-col gap-9">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#363636]">
          Shop<span className="text-[#FFBA07]">Nest</span>
        </h1>
        <div className="flex items-center gap-4">
          <img src={profile} alt="" />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-[#363636]">
              Alex Johnson
            </h1>
            <h3 className="text-base font-normal text-[#363636]">
              Store Admin
            </h3>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-[#FFBA07] border-b-2 border-[#FFBA07] border-b-2 border-[#FFBA07]" : "text-[#363636]"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-[#FFBA07] border-b-2 border-[#FFBA07]" : "text-[#363636]"}`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-[#FFBA07] border-b-2 border-[#FFBA07]" : "text-[#363636]"}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/promotions"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-[#FFBA07] border-b-2 border-[#FFBA07]" : "text-[#363636]"}`
            }
          >
            Promotions
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-[#FFBA07] border-b-2 border-[#FFBA07]" : "text-[#363636]"}`
            }
          >
            Settings
          </NavLink>
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
