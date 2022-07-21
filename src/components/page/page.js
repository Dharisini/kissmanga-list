import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

export default function Page() {
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

  console.log(more_info);
  console.log(profile);
  console.log(profile.published);

  // function extractContent(s) {
  //   var span = document.createElement("span");
  //   span.innerHTML = s;
  //   return span.textContent || span.innerText;
  // }

  return (
    <div>
      <button>back</button>
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
