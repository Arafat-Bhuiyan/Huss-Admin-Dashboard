import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/features/authSlice";
import { useLoginMutation } from "../../Redux/api/authApi";
import logo from "../../assets/images/1ezybuy-logo.png";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      console.log("response:", response)
      // dispatch to Redux store
      dispatch(setUser({ user: response.data, access: response.access_token,  }));

      // reset fields
      setEmail("");
      setPassword("");
      console.log("Login Success");
      // redirect
      navigate("/");
            console.log("Login Success 2");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className=" bg-[#FAF8F2] w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[656px] h-[692px] bg-white border border-[#C1C1C1] shadow-lg rounded-xl p-16  flex flex-col gap-6"
      >
        <div className="flex justify-center mb-2">
          <img src={logo} alt="1ezybuy logo" className="w-36 h-20" />
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
            placeholder="admin@1ezybuy.com"
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-4 border border-neutral-500 rounded-[10px] text-gray-700 focus:outline-none focus:border-[#FFBA07] pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
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
          disabled={isLoading}
          className="w-full h-12 bg-[#2196F3] text-white text-2xl font-bold rounded-[10px] hover:bg-[#0088ff] transition"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};
