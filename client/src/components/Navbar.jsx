import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import UserButton from "./user/UserButton";
import SearchBar from "./inputs/SearchBar";

const Navbar = ({ user }) => {
  return (
    <header className="navbar">
      <Link to="/home" className="home_link">
        <VscHome />
      </Link>
      <SearchBar />
      {user ? (
        <UserButton user={user} />
      ) : (
        <Link to="/login" className="login_link">
          {"Log in"}
        </Link>
      )}
    </header>
  );
};

export default Navbar;
