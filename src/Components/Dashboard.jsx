
// When the user submits the login form, it sends a POST request to our API with the email and password provided. If the credentials are correct, the API will return a JWT token which we will set in the state and store in local storage for future usage.

// Step 8: Building the Dashboard Component

// The `Dashboard` component is responsible for showing the data from the API. We will use `axios` to fetch data from the API.


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;