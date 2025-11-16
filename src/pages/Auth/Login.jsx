import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/features/authSlice";


const demoUsers = [
  {
    email: "superadmin@demo.com",
    password: "SuperAdmin123!",
    role: "superAdmin",
    name: "Demo Super Admin",
    id: 1,
  },
  {
    email: "admin@demo.com",
    password: "Admin123!",
    role: "admin",
    name: "Demo Admin",
    id: 2,
  },
];

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = demoUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Invalid login");
      return;
    }

    // dispatch to Redux store
    dispatch(setCredentials({ access: "demo", refresh: "demo", user: found }));

    // optionally handle "remember me" here
    if (remember) {
      localStorage.setItem("user", JSON.stringify(found));
    }

    // reset fields
    setEmail("");
    setPassword("");

    // redirect
    window.location.href = "/";
  };

  return (
    <div className=" bg-[#FAF8F2] w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[656px] h-[692px] bg-white border border-[#C1C1C1] shadow-lg rounded-xl p-16  flex flex-col gap-6"
      >
        <div className="flex items-center justify-center">
          <span className="text-black text-3xl font-bold font-inter">Shop</span>
          <span className="text-[#FFBA07] text-3xl font-bold font-inter">
            Nest
          </span>
        </div>
        <h2 className="text-center text-zinc-800 text-3xl font-normal font-roboto mb-4">
          Secure Dashboard Login
        </h2>

        <div>
          <label className="block text-neutral-500 text-xl font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="admin@mtech.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 border border-neutral-500 rounded-[10px] text-gray-700 focus:outline-none focus:border-[#FFBA07]"
          />
        </div>

        <div>
          <label className="block text-neutral-500 text-xl font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 px-4 border border-neutral-500 rounded-[10px] text-gray-700 focus:outline-none focus:border-[#FFBA07]"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="w-5 h-5 border border-neutral-500 rounded-[3px]"
          />
          <label className="text-neutral-500 text-lg font-normal">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-[#FFBA07] text-white text-2xl font-bold rounded-[10px] hover:bg-yellow-600 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};
