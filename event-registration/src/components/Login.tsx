import axios from "axios";
import "../assets/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const Login = () => {
  let history = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
      password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async () => {
      const url = `${import.meta.env.VITE_API_POST_USER_SIGNIN_URL}`;
      const response = await axios.post(
        url,
        {
          email: formik.values.email,
          password: formik.values.password,
        },
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        history("admin");
      } else {
        message.error("Error while Login " + response.data.error, 7);
      }
    },
  });

  return (
    <div className="login-page">
      <h1 className="text-center">Login</h1>
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            className="form-input"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

          <button
            type="submit"
            name="submit"
            id="submit"
            className="form-input"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
