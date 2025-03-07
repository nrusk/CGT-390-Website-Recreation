import { useState, useEffect, useRef, useLayoutEffect } from "react";
import style from "../styles/ProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({ isEdit = false, currentProfile = {} }) => {
    const navigate = useNavigate();
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "", image: null });
    const nameRef = useRef(null);

    useEffect(() => {
        if (isEdit) {
            setData({
                name: currentProfile.name || "",
                title: currentProfile.title || "",
                email: currentProfile.email || "",
                bio: currentProfile.bio || "",
                image: null,
            });
        }
    }, [currentProfile, isEdit]);

    useLayoutEffect(() => {
        nameRef.current.focus();
    }, []);

    const [errors, setErrors] = useState({ image: "", general: "" });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file.size > 2000000) {
                setErrors({...errors, image: "Image must be less that 2MB."});
            } else {
                setData({ ...data, image: file });
            }
            console.log(file);
            console.log(data.image);
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append("id", currentProfile.id || "");
        formData.append("name", data.name.trim());
        formData.append("email", data.email.trim());
        formData.append("title", data.title.trim());
        formData.append("bio", data.bio.trim());
        if (data.image) formData.append("image", data.image);
        console.log(data.image+"test");
        try {
            const response = await fetch("https://web.ics.purdue.edu/~nrusk/profile-app/send-data-with-id.php", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                setData({ name: "", title: "", email: "", bio: "", image: null });
                setErrors({image: "", general: ""});
                setSuccessMessage("Data submitted successfully.");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 1000);
                isEdit && navigate(-1);
            } else {
                setErrors({image: "", general: result.message});
                setSuccessMessage("");
            }
        } catch (error) {
            setErrors({image: "", general: error});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style["profile-form"]}>
            <input 
                ref={nameRef}
                type="text" 
                name="name" 
                placeholder="Title" 
                required 
                value={data.name} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="title" 
                placeholder="Movie or TV Show" 
                required 
                value={data.title} 
                onChange={handleChange} 
            />
            <textarea 
                name="bio" 
                placeholder="Genre" 
                maxLength={200}
                required
                value={data.bio}
                onChange={handleChange} 
            ></textarea>
            <p>{data.bio.length}/200</p>
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
                value={data.email} 
                onChange={handleChange} 
            />
            <label htmlFor="image">Choose a cover image:</label>
                <input type="file" id="image" name="image" accept="image/png, image/jpeg, img/jpg, image/gif" onChange={handleChange}/>
                {errors.image && <p className={style['error']}>{errors.image}</p>}
            <button 
                    type="submit" 
                    disabled={
                    submitting || 
                    errors.image !== "" ||  
                    data.email.trim() === "" || 
                    data.title.trim() === "" || 
                    data.bio.trim() === "" || 
                    (!isEdit && !data.image)}
            >Submit</button>
                {errors.general && <p className={style['error']}>{errors.general}</p>}
                {successMessage && <p className={style['success']}>{successMessage}</p>}
        </form>
    );
};

export default ProfileForm;