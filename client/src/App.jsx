import CounterApp from './Components/CounterApp';
import InfoCard from './Components/InfoCard'
import Navbar from './components/NabbarComponet'
import { ToDoList } from './Components/ToDoList';
import './styles/App.css'
import React from 'react'

function App() {
    const students = [
    { id: 1, name: 'Alice', email: 'a@example.com', phone: '111-222', course: 'React', duration: '4 weeks' },
    { id: 2, name: 'Bob',   email: 'b@example.com', phone: '333-444', course: 'Vue',   duration: '6 weeks' },
    { id: 3, name: 'Charlie', email: 'c@example.com', phone: '555-666', course: 'Svelte', duration: '3 weeks' },
  ];
  return ( 
    <React.Fragment>
      <Navbar />
      <div>
        <h1 className="text-3xl font-bold text-center mt-24">Course Management System</h1>
      </div>

      <div>
        {students.map((student, index)=>(
          <InfoCard key={index} name={student.name} email={student.email} phone={student.phone} course={student.course} duration={student.duration} />
        ))}
      </div>
      {/* <InfoCard infoprops={{name: "Lenin", email: "lenin@example.com", phone: "123-456-7890", course: "Web Development", duration: "12 weeks"}} /> */}
      {/* <InfoCard   name="Lenin"
  email="lenin@example.com"
  phone="+977 980-XXXXXXX"
  course="Web Dev"
  duration="12 weeks"/> */}

      <CounterApp />
      <ToDoList />
        
    </React.Fragment>
  )
}

export default App