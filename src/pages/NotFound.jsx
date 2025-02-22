import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <Wrapper>
      <h1>404</h1>
      <p style={{textAlign: "center"}}>Sorry, page not found</p>
      <Link to="/" style={{textAlign: "center", display: "block"}}>Go to Home page</Link>
    </Wrapper>
  );
};

export default NotFound;