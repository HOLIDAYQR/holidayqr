import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReelUpload from "./ReelUpload"; // ✅ Import the upload form

const ItineraryDetail = () => {
  const { slug } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/itineraries/${slug}/`)
      .then((response) => {
        setItinerary(response.data);
        fetchReels(response.data.id);
      })
      .catch((error) => console.error("Error fetching itinerary:", error));
  }, [slug]);

  const fetchReels = (itineraryId) => {
    axios
      .get(`http://127.0.0.1:8000/api/reels/?itinerary=${itineraryId}`)
      .then((response) => setReels(response.data))
      .catch((error) => console.error("Error fetching reels:", error));
  };

  if (!itinerary) return <p>Loading itinerary details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{itinerary.title}</h2>
      <p><strong>Destination:</strong> {itinerary.destination}</p>
      <p><strong>Duration:</strong> {itinerary.duration_days} days</p>
      <p><strong>Price:</strong> ₹ {itinerary.price}</p>
      <p>{itinerary.description}</p>

      {itinerary.qr_code && (
        <img
          src={`http://127.0.0.1:8000${itinerary.qr_code}`}
          alt="QR Code"
          style={{ marginTop: "10px", width: "150px" }}
        />
      )}

      <hr style={{ margin: "30px 0" }} />
      <h3>Reels for this Itinerary</h3>

      <ReelUpload itineraryId={itinerary.id} /> {/* ✅ Upload form */}

      {reels.length === 0 ? (
        <p>No reels uploaded for this itinerary yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {reels.map((reel) => (
            <video
              key={reel.id}
              width="300"
              height="500"
              controls
              src={`http://127.0.0.1:8000${reel.video}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryDetail;
