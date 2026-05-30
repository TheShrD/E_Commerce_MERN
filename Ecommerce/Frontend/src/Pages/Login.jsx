import { useEffect, useState } from "react"

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

const Login = () => {
  const [state, setState] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(Math.floor(Math.random() * ecommerceBackgrounds.length));
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % ecommerceBackgrounds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("Login Function Executed", formData);
    let responseData;
    try {
      await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          Accept: 'application/formData',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json()).then((data) => responseData = data)

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }
      else {
        alert(responseData.errors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const signup = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("SignUp Function Executed", formData);
    let responseData;
    try {
      await fetch('http://localhost:4000/signup', {
        method: "POST",
        headers: {
          Accept: 'application/formData',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json()).then((data) => responseData = data)

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }
      else {
        alert(responseData.errors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="max_padd_container relative flexCenter flex-col pt-32 min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${ecommerceBackgrounds[bgIndex]})` }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign Up" ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" /> : ""}
          <input name = "email" type="email" value={formData.email} onChange={changeHandler} placeholder="Your Email" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"></input>
          <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Your Password" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"></input>
        </div>
        <button disabled={isLoading} onClick={() => { state === "Login" ? login() : signup() }} className="btn_dark_rounded my-5 w-full !rounded-md">{isLoading ? "Please wait..." : "Continue"}</button>
        {state === "Sign Up" ?
          <p className="text-black font-bold">Already have an Account?<span onClick={() => { setState("Login") }} className="text-secondary underline cursor-pointer">Login</span></p>
          : <p className="text-black font-bold">Create an Account?<span onClick={() => { setState("Sign Up") }} className="text-secondary underline cursor-pointer">Click Here</span></p>}
        <div className="flexCenter mt-6 gap-3 ">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, i agree to the terms of use & privacy policy. </p>
        </div>
      </div>
    </section>
  )
}

export default Login