import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useStores } from "../../stores";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import "./body.css";

function Body() {
  const { page_store } = useStores();
  // debugger;
  const test = page_store.previousPage;
  const value = page_store.searchValue;
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

  // this handles calling out specific page isaiah's messsssssssssssssssssssssssssssss
  const searchPage = (searchValue) => {
    setCurrentPage(searchValue);

    console.log("searchValue", searchValue);
  };

  const fetchmanga = async () => {
    try {
      const resp = await Axios.get(
        `https://api.jikan.moe/v4/manga?q=${searchInput}&sfw=Y`
      );
      console.log(resp);
      setMangaList(resp.data.data);

      setCurrentPage(resp.data.pagination.current_page);
      setLastVisiblePage(resp.data.pagination.last_visible_page);
      //   console.log(mangaList);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const goToPage = React.useCallback((id) => {
    page_store.setPreviousPage(currentPage.toString());
    page_store.setSearchValue(searchInput);

    // console.log("currentPage", currentPage);
    // console.log("searchInput", searchInput);

    // console.log("page_store.previousPage", page_store.previousPage);
    // console.log("page_store.searchValue", page_store.searchValue);
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
            //TODO: set number in the box === currentPage
          }}
        >
          {" "}
          Previous Page
        </button>
        <div className="page-by-number">
          <h3>Page Number:</h3>
          <form>
            <input
              className="number-box"
              type="number"
              placeholder="Page #"
              name="page-skip"
              onChange={(e) => {
                if (e.target.value < last_visible_page) {
                  searchPage(e.target.value);
                  console.log(e.target.value);
                } else {
                  searchPage(last_visible_page);
                  //TODO: set self.value === last_visible_page
                }
              }}
            />
          </form>
          <h3>/{last_visible_page}</h3>
        </div>
        <button
          className="next-button"
          onClick={() => {
            if (currentPage !== last_visible_page) {
              setCurrentPage(currentPage + 1);
              //TODO: set number in the box = currentPage
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

export default observer(Body);
