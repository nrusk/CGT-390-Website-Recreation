import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import styles from "../styles/profiledetail.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const ProfileDetailPage = () => {
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
            <h1>{profile.name}</h1>
            <div className={styles["flex-container"]}>
                <p>{profile.title}</p>
                <p>{profile.bio}</p>
                <img src={profile.image_url} alt={profile.name} />
                {isLogin && <Link to="edit" className={styles['button']}>Edit Title</Link>}
            </div>
        </Wrapper>
    );
};

export default ProfileDetailPage;