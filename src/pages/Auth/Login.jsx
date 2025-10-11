import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
    setEmail("");
    setPassword("");
  };

  return (
    <div className=" bg-[#FAF8F2] w-full h-screen flex flex-col justify-center items-center">
      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="w-[656px] h-[692px] bg-white border border-[#C1C1C1] shadow-lg rounded-xl p-16  flex flex-col gap-6"
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          <span className="text-black text-3xl font-bold font-inter">Shop</span>
          <span className="text-[#FFBA07] text-3xl font-bold font-inter">
            Nest
          </span>
        </div>
        <h2 className="text-center text-zinc-800 text-3xl font-normal font-roboto mb-4">
          Secure Dashboard Login
        </h2>

        {/* Email */}
        <div>
          <label className="block text-neutral-500 text-xl font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="admin@shopnest.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 border border-neutral-500 rounded-[10px] text-gray-700 focus:outline-none focus:border-[#FFBA07]"
          />
        </div>

        {/* Password */}
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

        {/* Remember Me */}
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

        {/* Submit */}
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
