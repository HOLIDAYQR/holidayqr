import React, { useState } from "react";
import api from "../api/axios";

const ReelUploader = ({ itineraryId }) => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("itinerary", itineraryId);

    try {
      await api.post("reels/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleChange} />
      <button onClick={handleUpload}>Upload Reel</button>
      {uploaded && <p>🎬 Reel uploaded!</p>}
    </div>
  );
};

export default ReelUploader;
