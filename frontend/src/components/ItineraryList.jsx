import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [filters, setFilters] = useState({
    destination: "",
    minPrice: "",
    maxPrice: "",
    duration: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/itineraries/")
      .then((response) => {
        setItineraries(response.data);
        setFilteredItineraries(response.data);
      })
      .catch((error) => console.error("Error fetching itineraries:", error));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let result = [...itineraries];

    if (filters.destination) {
      result = result.filter((item) =>
        item.destination.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }

    if (filters.minPrice) {
      result = result.filter((item) => parseFloat(item.price) >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((item) => parseFloat(item.price) <= parseFloat(filters.maxPrice));
    }

    if (filters.duration) {
      const [minDur, maxDur] = filters.duration.split("-").map(Number);
      result = result.filter((item) => item.duration_days >= minDur && item.duration_days <= maxDur);
    }

    setFilteredItineraries(result);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Filter Itineraries</h2>
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Destination"
          name="destination"
          value={filters.destination}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Min Price"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded w-full"
        />
        <select
          name="duration"
          value={filters.duration}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">All Durations</option>
          <option value="1-3">1–3 Days</option>
          <option value="4-7">4–7 Days</option>
          <option value="8-15">8–15 Days</option>
        </select>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </div>

      {filteredItineraries.length === 0 ? (
        <p className="text-gray-600">No itineraries found matching filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItineraries.map((item) => (
            <div key={item.id} className="border rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">Destination: {item.destination}</p>
              <p className="text-gray-700">Price: ₹ {item.price}</p>
              <p className="text-gray-700">Duration: {item.duration_days} days</p>
              <Link
                to={`/itinerary/${item.slug}`}
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryList;
