import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js'

// Register the necessary components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const CovidDashboard = () => {
  const [topDistrictsData, setTopDistrictsData] = useState([]);
  const [highestActiveState, setHighestActiveState] = useState(null);
  const [districtsData, setDistrictsData] = useState([]);
  const [totalStats, setTotalStats] = useState(null);
  const [districtsCountData, setDistrictsCountData] = useState([]);
  const [lowestDeathsState, setLowestDeathsState] = useState(null);
  const [activeCasesPercentage, setActiveCasesPercentage] = useState([]);
  const [averageCasesPerDistrict, setAverageCasesPerDistrict] = useState([]);
  const [activeCasesMoreThan50Percent, setActiveCasesMoreThan50Percent] = useState([]);
  const [curedToCasesRatio, setCuredToCasesRatio] = useState([]);
  const [selectedChart, setSelectedChart] = useState('topDistricts');



  useEffect(() => {
    axios.get('https://covid19-backend-fc7a.onrender.com/top-5-districts-with-highest-cases/')
      .then(response => setTopDistrictsData(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/state-with-highest-active-cases/')
      .then(response => setHighestActiveState(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/districts-with-state-names/')
      .then(response => setDistrictsData(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/total-stats-country/')
      .then(response => setTotalStats(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/districts-count-by-state/')
      .then(response => setDistrictsCountData(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/state-with-lowest-deaths/')
      .then(response => setLowestDeathsState(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/active-cases-percentage-by-state/')
      .then(response => setActiveCasesPercentage(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/average-cases-per-district-by-state/')
      .then(response => setAverageCasesPerDistrict(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/states-active-cases-more-than-50-percent/')
      .then(response => setActiveCasesMoreThan50Percent(response.data))
      .catch(error => console.error(error));

    axios.get('https://covid19-backend-fc7a.onrender.com/top-3-states-highest-cured-to-cases-ratio/')
      .then(response => setCuredToCasesRatio(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setSelectedChart(e.target.value);
  };

    // Function to generate a random color
    // Function to generate a random color
    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const a = 0.6; // You can adjust the alpha value as needed
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

     // Generating random colors for each state in the activeCasesPercentage array
  const colors = activeCasesPercentage.map(() => generateRandomColor());

  const colors2 = Array.from({ length: 5 }, () => generateRandomColor());
  const colors3 = Array.from({ length: 5 }, () => generateRandomColor());

  // Preparing data for charts
  const topDistrictsChartData = {
    labels: topDistrictsData.map(d => d.districtName),
    datasets: [
      {
        label: 'Cases',
        data: topDistrictsData.map(d => d.cases),
        backgroundColor: colors2
      }
    ]
  };

  const districtsCountChartData = {
    labels: districtsCountData.map(d => d.stateName),
    datasets: [
      {
        label: 'Number of Districts',
        data: districtsCountData.map(d => d.numberOfDistricts),
        backgroundColor: colors
      }
    ]
  };

  const activeCasesPercentageChartData = {
    labels: activeCasesPercentage.map(d => d.stateName),
    datasets: [
      {
        label: 'Active Cases Percentage',
        data: activeCasesPercentage.map(d => d.activeCasesPercentage),
        backgroundColor: colors // Used the generated colors
      }
    ]
  };

  const averageCasesPerDistrictChartData = {
    labels: averageCasesPerDistrict.map(d => d.stateName),
    datasets: [
      {
        label: 'Average Cases per District',
        data: averageCasesPerDistrict.map(d => d.averageCasesPerDistrict),
        backgroundColor: colors
      }
    ]
  };

  const activeCasesMoreThan50PercentChartData = {
    labels: activeCasesMoreThan50Percent.map(d => d.stateName),
    datasets: [
      {
        label: 'Active Cases Percentage',
        data: activeCasesMoreThan50Percent.map(d => d.activeCasesPercentage),
        backgroundColor: colors2
      }
    ]
  };

  const curedToCasesRatioChartData = {
    labels: curedToCasesRatio.map(d => d.stateName),
    datasets: [
      {
        label: 'Cured to Cases Ratio (%)',
        data: curedToCasesRatio.map(d => d.curedToCasesRatio),
        backgroundColor: colors3
      }
    ]
  };

  const totalStatsChartData = {
    labels: ['Total Cases', 'Total Cured', 'Total Active', 'Total Deaths'],
    datasets: [
        {
            label: 'Total Stats for the Country',
            data: [
                totalStats?.totalCases || 0,
                totalStats?.totalCured || 0,
                totalStats?.totalActive || 0,
                totalStats?.totalDeaths || 0,
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
            ],
        },
    ],
};

return (
    <div className="container">
      <h1 className="mt-4">Covid-19 Dashboard</h1>

      <select className="form-select mt-4" onChange={handleChange} value={selectedChart}>
        <option value="topDistricts">Top 5 Districts with Highest Cases</option>
        <option value="highestActiveState">State with Highest Number of Active Cases</option>
        <option value="districtsCount">Number of Districts in Each State</option>
        <option value="activeCasesPercentage">Percentage of Active Cases per State</option>
        <option value="averageCasesPerDistrict">Average Cases per District by State</option>
        <option value="activeCasesMoreThan50Percent">States with Active Cases More Than 50%</option>
        <option value="curedToCasesRatio">Top 3 States with Highest Cured to Cases Ratio</option>
        <option value="totalStats">Total Stats for the Country</option>
        <option value="lowestDeathsState">State with Lowest Number of Deaths</option>
      </select>

      <div className="mt-4">
        {selectedChart === 'topDistricts' && topDistrictsData.length > 0 && (
          <div>
            <h2>Top 5 Districts with Highest Cases</h2>
            <Bar data={topDistrictsChartData} />
          </div>
        )}

        {selectedChart === 'highestActiveState' && highestActiveState && (
          <div>
            <h2>State with Highest Number of Active Cases</h2>
            <p>{highestActiveState.stateName}: {highestActiveState.totalActiveCases} Active Cases</p>
          </div>
        )}

        {selectedChart === 'districtsCount' && districtsCountData.length > 0 && (
          <div>
            <h2>Number of Districts in Each State</h2>
            <Bar data={districtsCountChartData} />
          </div>
        )}

        {selectedChart === 'activeCasesPercentage' && activeCasesPercentage.length > 0 && (
          <div>
            <h2>Percentage of Active Cases per State</h2>
            <Pie data={activeCasesPercentageChartData} />
          </div>
        )}

        {selectedChart === 'averageCasesPerDistrict' && averageCasesPerDistrict.length > 0 && (
          <div>
            <h2>Average Cases per District by State</h2>
            <Bar data={averageCasesPerDistrictChartData} />
          </div>
        )}

        {selectedChart === 'activeCasesMoreThan50Percent' && activeCasesMoreThan50Percent.length > 0 && (
          <div>
            <h2>States with Active Cases More Than 50%</h2>
            <Bar data={activeCasesMoreThan50PercentChartData} />
          </div>
        )}

        {selectedChart === 'curedToCasesRatio' && curedToCasesRatio.length > 0 && (
          <div>
            <h2>Top 3 States with Highest Cured to Cases Ratio</h2>
            <Bar data={curedToCasesRatioChartData} />
          </div>
        )}

        {selectedChart === 'totalStats' && totalStats && (
          <div>
            <h2>Total Stats for the Country</h2>
            <Bar data={totalStatsChartData} />
          </div>
        )}

        {selectedChart === 'lowestDeathsState' && lowestDeathsState && (
          <div>
            <h2>State with Lowest Number of Deaths</h2>
            <p>{lowestDeathsState.stateName}: {lowestDeathsState.totalDeaths} Deaths</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CovidDashboard;
