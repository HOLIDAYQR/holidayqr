import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItineraryList from "./components/ItineraryList";
import ItineraryDetail from "./components/ItineraryDetail";
import ReelUpload from "./components/ReelUpload";
import FakeLogin from "./components/FakeLogin";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HOLIDAYQR</h1>
          <ul className="hidden md:flex space-x-4">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/upload" className="hover:text-blue-500">Upload Reel</Link></li>
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
          </ul>
        </nav>

        <div className="p-4">
          <Routes>
            <Route path="/" element={<ItineraryList />} />
            <Route path="/itinerary/:slug" element={<ItineraryDetail />} />
            <Route path="/upload" element={<ReelUpload />} />
            <Route path="/login" element={<FakeLogin />} />
          </Routes>
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
            }}
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
