import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "./page.css";

function Page() {
  const navigate = useNavigate();

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

  return (
    //added <button onClick={() => navigate("/")}>back</button>
    <div className="full">
      <div className="header">
        <button className="back" onClick={() => navigate("/")}>
          BACK
        </button>
        <div className="flex-center h-90">
          <h1>Manga Profile</h1>
        </div>
      </div>
      <h1 className="flex-center"></h1>

      <div className="two-cols">
        <left className="flex-center left-col">
          <img src={profile.images?.jpg.image_url}></img>
        </left>
        <right className="flex-center right-col">
          <div>
            {/* <h1>Information</h1> */}
            <h1>
              {profile.title_japanese} ({profile.title})
            </h1>
            <ul>
              <li>Score:{profile.score}/10</li>

              <li>Running from: {profile.published?.string}</li>

              <li>Summary: {profile.synopsis}</li>

              <li>More Info: {more_info.moreinfo}</li>
            </ul>
          </div>
        </right>
      </div>
    </div>
  );
}
export default Page;
