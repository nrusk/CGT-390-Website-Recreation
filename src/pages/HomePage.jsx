import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {

  //variables
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);


  //get titles
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~nrusk/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
          setTitles(data.titles);
      })
  }, [])

  //update title on change of the dropdown
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
  };

  //update the search on change of input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  //fetch data from server
  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~nrusk/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=9`)
        .then((res) => res.json())
        .then((data) => {
          setProfiles(data.profiles);
          setCount(data.count);
          setPage(data.page);
        })
  }, [title, search, page]);

  //clear title and search
  const handleClear = () => {
    setTitle("");
    setSearch("");
    setPage(1);
  };

  const buttonStyle = {
    border: "1px solid #ccc",
  };

  return (
    <Wrapper>
      <h1>Top TV Shows and Movies</h1>
      <div className={styles["filter-wrapper"]}>
      <div className={styles["filter-wrapper-left"]}>
        <div className={styles["filter--select"]}>
          <select id="title-select" onChange={handleTitleChange} value={title}>
            <option value="">All</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div className={styles["filter-wrapper-right"]}>
        <div className={styles["filter--search"]}>
          <input
            type="text"
            placeholder="search for a title"
            id="search"
            onChange={handleSearchChange}
            value={search}
          />
        
        </div>
        <button className={styles["pageButtons"]} onClick={handleClear} style={buttonStyle}>
          <span className="sr-only">Reset</span>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        </div>
        </div>
      <div className={styles["profile-cards"]}>
        {profiles.map((profile) => (
          <Link to={`profile/${profile.id}`} key={profile.id}>
          <Card {...profile} />
          </Link>
        ))}
      </div>
      {count === 0 && <p>No titles found!</p>}
      {count > 10 && (
        <div className={styles["pagination"]}>
          <button className={styles["pageButtons"]} onClick={() => setPage(page - 1)} disabled={page === 1}>
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <span>{page}/{Math.ceil(count/10)}</span>
          <button className={styles["pageButtons"]} onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(count/10)}>
            <span className="sr-only">Next</span>
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
      </div>
      )}
    </Wrapper>
  );
};

export default HomePage;