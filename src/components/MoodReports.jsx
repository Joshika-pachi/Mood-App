// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import Sidebar from './Sidebar'; 
// import styles from './MoodReports.module.css'; 
// import axios from 'axios';

// const MoodReports = () => {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [moodLogs, setMoodLogs] = useState([]);


  
//     const formatMonthYear = (date) => {
//         return new Intl.DateTimeFormat('en-IN', { 
//             year: 'numeric', 
//             month: 'long', 
//             timeZone: 'Asia/Kolkata' 
//         }).format(date);
//     };

   
//     const handlePreviousMonth = () => {
//         setCurrentDate(prevDate => {
//             const newDate = new Date(prevDate);
//             newDate.setMonth(newDate.getMonth() - 1);
//             return newDate;
//         });
//     };

   
//     const handleNextMonth = () => {
//         setCurrentDate(prevDate => {
//             const newDate = new Date(prevDate);
//             newDate.setMonth(newDate.getMonth() + 1);
//             return newDate;
//         });
//     };

    
//     const moodData = {
//         irritability: [1.5, 2.5, 1, 3, 2.5, 1.7, 2, 2.8, 3, 1.5, 1.3],
//         anxiety: [2, 1.5, 3, 2.8, 1.5, 2, 2.5, 1, 1.6, 2, 1.8],
//         psychoticSymptoms: [0.5, 1, 1.5, 2, 1.8, 1.2, 0.8, 0.7, 1, 1.1, 0.9],
//         talkTherapy: [3, 2.5, 2, 1.5, 1.8, 2.2, 3, 2.8, 2.5, 1.7, 2],
//         appetite: [2.5, 1.8, 2, 3, 2.2, 2.4, 2.1, 2.7, 2.5, 1.9, 2],
//         socialInteraction: [1.5, 2, 2.5, 2.8, 2.3, 2.1, 2, 3, 1.5, 2.5, 2.1],
//     };

   
//     const getChartData = (moodType) => {
//         return {
//             labels: ['Day 1', 'Day 4', 'Day 7', 'Day 10', 'Day 13', 'Day 16', 'Day 19', 'Day 22', 'Day 25', 'Day 28', 'Day 31'],
//             datasets: [
//                 {
//                     label: `${moodType} Data`,
//                     data: moodData[moodType],
//                     backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                 },
//             ],
//         };
//     };

//     return (
//         <div className={styles.reportsContainer}>
//             <Sidebar />
//             <div className={styles.reportsContent}>
               
//                 <div className={styles.navigationBar}>
//                     <button onClick={handlePreviousMonth}>Previous</button>
//                     <h2 style={{color:"#683292"}}>{formatMonthYear(currentDate)}</h2>
//                     <button 
//                         onClick={handleNextMonth} 
//                         disabled={new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()}
//                     >
//                         Next
//                     </button>
//                 </div>

                
//                 <h2 style={{color:"#F83D8E"}}>Mood Indicators for {formatMonthYear(currentDate)}</h2>
//                 <div className={styles.histogramGrid}>
//                     {['irritability', 'anxiety', 'psychoticSymptoms', 'talkTherapy', 'appetite', 'socialInteraction'].map(mood => (
//                         <div className={styles.histogramItem} key={mood}>
//                             <Bar data={getChartData(mood)} />
//                             <h2 style={{color:"#646464"}}>{mood.charAt(0).toUpperCase() + mood.slice(1).replace(/([A-Z])/g, ' $1')}</h2>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MoodReports;


// frontend/src/pages/Dashboard/MoodReports.jsx

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import styles from './MoodReports.module.css';
import axios from 'axios';

const MoodReports = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [moodLogs, setMoodLogs] = useState([]);

    // Format month + year for heading
    const formatMonthYear = (date) => {
        return new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: 'long',
            timeZone: 'Asia/Kolkata'
        }).format(date);
    };

    // Fetch mood logs from backend
    useEffect(() => {
        const fetchMoodLogs = async () => {
            try {
                const username = localStorage.getItem('username'); // get username from localStorage
                if (!username) return;

                const response = await axios.get(`http://localhost:5000/api/moods/${username}`);

                // filter logs for the currently selected month
                const logsForMonth = response.data.filter(log => {
                    const logDate = new Date(log.logDate);
                    return (
                        logDate.getMonth() === currentDate.getMonth() &&
                        logDate.getFullYear() === currentDate.getFullYear()
                    );
                });

                setMoodLogs(logsForMonth);
            } catch (error) {
                console.error("Error fetching mood logs:", error);
            }
        };

        fetchMoodLogs();
    }, [currentDate]);

    // Map mood string values to numbers for charts
    const moodMap = { none: 0, mild: 1, moderate: 2, severe: 3 };

    // Prepare data for a specific mood type
    const prepareData = (moodType) => {
        const labels = moodLogs.map(log => new Date(log.logDate).getDate()); 
        const values = moodLogs.map(log => moodMap[log[moodType]] || 0);     

        return {
            labels,
            datasets: [
                {
                    label: `${moodType} Data`,
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                },
            ],
        };
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 3,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        const labels = ["None", "Mild", "Moderate", "Severe"];
                        return labels[value] || value;
                    }
                }
            }
        }
    };

    return (
        <div className={styles.reportsContainer}>
            <Sidebar />
            <div className={styles.reportsContent}>
                {/* Month navigation */}
                <div className={styles.navigationBar}>
                    <button
                        onClick={() =>
                            setCurrentDate(prevDate => {
                                const newDate = new Date(prevDate);
                                newDate.setMonth(newDate.getMonth() - 1);
                                return newDate;
                            })
                        }
                    >
                        Previous
                    </button>
                    <h2 style={{ color: "#683292" }}>{formatMonthYear(currentDate)}</h2>
                    <button
                        onClick={() =>
                            setCurrentDate(prevDate => {
                                const newDate = new Date(prevDate);
                                newDate.setMonth(newDate.getMonth() + 1);
                                return newDate;
                            })
                        }
                        disabled={
                            new Date().getMonth() === currentDate.getMonth() &&
                            new Date().getFullYear() === currentDate.getFullYear()
                        }
                    >
                        Next
                    </button>
                </div>

                {/* Heading */}
                <h2 style={{ color: "#F83D8E" }}>Mood Indicators for {formatMonthYear(currentDate)}</h2>

                {/* Charts grid */}
                <div className={styles.histogramGrid}>
                    {['irritability', 'anxiety', 'psychoticSymptoms', 'talkTherapy', 'appetite', 'socialInteraction'].map(mood => (
                        <div className={styles.histogramItem} key={mood}>
                            <Bar data={prepareData(mood)} options={chartOptions} />
                            <h2 style={{ color: "#646464" }}>
                                {mood.charAt(0).toUpperCase() + mood.slice(1).replace(/([A-Z])/g, ' $1')}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoodReports;
