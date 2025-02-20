import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FaBook, FaCalendarAlt, FaFileAlt, FaUser, FaSearch } from 'react-icons/fa';
import MyCalendar from './MyCalendar';
import { Link } from 'react-router-dom';

const Home = () => {
  const studentId=localStorage.getItem('studentId')
    const [studentScore, setStudentScore] = useState(0);

    useEffect(() => {
      const postScore=async()=>{
        try {
          const response=await fetch(`http://localhost:3001/student-progress/${studentId}`,{
            method:'GET',
            headers:{
              "Content-Type":"application/json"
            }
          })
          const data=await response.json()
          console.log(data)

          console.log(studentScore)
          setStudentScore(data.averageProgress)
        } catch (error) {
          alert(error)
        }
      }
      postScore();
    }, []);

    const chartData = [
        { name: "Scored", value: studentScore },
        { name: "Remaining", value: 100 - studentScore },
    ];

    const COLORS = ["#4F46E5", "#E5E7EB"];
    const name=localStorage.getItem('student');
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/5 bg-blue-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">My Studies</h2>
                <nav className="space-y-4">
                    <Link to="/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
                        <FaBook /> <span>Dashboard</span>
                    </Link>
                    <Link to="/milestones" className="flex items-center space-x-2 hover:text-gray-300">
                        <FaFileAlt /> <span>Milestones</span>
                    </Link>
                    <Link to="/analytics" className="flex items-center space-x-2 hover:text-gray-300">
                        <FaCalendarAlt /> <span>Analytics</span>
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Welcome back, <span className="text-blue-600">{name}</span></h1>
                    <div className="flex items-center space-x-4">
                        <FaSearch className="text-gray-500" />
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-gray-600" />
                            <span>{name}</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 mt-2">Your current score average is {studentScore  || 0}%  <span className="text-blue-600">Lets work together</span></p>

                <div className="grid grid-cols-3 gap-6 mt-6">
                    {/* Student Score Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="font-semibold text-lg mb-4">Your Score</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <p className="text-xl font-semibold mt-4">{(studentScore || 0).toFixed(2)}%</p>
                    </div>

                    {/* Calendar */}
                    <div className="col-span-1">
                        <MyCalendar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
