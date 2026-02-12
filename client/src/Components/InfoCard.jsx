import React from 'react'

// export default function InfoCard({ infoprops }) {
//   const { name, email, phone, course, duration } = infoprops;  //oldway to access props

export default function InfoCard({ name, email, phone, course, duration }) {

  return (
    <>
      <div className="bg-white mt-10 mx-4 shadow-md rounded-lg p-6 mb-8 border border-blue-400">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Course Information
        </h2>

        <ul className="flex flex-wrap justify-center gap-6 mt-4 text-gray-600">
          <li>Name: {name}</li>
          <li>Email: {email}</li>
          <li>Phone: {phone}</li>
          <li>Course: {course}</li>
          <li>Duration: {duration}</li>
        </ul>
      </div>

      <div className="mx-4 my-12 p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800">Info Card</h2>
        <p className="mt-2 text-gray-600">
          This is an info card component. You can use it to display important information or announcements to users.
        </p>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Learn More
        </button>
      </div>
    </>
  );
}
