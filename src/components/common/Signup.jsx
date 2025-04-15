import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../assets/CSS/SignUp.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    const regdata = {
      name: data.name,
      contact: data.contact,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await toast.promise(
        axios.post("http://localhost:8000/user", regdata, {
          headers: { "Content-Type": "application/json" },
        }),
        {
          pending: "Registering your account...",
          success: "Registration successful! 🎉",
          error: {
            render({ data }) {
              return data.response?.data?.message || "Registration failed!";
            },
          },
        }
      );

      if (response.status === 200) {
        toast.success("You can now login!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const Validators = {
    nameValidator: {
      required: { value: true, message: "Full Name is required" },
      minLength: { value: 5, message: "Name must consist of at least 5 characters" },
    },
    contactValidator: {
      required: { value: true, message: "Contact is required" },
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Enter a valid 10-digit number",
      },
    },
    emailValidator: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "Invalid email format",
      },
    },
    passwordValidator: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 6, message: "Password must be at least 6 characters" },
    },
    confirmPasswordValidator: {
      required: { value: true, message: "Confirm Password is required" },
      validate: (value, { password }) =>
        value === password || "Passwords do not match",
    },
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="title">SignUp</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Full Name:</label>
          <div className="input-wrapper">
            <input
              id="name"
              type="text"
              placeholder="Enter Full Name"
              autoComplete="name"
              className={errors.name && "input-error"}
              {...register("name", Validators.nameValidator)}
            />
            <span className="register-error-message">{errors.name?.message}</span>
          </div>

          <label htmlFor="contact">Contact No.:</label>
          <div className="input-wrapper">
            <input
              id="contact"
              type="text"
              placeholder="Enter contact no."
              autoComplete="tel"
              className={errors.contact && "input-error"}
              {...register("contact", Validators.contactValidator)}
            />
            <span className="register-error-message">{errors.contact?.message}</span>
          </div>

          <label htmlFor="email">Email:</label>
          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              placeholder="Enter Email address"
              autoComplete="email"
              className={errors.email && "input-error"}
              {...register("email", Validators.emailValidator)}
            />
            <span className="register-error-message">{errors.email?.message}</span>
          </div>

          <label htmlFor="password">Password:</label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className={errors.password && "input-error"}
              {...register("password", Validators.passwordValidator)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            <span className="register-error-message">{errors.password?.message}</span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="input-wrapper">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={errors.confirmPassword && "input-error"}
              {...register("confirmPassword", Validators.confirmPasswordValidator)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            <span className="register-error-message">{errors.confirmPassword?.message}</span>
          </div>

          <div className="actions">
            <input type="submit" value="Register" className="btn-register" />
          </div>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
