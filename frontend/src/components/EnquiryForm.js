import React, { useState } from "react";
import api from "../api/axios";

const EnquiryForm = ({ itineraryId }) => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("enquiries/", { ...form, itinerary: itineraryId })
      .then(() => setSubmitted(true))
      .catch((err) => console.error(err));
  };

  if (submitted) return <p>✅ Enquiry submitted!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
      <button type="submit">Send Enquiry</button>
    </form>
  );
};

export default EnquiryForm;
