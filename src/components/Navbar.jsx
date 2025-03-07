import styles from '../styles/navbar.module.css';
import { Link, useNavigate } from "react-router-dom";
import ModeContext from "../contexts/ModeContext";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight, faGear, faSignOut, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const { mode, handleModeChange } = useContext(ModeContext);
    const { isLogin, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick= () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className={`${styles["navbar"]}`}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {/* <li>
                    <Link to="/about">About</Link>
                </li> */}
                {
                isLogin &&
                <li>
                    <Link to="/add-profile">Add Your Favorite <FontAwesomeIcon icon={faPlus} /></Link>
                </li>
                }
            </ul>
                {
                isLogin ?
                <button onClick={handleClick} ><FontAwesomeIcon icon={faSignOut} /></button>
                :
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
                }
            <button onClick={handleModeChange}>
                {mode === "light" ? "Light" : "Dark"} <FontAwesomeIcon icon={faGear} />
            </button>
        </nav>
    );
};

export default Navbar;