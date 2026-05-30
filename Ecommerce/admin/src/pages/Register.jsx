import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async () => {
    let responseData;
    const payload = {
      username: formData.email.split("@")[0] || "admin",
      email: formData.email,
      password: formData.password,
    };

    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/formData",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Admin registered successfully. Please login.");
      navigate("/login", { replace: true });
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <section className="max_padd_container flexCenter flex-col min-h-screen">
      <div className="max-w-[555px] w-full bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3">Admin Register</h3>
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
        <button onClick={register} className="btn_dark_rounded my-5 w-full !rounded-md">
          Register
        </button>
        <p className="text-black font-bold">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
