import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/authSlice";

function useLogin() {
  const dispatch = useDispatch();

  const loginHandler = async (email, password) => {
    try {
      dispatch(loginStart());

      // Example API (tumi tomer hisab e update korba)
      const res = await axios.post("https://your-api/login", {
        email,
        password,
      });

      // Expected backend response:
      // {
      //   user: { id, name, email, role: "superAdmin" },
      //   token: "xxxxx"
      // }

      dispatch(loginSuccess(res.data));

    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || "Login failed"));
    }
  };

  return { loginHandler };
}

export default useLogin;
