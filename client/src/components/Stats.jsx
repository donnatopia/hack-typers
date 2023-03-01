import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Stats = ({ wpm, timeElapsed, words, prompt, user }) => {
  // toggling between adding and deleting attempt
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState({});
  const [attemptNumber, setAttemptNumber] = useState(0);

  // chart element
  const [chart, setChart] = useState(null);

  // chart colors
  let borderColors = {
    standard: '#BB86FC',
    upward: '#00FF00',
    downward: '#FF4136',
    equal: '#FFDD00'
  }

  const [borderKey, setBorderKey] = useState(trend);
  const [trend, setTrend] = useState(borderColors[borderKey]);

  useEffect(() => {
    setTrend(borderColors[borderKey]);
  }, [borderKey]);

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
        const labels = [];
        const wpms = [];

        data.forEach((attempt, index) => {
          labels.push(index);
          wpms.push(attempt.wpm);
        });

        if (attemptNumber === 0) {
          setAttemptNumber(data.length);
        }

        // determine of color of chartline if save attempt
        if (alreadyAdded) {
          const latestWpm = data[data.length - 1].wpm;
          const prevWpm = data[data.length - 2].wpm;
          const diff = latestWpm - prevWpm;
          if (diff > 0) {
            setBorderKey('upward');
          } else if (diff < 0) {
            setBorderKey('downward');
          } else {
            setBorderKey('equal');
          }
        } else {
          setBorderKey('standard');
        }

        const points = {
          labels: labels,
          datasets: [
            {
              label: 'wpm',
              data: wpms,
              borderColor: borderColors.standard,
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
      })
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
          <p>Attempt #{ attemptNumber }{ alreadyAdded ? ' ' : ' NOT '}Added</p>
          <button id='attempt-button' onClick={e => handleAttempt(e) }>
            { alreadyAdded ? 'Undo' : 'Submit' }
          </button>
        </div>
      </div>
      <canvas id='chart'></canvas>
    </div>
  );
}

export default Stats;