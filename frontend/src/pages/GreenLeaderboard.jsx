import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/api";
import { Trophy, Medal, Award } from "lucide-react";

const GreenLeaderboard = ({ currentUserId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLeaderboard = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
        
        // Find current user's rank
        const userRankIndex = data.findIndex(entry => entry._id === currentUserId);
        if (userRankIndex !== -1) {
          setCurrentUserRank(userRankIndex + 1);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getLeaderboard();
  }, [currentUserId]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Medal className="text-amber-700" size={24} />;
    return <span className="font-bold text-gray-600">{rank}</span>;
  };

  const getRowClassName = (entry) => {
    if (entry._id === currentUserId) return "bg-green-100 font-bold";
    return entry.rank <= 3 ? "bg-green-50" : "";
  };

  // Calculate percentage improvement compared to average
  const calculateComparisonPercentage = (value) => {
    const average = leaderboard.reduce((sum, entry) => sum + entry.carbonFootprint, 0) / leaderboard.length;
    return ((value - average) / average * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <p className="text-green-700">Loading leaderboard data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 flex items-center">
          <span className="mr-2">🌿</span> Green Impact Leaderboard
        </h2>
        {currentUserRank && (
          <div className="bg-green-50 px-4 py-2 rounded-full text-green-800 border border-green-200">
            Your Rank: <span className="font-bold">{currentUserRank}</span> of {leaderboard.length}
          </div>
        )}
      </div>

      {/* Top 3 showcase */}
      {leaderboard.length > 0 && (
        <div className="flex justify-center gap-4 mb-8">
          {/* 2nd place */}
          {leaderboard.length > 1 && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 border-2 border-gray-300">
                <Medal size={32} className="text-gray-400" />
              </div>
              <div className="text-center">
                <p className="font-semibold">{leaderboard[1].name}</p>
                <p className="text-green-600 font-bold">{leaderboard[1].carbonFootprint.toFixed(2)} kg</p>
              </div>
            </div>
          )}

          {/* 1st place */}
          {leaderboard.length > 0 && (
            <div className="flex flex-col items-center transform scale-110">
              <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mb-2 border-2 border-yellow-300 shadow-md">
                <Trophy size={40} className="text-yellow-500" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{leaderboard[0].name}</p>
                <p className="text-green-600 font-bold text-lg">{leaderboard[0].carbonFootprint.toFixed(2)} kg</p>
              </div>
            </div>
          )}

          {/* 3rd place */}
          {leaderboard.length > 2 && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-2 border-2 border-amber-200">
                <Medal size={32} className="text-amber-700" />
              </div>
              <div className="text-center">
                <p className="font-semibold">{leaderboard[2].name}</p>
                <p className="text-green-600 font-bold">{leaderboard[2].carbonFootprint.toFixed(2)} kg</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full leaderboard table */}
      <div className="overflow-hidden rounded-lg border border-green-200 shadow">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-right">CO₂ Saved (kg)</th>
              <th className="px-4 py-3 text-right hidden md:table-cell">Compared to Avg</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => {
              const comparison = calculateComparisonPercentage(entry.carbonFootprint);
              const isCurrentUser = entry._id === currentUserId;
              
              return (
                <tr 
                  key={entry._id} 
                  className={`${getRowClassName(entry)} ${isCurrentUser ? "border-l-4 border-green-500" : ""} hover:bg-green-50 transition-colors`}
                >
                  <td className="border-b border-green-100 px-4 py-3 flex items-center">
                    <div className="mr-2">
                      {getRankIcon(index + 1)}
                    </div>
                    {/* <span className={isCurrentUser ? "text-green-700" : ""}>{index + 1}</span> */}
                  </td>
                  <td className="border-b border-green-100 px-4 py-3">
                    {isCurrentUser ? (
                      <span className="font-bold text-green-700">{entry.name} (You)</span>
                    ) : (
                      entry.name
                    )}
                  </td>
                  <td className="border-b border-green-100 px-4 py-3 text-right font-mono">
                    {entry.carbonFootprint.toFixed(2)}
                  </td>
                  <td className="border-b border-green-100 px-4 py-3 text-right hidden md:table-cell">
                    <span className={comparison > 0 ? "text-green-600" : "text-red-600"}>
                      {comparison > 0 ? "+" : ""}{comparison}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-xs text-green-600">Total Participants</p>
          <p className="text-xl font-bold">{leaderboard.length}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-xs text-green-600">Total CO₂ Saved</p>
          <p className="text-xl font-bold">
            {leaderboard.reduce((sum, entry) => sum + entry.carbonFootprint, 0).toFixed(2)} kg
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-xs text-green-600">Average Savings</p>
          <p className="text-xl font-bold">
            {(leaderboard.reduce((sum, entry) => sum + entry.carbonFootprint, 0) / Math.max(1, leaderboard.length)).toFixed(2)} kg
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-xs text-green-600">Top Saver</p>
          <p className="text-xl font-bold">
            {leaderboard.length > 0 ? leaderboard[0].carbonFootprint.toFixed(2) : "0.00"} kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default GreenLeaderboard;