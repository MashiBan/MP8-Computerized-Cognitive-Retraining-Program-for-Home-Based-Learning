import React, { useEffect, useState } from 'react';
import { FaUser, FaChalkboardTeacher, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import GlobalButton from './GlobalButton';

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [studentProgress, setStudentProgress] = useState({});
  const [name, setName] = useState('');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, milestonesRes] = await Promise.all([
          fetch('https://cognitive-backend-current.onrender.com/students'),
          fetch('https://cognitive-backend-current.onrender.com/milestones'),
        ]);

        setStudents(await studentsRes.json());
        setMilestones(await milestonesRes.json());
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    students.forEach((student) => {
      fetch(`https://cognitive-backend-current.onrender.com/student-progress/${student.id}`)
        .then(res => res.json())
        .then(data => {
          setStudentProgress(prev => ({
            ...prev,
            [student.id]: data.progress,
          }));
        })
        .catch(err => console.error(`Error fetching progress for ${student.id}:`, err));
    });
  }, [students]);

  const handleCreateMilestone = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://cognitive-backend-current.onrender.com/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, iqCategoryId: 1 }),
      });
      const data = await res.json();
      if (data.milestone) {
        setMilestones((prev) => [...prev, data.milestone]);
        setName('');
      }
    } catch (error) {
      console.error('Error creating milestone:', error);
    }
  };

  const handleAddQuestion = async () => {
    try {
      const res = await fetch('https://cognitive-backend-current.onrender.com/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: newQuestion,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
          milestoneId: selectedMilestoneId,
          iqCategoryId: 1,
        }),
      });
  
      const data = await res.json();
      console.log(data); // Log the response to check if there is an error or not
      
      if (data.success) { // Assuming the backend sends a success flag
        setMessage('Question added successfully!');
        setNewQuestion('');
        setOptionA('');
        setOptionB('');
        setOptionC('');
        setOptionD('');
        setCorrectAnswer('A');
      } else {
        setMessage('Error adding question.');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      setMessage('Error adding question.');
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
            <FaChalkboardTeacher /><span><GlobalButton tooltipText={"to open the dashboard press"}>Dashboard</GlobalButton></span>
          </Link>
          <Link to="/teacher/milestones" className="flex items-center space-x-2 hover:text-gray-300">
            <FaFileAlt /><span><GlobalButton tooltipText="Check all milestones">Milestones</GlobalButton></span>
          </Link>
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
            <FaFileAlt /><span><GlobalButton tooltipText="To logout of portal">Logout</GlobalButton></span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        {/* Create Milestone */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Milestone</h2>
          <form onSubmit={handleCreateMilestone}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Milestone Name"
              required
              className="border p-2 rounded w-full mb-4"
            />
            <GlobalButton
  onClick={handleCreateMilestone}
  className="bg-blue-600 text-white px-4 py-2 rounded"
  tooltipText="Click to create a new milestone"
>
  Create
</GlobalButton>
          </form>
        </section>

        {/* Add Question */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Question to Milestone</h2>
          <select
            value={selectedMilestoneId || ''}
            onChange={(e) => setSelectedMilestoneId(Number(e.target.value))}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Select Milestone</option>
            {milestones.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          {selectedMilestoneId && (
            <>
              <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Question" className="border p-2 rounded w-full mb-2" />
              <input value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Option A" className="border p-2 rounded w-full mb-2" />
              <input value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Option B" className="border p-2 rounded w-full mb-2" />
              <input value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Option C" className="border p-2 rounded w-full mb-2" />
              <input value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Option D" className="border p-2 rounded w-full mb-2" />
              <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="border p-2 rounded w-full mb-4">
                {['A', 'B', 'C', 'D'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <GlobalButton onClick={handleAddQuestion} tooltipText={"To add this question to milestone"}>Add Question</GlobalButton>
              {message && <p className="mt-2 text-green-600">{message}</p>}
            </>
          )}
        </section>

        {/* Student Grid */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {students.map(student => (
              <div key={student.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{student.email}</p>
                {studentProgress[student.id] ? (
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={[{ name: 'Progress', value: studentProgress[student.id].progress }]}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p>Loading progress...</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
