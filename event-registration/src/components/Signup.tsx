import "../assets/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../assets/Signup.css";
import { useAppDispatch } from "../redux/state/store";
import { signUpUser } from "../redux/state/action-creators";
import { message } from "antd";
const Signup = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      isOrganizer: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
      password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
      firstName: Yup.string()
        .required("First Name is a required field")
        .max(20, "First Name must be at least 8 characters"),
      lastName: Yup.string()
        .required("Last Name is a required field")
        .max(20, "Last Name must be at least 20 characters"),
      phone: Yup.string()
        .required("Phone is a required field")
        .max(10, "Last Name must be at least 10 characters")
        .max(10),
    }),
    onSubmit: async () => {
      const formData = {
        email: formik.values.email,
        password: formik.values.password,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phone: formik.values.phone,
        isOrganizer: formik.values.isOrganizer,
      };
      const response = await dispatch(signUpUser(formData));
      console.log(response);
      const err = response.payload.error;
      if (err) {
        message.error("Unable to Sign up : " + err, 7);
      } else {
        message.success("Sign up successfull", 7);
        formik.resetForm();
      }
    },
  });

  return (
    <div className="signup-page">
      <h1 className="text-center ">SIGN UP</h1>
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
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="form-input"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="form-input"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            className="form-input"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="form-group radio-grp">
          <label>Is Organizer:</label>
          <div>
            <input
              type="radio"
              id="isOrganizerYes"
              value="true"
              checked={formik.values.isOrganizer === true}
              onChange={() => formik.setFieldValue("isOrganizer", true)}
            />
            <label htmlFor="isOrganizerYes">Yes</label>

            <input
              type="radio"
              id="isOrganizerNo"
              value="false"
              checked={formik.values.isOrganizer === false}
              onChange={() => formik.setFieldValue("isOrganizer", false)}
            />
            <label htmlFor="isOrganizerNo">No</label>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" id="submit" className="form-input">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
