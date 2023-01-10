import React, { useState, useEffect } from 'react';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      // Make a GET request to the json server to retrieve the history of played videos/MP3s
      // and update the history state
      const response = await fetch('http://localhost:3000/history');
      const data = await response.json();
      setHistory(data);
    }
    fetchHistory();
  }, []);

  return (
    <div>
      <h1>History</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Played At</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.link}</td>
              <td>{entry.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
