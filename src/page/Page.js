import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

export default function Page() {
  const { id } = useParams();
  //   console.log(`shit=${id}`);
  //get profile info
  const [profile, setProfile] = useState([]);

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
  console.log(profile);

  return <h1>{id}</h1>;
}
