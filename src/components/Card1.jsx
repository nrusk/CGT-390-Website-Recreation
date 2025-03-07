import img from '../assets/image1.png';
import '../styles/card.css';

const Card1 = () => {

    const name = 'John Doe';
    const title = 'Software Engineer';
    const email = 'a@a.com';

    return (
        <div className="profile-card">
            <div className="profile-card__image">
                <img src={img} alt={name} />
            </div>
            <div className="profile-card__content">
                <p>{name}</p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
    );
}

export default Card1;