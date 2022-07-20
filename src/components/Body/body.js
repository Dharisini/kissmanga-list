import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./body.css";

function Body() {
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // getting the whole 25 mangas
  const [mangaList, setMangaList] = useState([]);
  const navigate = useNavigate();

  const { searchTitle } = useParams();

  useEffect(() => {
    setMangaList([]);
    if (!searchTitle) {
      getMangas();
    } else {
      fetchmanga();
    }
  }, [currentPage, searchTitle]);

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
  const ref = useRef();

  const fetchmanga = async () => {
    try {
      const resp = await Axios.get(
        `https://api.jikan.moe/v4/manga?q=${searchTitle}&sfw`
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

  const goSearch = () => {
    if (!ref.current?.value) return;
    navigate(`/search/${ref.current.value}`);
  };

  return (
    <div className="main">
      <div className="topnav">
        <a className="active" href="#logo">
          Logo
        </a>
        <h1 className="title">App Title</h1>
        <div className="search-container">
          <div>
            <input type="text" placeholder="Search.." name="search" ref={ref}>
              {/* search function  */}
            </input>
            <button onClick={goSearch}>Submit</button>
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
