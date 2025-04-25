import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Milestone from './components/Milestone'
import Questions from './components/Questions/Questions'
import Login from './components/Login'
import AdminPage from './components/AdminPage'
import TeacherMilestones from './components/TeacherMilestone'



function App() {
 

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Login/>} />
     <Route  path="/home" element={<Home/>} />
     <Route  path="/milestones" element={<Milestone/>} />
     <Route  path="/questions/:milestoneId" element={<Questions/>}/>
     <Route path="/admin" element={<AdminPage/>} />
     <Route path="/teacher/milestones" element={<TeacherMilestones/>} />
     </Routes>
     </Router>
  )
}

export default App
