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

  // const getTitle = () => {
  //   Axios.get('https://api.jikan.moe/v4/manga',{ params: {page : currentPage } }
  //   ).then((response) => {
  //     // console.log(response.data);
  //     settitle(response?.data);
  //   });
  // };
  // console.log(mangaList);
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
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search"></input>
            <button type="submit">Submit</button>
          </form>
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
        //pass the id of the image to the data.data.mal_id
      })}
    </div>
  );
}

export default Body;
