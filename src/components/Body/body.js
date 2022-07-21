import { findByLabelText } from "@testing-library/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./body.css";

import logo from "./kiss.png";
import SearchIcon from "@mui/icons-material/Search";

function Body() {
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // getting the whole 25 mangas
  const [mangaList, setMangaList] = useState([]);
  const [last_visible_page, setLastVisiblePage] = useState();

  const navigate = useNavigate();

  //this to get search input
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
      setCurrentPage(resp.data.pagination.current_page);
      setMangaList(resp.data.data);
      setLastVisiblePage(resp.data.pagination.last_visible_page);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  //this handles the SEARCH MANGA functionality
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  // this handles calling out specific page
  const searchPage = (searchValue) => {
    setCurrentPage(searchValue);
  };

  const fetchmanga = async () => {
    try {
      const resp = await Axios.get(
        `https://api.jikan.moe/v4/manga?q=${searchInput}&sfw=Y`
      );
      console.log(resp);
      setMangaList(resp.data.data);
      // // adding page scroller
      // setCurrentPage(resp.data.pagination.current_page);
      // setLastVisiblePage(resp.data.pagination.last_visible_page);
      // //   console.log(mangaList);
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
        <div className="logo">
          <img cl src={logo} />
        </div>

        <div className="search-container">
          <div className="search-container-wrapper">
            <input
              type="text"
              name="search"
              onChange={(e) => searchItems(e.target.value)}
            >
              {/* search function  */}
            </input>
            <SearchIcon className="search-icon" onClick={fetchmanga} />
          </div>
        </div>
      </div>

      {/* <Featured /> */}

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
        <div className="page-by-number">
          <h3>
            Page {currentPage} <br />
            of
            <br />
            {last_visible_page}
          </h3>
          <h3></h3>
        </div>
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
          Next Page
        </button>
      </div>

      {mangaList.map((manga) => {
        return (
          <div className="manga-card" key={manga.mal_id}>
            <img
              src={manga.images.jpg.image_url}
              className="manga-card-poster"
            />
            <div
              className="manga-card-synopsis"
              onClick={() => goToPage(manga.mal_id)}
            >
              {/* cuts at 300 characters */}
              <h3>{manga.title?.substring(0, 50)}</h3>
              <p>
                {manga.synopsis?.substring(0, 250)}
                {manga.synopsis?.length >= 250 ? "..." : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Body;
