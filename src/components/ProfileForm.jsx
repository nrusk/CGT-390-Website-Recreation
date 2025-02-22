import { useState } from "react";
import style from "../styles/profileForm.module.css";

const ProfileForm = () => {
    const [data, setData] = useState({ titleType: "", newTitle: "", actors: "", image: null });
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
        formData.append("titleType", data.titleType.trim());
        formData.append("newTitle", data.newTitle.trim());
        formData.append("actors", data.actors.trim());
        if (data.image) formData.append("image", data.image);
        console.log(data.image+"test");
        try {
            const response = await fetch("https://web.ics.purdue.edu/~nrusk/website-recreation/send-data.php", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                setData({ titleType: "", newTitle: "", actors: "", image: null });
                setErrors({image: "", general: ""});
                setSuccessMessage("Data submitted successfully.");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 1000);

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
            <select name="titleType">
                <option value={data.titleType}>Movie</option>
                <option value={data.titleType}>TV Show</option>
            </select>
            <input 
                type="text" 
                name="newTitle" 
                placeholder="Title" 
                required 
                value={data.newTitle} 
                onChange={handleChange} 
            />
            <textarea 
                name="actors" 
                placeholder="Lead Actor/Actors" 
                maxLength={200}
                required
                value={data.actors}
                onChange={handleChange} 
            ></textarea>
        <p>{data.actors.length}/200</p>
            <label htmlFor="image">Choose the cover image:</label>
                <input type="file" id="image" name="image" accept="image/png, image/jpeg, img/jpg, image/gif" onChange={handleChange}/>
                {errors.image && <p className={style['error']}>{errors.image}</p>}
            <button type="submit" disabled={submitting || errors.image !== "" || data.newTitle.trim() === "" || data.actors.trim() === "" || data.image === null? true: false}>Submit</button>
                {errors.general && <p className={style['error']}>{errors.general}</p>}
                {successMessage && <p className={style['success']}>{successMessage}</p>}
        </form>
    );
};

export default ProfileForm;