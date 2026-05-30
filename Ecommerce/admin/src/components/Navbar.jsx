import logo from "../assets/logo.svg"
import profileImg from "../assets/profile.png"

const Navbar = ({ onLogout }) => {
  const handleAdminLogout = () => {
    localStorage.removeItem("admin-auth-token");
    onLogout?.();
    window.location.replace("http://localhost:5173/");
  };

  return (
    <nav className="max_padd_container flexBetween bg-white py-2 ring-1 ring-slate-900/5 relative">
    <div> <img src={logo} /></div>
    <div className="upeercase bold-22 text-white bg-secondary px-3 rounded-md tracking-widset line-clamp-3 max-xs:bold-18 max-xs:py-2 max-xs:px-1 ">Admin Panel</div>
    <div className="flexCenter gap-3">
      <img src={profileImg} alt="" className="h-12 w-12 rounded-full" />
      <button onClick={handleAdminLogout} className="btn_secondary_rounded">
        Logout
      </button>
    </div>
    </nav>
  )
}

export default Navbar