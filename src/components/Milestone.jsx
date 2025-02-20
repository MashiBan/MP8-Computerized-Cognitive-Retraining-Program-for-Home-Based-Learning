import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaFileAlt } from 'react-icons/fa';

const Milestone = () => {
  const [milestones, setMilestones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch("http://localhost:3001/1/milestone", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setMilestones(data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchMilestones();
  }, []); // Runs only once on component mount

  return (
    <>
    <div className="flex h-screen bg-gray-100">
    <div className="w-1/5 bg-blue-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">My Studies</h2>
                <nav className="space-y-4">
                    <Link to="/home" className="flex items-center space-x-2 hover:text-gray-300">
                        <FaBook /> <span>Dashboard</span>
                    </Link>
                    <Link to="/milestones" className="flex items-center space-x-2 hover:text-gray-300">
                        <FaFileAlt /> <span>Milestones</span>
                    </Link>
                    
                </nav>
            </div>
    
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Your Milestones</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <div 
              key={milestone.id}
              onClick={() => navigate(`/questions/${milestone.id}`)}
              className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800">Milestone {milestone.id}</h2>
              <p className="text-gray-500 mt-2">{milestone.name}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No milestones available.</p>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default Milestone;
