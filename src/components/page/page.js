import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";

function Page() {
  const navigate = useNavigate();
  const { page_store } = useStores();
  const { id } = useParams();
  //   console.log(`shit=${id}`);
  //get profile info
  const [profile, setProfile] = useState([]);
  const [more_info, setMore_info] = useState([]);

  useEffect(() => {
    //resp is response

    const getProfile = () => {
      try {
        Axios.get(`https://api.jikan.moe/v4/manga/${id}`).then((resp) => {
          setProfile(resp.data.data);
        });
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    // console.log("useEffect");
    getProfile();
  }, [id]);

  useEffect(() => {
    //resp is response

    console.log("page_store.previousPage", page_store.previousPage);
    console.log("page_store.searchValue", page_store.searchValue);
    const getMoreInfo = () => {
      try {
        Axios.get(`https://api.jikan.moe/v4/manga/${id}/moreinfo`).then(
          (resp) => {
            setMore_info(resp.data.data);
          }
        );
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    // console.log("useEffect");
    getMoreInfo();
  }, [id]);

  return (
    //added
    <div>
      <button onClick={() => navigate("/")}>back</button>
      <img src={profile.images?.jpg.image_url}></img>
      <h1>
        {profile.title_japanese} ({profile.title})
      </h1>
      <p>Score: {profile.score}/10</p>
      <p>Running from: {profile.published?.string}</p>
      <p>Summary: {profile.synopsis}</p>
      <p>More Info: {more_info.moreinfo}</p>
    </div>
  );
}
export default observer(Page);
