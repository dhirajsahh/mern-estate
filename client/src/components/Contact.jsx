import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.useRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.useRef]);
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-3">
          <p>
            Contact
            <span className="font-semibold">{landlord.username}</span> for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here"
            className="w-full border rounded-lg p-3 border-gray-200 focus:outline-none "
          />
          <Link
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
