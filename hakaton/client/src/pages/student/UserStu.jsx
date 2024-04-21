import axios from "axios";
import { useEffect, useState } from "react";

const UserStu = () => {
  const [demand, setDemand] = useState([]);
  const handlStyle = (item) => {
    if (item === "en cours") {
      return "bg-orange-200";
    }
    if (item === "refusée") {
      return "bg-red-500";
    }
    if (item == "accepté") {
      return "bg-green-200";
    }
  };

  useEffect(() => {
    const fetchDemand = async () => {
      try {
        const res = await axios.get("http://localhost:5000/services/feetchmy", {
          withCredentials: true,
        });
        setDemand(res.data);
      } catch (error) {
        console.error("Error fetching demand data:", error);
      }
    };

    fetchDemand();
  }, []);

  return (
    <div className="w-full flex flex-row items-center">
      <div className="max-w-lg border rounded-md shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="flex flex-row mb-4">
          <div className="w-1/4 font-semibold">Full Name:</div>
          <div></div>
        </div>
        <div className="flex flex-row mb-4">
          <div className="w-1/4 font-semibold">Email:</div>
          <div></div>
        </div>
        <div className="flex flex-row mb-4">
          <div className="w-1/4 font-semibold">Filiere:</div>
          <div></div>
        </div>
        <div className="flex flex-row mb-4">
          <div className="w-1/4 font-semibold">Semestre:</div>
          <div></div>
        </div>
        <div className="flex flex-row mb-4">
          <div className="w-1/4 font-semibold">Profile Image:</div>
          <img src="ss" alt="Profile" className="w-16 h-16 rounded-full" />
        </div>
      </div>

      <div className="max-w-lg border rounded-md shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">My Demands</h2>
        {demand.map((item, index) => (
          <div
            key={index}
            className={`mb-4 border rounded-md p-4 ${handlStyle(item.etas)}`}
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 mb-2">Demand Type: {item.demandType}</p>
            <p className="text-gray-600 mb-2">Status: {item.etas}</p>
            <div className="flex justify-between items-center">
              <div>
                <strong>Identifier Number:</strong>{" "}
                {item.details.identifiant_number}
              </div>
              <div>
                <strong>Phone:</strong> {item.details.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStu;
