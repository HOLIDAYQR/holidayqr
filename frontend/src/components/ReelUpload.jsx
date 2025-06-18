import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ReelUpload = () => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [formData, setFormData] = useState({ itinerary: "", video: null });
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("❌ Please login to upload reels.");
      navigate("/login");
      return;
    }

    axios.get("http://127.0.0.1:8000/api/itineraries/")
      .then((res) => setItineraries(res.data))
      .catch((err) => console.error("Error fetching itineraries:", err));

    axios.get("http://127.0.0.1:8000/api/reels/")
      .then((res) => setReels(res.data))
      .catch((err) => console.error("Error fetching reels:", err));
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, video: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("itinerary", formData.itinerary);
    data.append("video", formData.video);

    axios.post("http://127.0.0.1:8000/api/reels/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        toast.success("🎉 Reel uploaded successfully!");
        setFormData({ itinerary: "", video: null });
        document.getElementById("reel-upload-form").reset();

        axios.get("http://127.0.0.1:8000/api/reels/")
          .then((res) => setReels(res.data));
      })
      .catch((error) => {
        console.error("Upload error:", error);
        toast.error("❌ Upload failed. Please try again.");
      });
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Reel</h2>
      <form onSubmit={handleSubmit} className="space-y-4" id="reel-upload-form">
        <div>
          <label htmlFor="itinerary" className="block font-medium mb-1">Select Itinerary</label>
          <select
            name="itinerary"
            value={formData.itinerary}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Choose --</option>
            {itineraries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({item.destination})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="video" className="block font-medium mb-1">Upload Video</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      <hr className="my-6" />
      <h3 className="text-xl font-semibold mb-2">Recently Uploaded Reels</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reels.map((reel) => (
          <div key={reel.id}>
            <video controls width="100%" src={`http://127.0.0.1:8000${reel.video}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelUpload;
