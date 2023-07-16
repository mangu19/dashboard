import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8082/getbyid/1'); // Replace with your backend API endpoint
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Extracting labels and values from the data
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Data Chart',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;