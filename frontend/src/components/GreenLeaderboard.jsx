import React from 'react';

const GreenLeaderboard = ({ leaderboard }) => {
  return (
    <div>
      <h2>Green Leaderboard</h2>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry.userId}>
            {entry.name}: {entry.carbonFootprint} kg CO2
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GreenLeaderboard;
