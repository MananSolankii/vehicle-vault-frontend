import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../assets/CSS/login.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      localStorage.clear();
      const response = await toast.promise(
        axios.post("http://localhost:8000/user/login", data, {
          headers: { "Content-Type": "application/json" },
        }),
        {
          pending: "Logging in...",
          success: "Login successful! 🎉",
          error: "Login failed! Invalid credentials.",
        }
      );

      if (response.status === 200) {
        const token = response.data.access_token;
        const role = response.data.role; // <-- Direct role

        localStorage.setItem("token", token);
        localStorage.setItem("role", role); // <-- Save role

        toast.success(`Welcome ${role}!`);
        if (role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong during login!");
    }
  };

  const Validators = {
    emailValidator: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "Invalid email format",
      },
    },
    passwordValidator: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Enter Email address"
              className={errors.email && "input-error"}
              {...register("email", Validators.emailValidator)}
            />
            <span className="login-error-message">{errors.email?.message}</span>
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
            <span className="login-error-message">
              {errors.password?.message}
            </span>
          </div>

          <div className="actions">
            <input type="submit" value="Login" className="btn-login" />
          </div>
        </form>
        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p className="register-link">
          Don't have an account? <Link to="/signup">Create</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
