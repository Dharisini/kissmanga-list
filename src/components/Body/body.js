import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./body.css";

function Body() {
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // getting the whole 25 mangas
  const [mangaList, setMangaList] = useState([]);
  const [last_visible_page, setLastVisiblePage] = useState();

  const navigate = useNavigate();

  //search input stuff
  const [searchInput, setSearchInput] = useState("");

  //render the search query everytime the state changes
  useEffect(() => {
    getMangas();
  }, [currentPage]);

  //resp is response
  const getMangas = async () => {
    try {
      const resp = await Axios.get("https://api.jikan.moe/v4/manga", {
        params: { page: currentPage, q: searchInput },
      });
      setMangaList(resp.data.data);
      setLastVisiblePage(resp.data.pagination.last_visible_page);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  //this handles the search functionality
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const fetchmanga = async () => {
    try {
      const resp = await Axios.get(
        `https://api.jikan.moe/v4/manga?q=${searchInput}&sfw=Y`
      );
      console.log(resp);
      setMangaList(resp.data.data);
      //   console.log(mangaList);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const goToPage = React.useCallback((id) => {
    navigate(`/manga/${id}`);
  });

  return (
    <div className="main">
      <div className="topnav">
        <a className="active" href="#logo">
          Logo
        </a>
        <h1 className="title">App Title</h1>
        <div className="search-container">
          <div>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              onChange={(e) => searchItems(e.target.value)}
            >
              {/* search function  */}
            </input>
            <button onClick={fetchmanga}>Submit</button>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="previous-button"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          {" "}
          Previous Page
        </button>
        <button
          className="next-button"
          onClick={() => {
            if (currentPage !== last_visible_page) {
              setCurrentPage(currentPage + 1);
            } else {
              alert("This is the last page!");
            }
          }}
        >
          {" "}
          Next Page
        </button>
      </div>

      {mangaList.map((manga, index) => {
        return (
          <img
            className="style"
            onClick={() => goToPage(manga.mal_id)}
            key={index}
            src={manga.images.jpg.image_url}
          />
        );
      })}
    </div>
  );
}

export default Body;
