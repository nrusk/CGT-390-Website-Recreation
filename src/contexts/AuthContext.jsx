import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    //variable to store the isLogin state
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true" ? true : false);

    //function to update the isLogin state
    const login = () => {
        setIsLogin(true);
        localStorage.setItem("isLogin", "true");
    };
    const logout = () => {
        fetch("https://web.ics.purdue.edu/~nrusk/profile-app/logout.php")
        .then((response) => response.json())
        .then(data => {
            if (data.message) {
                setIsLogin(false);
                localStorage.setItem("isLogin", "false");
            } else {
                console.log(data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    return (
        <AuthContext.Provider value={{ isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};
export default AuthContext;

// const [mode, setMode] = useState('light');
//     const toggleMode = () => {
//         setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
//     }