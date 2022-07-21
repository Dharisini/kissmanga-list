import Axios from "axios";
import React, { useEffect, useState } from "react";

function Featured() {
  useEffect(() => {
    getMangas();
    console.log(recs);
  }, []);
  const [recs, setRecs] = useState([]);
  const getMangas = async () => {
    try {
      const resp = await Axios.get(
        "https://api.jikan.moe/v4/manga/1/recommendations",
        {
          params: {},
        }
      );

      setRecs(resp.data.data[0]);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  return (
    <div>
      <img src={recs.entry?.images.webp.large_image_url} />
      {recs.entry?.images.webp.large_image_url}
    </div>
  );
}

export default Featured;
