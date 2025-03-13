import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import styles from "../styles/titleDetail.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const TitleDetailPage = () => {
    const [profile, setProfile] = useState({});
    const { id } = useParams();
    const { isLogin } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~nrusk/profile-app/fetch-data-with-id.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
            });
    }, [id]);

    return (
        <Wrapper>
            <h1 className={styles["h1Detail"]}>{profile.name}</h1>
            <div className={styles["flex-container"]}>
                <img src={profile.image_url} alt={profile.name} />
                <div className={styles["flex-container2"]}>
                <p className={styles["type"]}>Type: <span>{profile.title}</span></p>
                <p>Genre: <span>{profile.bio}</span></p>
                </div>
                {isLogin && <Link to="edit" className={styles['button']}>Edit Title</Link>}
            
            </div>
        </Wrapper>
    );
};

export default TitleDetailPage;