import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { SERVER_URL } from '../../../config.js';
import { IoIosAddCircleOutline, IoIosAddCircle, IoIosRemoveCircleOutline } from 'react-icons/io';

const Stats = ({ wpm, timeElapsed, words, prompt, user }) => {
  // toggling between adding and deleting attempt
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState({});

  // chart element
  const [chart, setChart] = useState(null);

  // chart colors
  let borderColors = {
    standard: '#BB86FC',
    upward: '#00FF00',
    downward: '#FF4136',
    equal: '#FFDD00'
  }

  const [borderKey, setBorderKey] = useState('standard');

  // adding to stats database
  const addAttempt = () => {
    const options = {
      method: 'POST',
      url: `${SERVER_URL}/stats`,
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
      url: `${SERVER_URL}/stats`,
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
      .get(`${SERVER_URL}/stats`)
      .then(({ data }) => {
        const labels = [];
        const wpms = [];

        data.forEach((attempt, index) => {
          labels.push(index);
          wpms.push(attempt.wpm);
        });

        // determine of color of chartline if save attempt
        let chartline = borderColors[borderKey];
        if (alreadyAdded) {
          const latestWpm = data[data.length - 1].wpm;
          const prevWpm = data[data.length - 2].wpm;
          const diff = latestWpm - prevWpm;
          if (diff > 0) {
            chartline = borderColors.upward;
            setBorderKey('upward');
          } else if (diff < 0) {
            chartline = borderColors.downward;
            setBorderKey('downward');
          } else {
            chartline = borderColors.equal;
            setBorderKey('equal');
          }
        } else {
          chartline = borderColors.standard;
          setBorderKey('standard');
        }

        const points = {
          labels: labels,
          datasets: [
            {
              label: 'wpm',
              data: wpms,
              borderColor: chartline,
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

        const generatedChart = new Chart(document.getElementById('chart'), config);
        setChart(generatedChart);

        return () => {
          if (chart) {
            chart.destroy();
          }
        };

      })
      .catch((err) => {
        console.log('Error retrieving stats', err);
      });

  }, [alreadyAdded]);

  useEffect(() => {
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chart]);

  return (
    <div id='stats'>
      <div id='current-stats'>
        <div className='indiv-stat'>
          <h3 className='stats-label'>wpm</h3>
          <p className={`stats-data ${borderKey}-trend`}>{ wpm }</p>
        </div>
        <div className='indiv-stat'>
          <h3 className='stats-label'>time</h3>
          <p className={`stats-data ${borderKey}-trend`}>{ timeElapsed } s</p>
        </div>
        <div className='indiv-stat'>
          <h3 className='stats-label' id='attempt-label'>
            { alreadyAdded ? 'remove attempt?' : 'save attempt?' }
          </h3>
          { alreadyAdded
            ? <IoIosRemoveCircleOutline id='attempt-button' onClick={e => handleAttempt(e)}/>
            : <IoIosAddCircleOutline id='attempt-button' onClick={e => handleAttempt(e)}/>
          }
        </div>
      </div>
      <canvas id='chart'></canvas>
    </div>
  );
}

export default Stats;