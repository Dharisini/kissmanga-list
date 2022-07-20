import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./body.css";

function Body() {
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // getting the whole 25 mangas
  const [mangaList, setMangaList] = useState([]);

  const navigate = useNavigate();

  //search input stuff
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getMangas();
  }, [currentPage]);
  //resp is response
  const getMangas = async () => {
    try {
      const resp = await Axios.get("https://api.jikan.moe/v4/manga", {
        params: { page: currentPage },
      });
      setMangaList(resp.data.data);
      //   console.log(mangaList);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  //this handles the search functionality
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const test = () => {
    console.log("hi");
  };

  const fetchmanga = async () => {
    try {
      const resp = await Axios.get(
        `https://api.jikan.moe/v4/manga?q=${searchInput}&sfw`
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
      <div class="topnav">
        <a class="active" href="#logo">
          Logo
        </a>
        <h1 className="title">App Title</h1>
        <div class="search-container">
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
            setCurrentPage(currentPage + 1);
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
