import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ecommerceBackgrounds = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1529720317453-c8da503f2051?auto=format&fit=crop&w=1800&q=80",
];

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const isAdminLoggedIn = Boolean(localStorage.getItem("admin-auth-token"));
  const [bgIndex, setBgIndex] = useState(Math.floor(Math.random() * ecommerceBackgrounds.length));
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % ecommerceBackgrounds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let responseData;
    try {
      await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/formData",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("admin-auth-token", responseData.token);
        onLoginSuccess?.();
        navigate("/addproduct", { replace: true });
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      alert("Unable to login right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdminLoggedIn) {
    return <Navigate to="/addproduct" replace />;
  }

  return (
    <section className="max_padd_container relative flexCenter flex-col min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${ecommerceBackgrounds[bgIndex]})` }}
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 max-w-[555px] w-full bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3">Admin Login</h3>
        <div className="flex flex-col gap-4 mt-7">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Admin Email"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Admin Password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
        </div>
        <button onClick={login} disabled={isLoading} className="btn_dark_rounded my-5 w-full !rounded-md">
          {isLoading ? "Please wait..." : "Continue"}
        </button>
        <p className="text-black font-bold">
          Create an account?{" "}
          <Link to="/register" className="text-secondary underline cursor-pointer">
            Click Here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
