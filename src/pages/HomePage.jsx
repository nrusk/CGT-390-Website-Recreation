import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import styles from "../styles/home.module.css";

const HomePage = () => {

  //variables
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
 
  //variable to store the mode state
  const [mode, setMode] = useState("light");
  //function to update the mode state
  const handleModeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  //get titles
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~nrusk/website-recreation/get-titles.php")
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
    fetch(`https://web.ics.purdue.edu/~nrusk/website-recreation/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=8`)
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
      <h1>Top TV Shows and Movies List</h1>
      <div className={styles["filter-wrapper"]}>
        <div className={styles["filter--select"]}>
          <label htmlFor="title-select">Select a title: </label>
          <select id="title-select" onChange={handleTitleChange} value={title}>
            <option value="">All</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["filter--search"]}>
          <label htmlFor="search">Search for a title: </label>
          <input
            type="text"
            id="search"
            onChange={handleSearchChange}
            value={search}
          />
        </div>
        <button onClick={handleClear} style={buttonStyle}>
          <span className="sr-only">Reset</span>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className={styles["profile-cards"]}>
        {profiles.map((profile) => (
          <Card key={profile.id} {...profile} />
        ))}
      </div>
      {count === 0 && <p>No titles found!</p>}
      {count > 10 && (
        <div className={styles["pagination"]}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>{page}/{Math.ceil(count/10)}</span>
          <button onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(count/10)}>
            <span className="sr-only">Next</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
      </div>
      )}
    </Wrapper>
  );
};

export default HomePage;