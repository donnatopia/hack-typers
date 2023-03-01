import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Stats = ({ startTime, endTime, words, prompt, user }) => {
  // toggling between adding and deleting attempt
  const [alreadyAdded, setAlreadyAdded] = useState(true);
  const [currentAttempt, setCurrentAttempt] = useState({});

  // stats
  const timeElapsed = (endTime - startTime)/1000;
  const wpm = Math.floor((words.length * 60) / timeElapsed);

  // chart element
  const [chart, setChart] = useState(null);

  // adding to stats database
  const addAttempt = () => {
    const options = {
      method: 'POST',
      url: '/stats',
      data: { user, wpm, prompt }
    }

    axios(options)
      .then(({ data }) => {
        console.log('added to database');
        setCurrentAttempt(data);
      })
      .catch((err) => {
        console.log('Error adding to database', err);
      })
  };

  // deleting from stats database
  const deleteAttempt = () => {
    const options = {
      method: 'DELETE',
      url: '/stats',
      data: currentAttempt
    };

    axios(options)
      .then(() => {
        console.log('delete from database');
      })
      .catch((err) => {
        console.log('Error deleting from database', err);
      })
  }

  // handle attempt
  const handleAttempt = (e) => {
    e.preventDefault();
    alreadyAdded ? deleteAttempt() : addAttempt();
    setChart(null);
    setAlreadyAdded(!alreadyAdded);
  }

  // generate data for chart
  useEffect(() => {
    axios
      .get('/stats')
      .then(({ data }) => {
        const labels = data.map((attempt, index) => index);
        const wpms = data.map((attempt) => attempt.wpm);

        // change color of chartline depending on if users add or delete attempt
        const borderColor = alreadyAdded ? '#00FF00': '#ff4136';

        const points = {
          labels: labels,
          datasets: [
            {
              label: 'wpm',
              data: wpms,
              borderColor: borderColor,
              tension: 0.1
            }
          ]
        };

        const options = {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Attempts'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Words per Minute (wpm)'
              }
            }
          },

          legend: {
            display: false
          }
        }

        const config = {
          type: 'line',
          data: points,
          options: options
        };

        const generatedChart = new Chart(document.getElementById('trend'), config);
        setChart(generatedChart);
      })
      .catch((err) => {
        console.log('Error retrieving stats', err);
      })

  }, [alreadyAdded]);

  useEffect(() => {
    // cleanup function to remove chart when component is unmounted
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chart]);

  return (
    <div id='stats'>
      <h3>wpm</h3>
      <p>{ wpm }</p>
      <h3>time</h3>
      <p>{ timeElapsed } s</p>
      <button onClick={e => handleAttempt(e) }>
        { alreadyAdded ? 'Remove Attempt' : 'Add Attempt' }
      </button>
      <canvas id='trend' className='chart-line'></canvas>
    </div>
  );
}

export default Stats;