import styles from '../styles/navbar.module.css';
import { Link } from "react-router-dom";

const Navbar = ({ mode, updateMode }) => {
    return (
        <nav className={`${styles["navbar"]}`}>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add-profile">Add a Title</Link>
                </li>
            </ul>
            {/* <button onClick={updateMode}>
                {mode === "light" ? "Light Mode" : "Dark Mode"}
            </button> */}
        </nav>
    );
};

export default Navbar;