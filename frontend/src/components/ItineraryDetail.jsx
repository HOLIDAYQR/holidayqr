import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReelUpload from "./ReelUpload"; // Upload form

const ItineraryDetail = () => {
  const { slug } = useParams(); // slug is actually the ID
  const [itinerary, setItinerary] = useState(null);
  const [reels, setReels] = useState([]);
  const apiBase = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    axios
      .get(`${apiBase}itineraries/${slug}/`)
      .then((response) => {
        setItinerary(response.data);
        fetchReels(response.data.id);
      })
      .catch((error) => console.error("Error fetching itinerary:", error));
  }, [slug, apiBase]);

  const fetchReels = (itineraryId) => {
    axios
      .get(`${apiBase}reels/?itinerary=${itineraryId}`)
      .then((response) => setReels(response.data))
      .catch((error) => console.error("Error fetching reels:", error));
  };

  if (!itinerary) return <p className="p-6">Loading itinerary details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-3xl font-bold mb-4">{itinerary.title}</h2>
      <p className="text-gray-700 dark:text-gray-300"><strong>Destination:</strong> {itinerary.destination}</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Duration:</strong> {itinerary.duration_days} days</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Price:</strong> ₹ {itinerary.price}</p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{itinerary.description}</p>

      {itinerary.qr_code && (
        <img
          src={`${apiBase.replace("/api/", "")}${itinerary.qr_code}`}
          alt="QR Code"
          className="mt-6 w-36 h-auto"
        />
      )}

      <hr className="my-6" />
      <h3 className="text-xl font-semibold mb-3">Reels for this Itinerary</h3>

      <ReelUpload itineraryId={itinerary.id} />

      {reels.length === 0 ? (
        <p className="text-gray-500 mt-4">No reels uploaded for this itinerary yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {reels.map((reel) => (
            <video
              key={reel.id}
              controls
              className="w-full rounded shadow"
              src={`${apiBase.replace("/api/", "")}${reel.video}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryDetail;
