import React, { useEffect, useState } from "react";
import api from "../api/axios";

const ReelList = ({ itineraryId }) => {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    api.get("reels/")
      .then((res) => {
        const filtered = res.data.filter((r) => r.itinerary === itineraryId);
        setReels(filtered);
      })
      .catch((err) => console.error(err));
  }, [itineraryId]);

  return (
    <div>
      {reels.map((reel) => (
        <video
          key={reel.id}
          src={`http://127.0.0.1:8000${reel.video}`}
          controls
          width="250"
          style={{ marginTop: "10px" }}
        />
      ))}
    </div>
  );
};

export default ReelList;
