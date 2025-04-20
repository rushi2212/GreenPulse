import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/api";
import trophy from "../public/trophy.png"
import trophy2 from "../public/trophy2.png";
import trophy3 from "../public/trophy3.png"

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

        const userRankIndex = data.findIndex(
          (entry) => entry._id === currentUserId
        );
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
    if (rank === 1)
      return (
        <img
          src={trophy}
          alt="1st Place"
          className="h-6 w-6 sm:h-8 sm:w-8"
        />
      );
    if (rank === 2)
      return (
        <img
          src={trophy2}
          alt="2nd Place"
          className="h-6 w-6 sm:h-8 sm:w-8"
        />
      );
    if (rank === 3)
      return (
        <img
          src={trophy3}
          alt="3rd Place"
          className="h-6 w-6 sm:h-8 sm:w-8"
        />
      );
    return <span className="text-gray-600 font-bold">{rank}</span>;
  };

  const getRowClassName = (entry) => {
    if (entry._id === currentUserId) return "bg-green-100 font-bold";
    return entry.rank <= 3 ? "bg-green-50" : "";
  };

  const calculateComparisonPercentage = (value) => {
    const average =
      leaderboard.reduce((sum, entry) => sum + entry.carbonFootprint, 0) /
      leaderboard.length;
    return (((value - average) / average) * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <p className="text-green-700">Loading leaderboard data...</p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-4 mb-4 sm:mt-6 sm:mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 flex items-center">
          <span className="mr-2">🌿</span> Green Leaderboard
        </h2>
        {currentUserRank && (
          <div className="bg-green-50 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-green-800 border border-green-200 text-sm sm:text-base">
            Your Rank: <span className="font-bold">{currentUserRank}</span> of{" "}
            {leaderboard.length}
          </div>
        )}
      </div>

      {/* Top 3 showcase */}
      {leaderboard.length > 0 && (
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {leaderboard.length > 1 && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 sm:mb-2 border-2 border-gray-300">
                <img
                  src={trophy2}
                  alt="2nd"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-xs sm:text-base truncate max-w-16 sm:max-w-full">
                  {leaderboard[1].name}
                </p>
                <p className="text-green-600 font-bold text-xs sm:text-base">
                  {leaderboard[1].carbonFootprint.toFixed(2)} kg
                </p>
              </div>
            </div>
          )}

          {leaderboard.length > 0 && (
            <div className="flex flex-col items-center transform scale-110">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-yellow-50 flex items-center justify-center mb-1 sm:mb-2 border-2 border-yellow-300 shadow-md">
                <img
                  src={trophy}
                  alt="1st"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm sm:text-lg truncate max-w-20 sm:max-w-full">
                  {leaderboard[0].name}
                </p>
                <p className="text-green-600 font-bold text-sm sm:text-lg">
                  {leaderboard[0].carbonFootprint.toFixed(2)} kg
                </p>
              </div>
            </div>
          )}

          {leaderboard.length > 2 && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-50 flex items-center justify-center mb-1 sm:mb-2 border-2 border-amber-200">
                <img
                  src={trophy3}
                  alt="3rd"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-xs sm:text-base truncate max-w-16 sm:max-w-full">
                  {leaderboard[2].name}
                </p>
                <p className="text-green-600 font-bold text-xs sm:text-base">
                  {leaderboard[2].carbonFootprint.toFixed(2)} kg
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto rounded-lg border border-green-200 shadow">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-base">
                Rank
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-base">
                Name
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-base">
                CO₂ Saved
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right hidden sm:table-cell text-xs sm:text-base">
                vs Avg
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => {
              const comparison = calculateComparisonPercentage(
                entry.carbonFootprint
              );
              const isCurrentUser = entry._id === currentUserId;

              return (
                <tr
                  key={entry._id}
                  className={`${getRowClassName(entry)} ${
                    isCurrentUser ? "border-l-4 border-green-500" : ""
                  } hover:bg-green-50 transition-colors`}
                >
                  <td className="border-b border-green-100 px-2 sm:px-4 py-2 sm:py-3 flex items-center text-xs sm:text-base">
                    <div className="mr-1 sm:mr-2">{getRankIcon(index + 1)}</div>
                  </td>
                  <td className="border-b border-green-100 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-base max-w-24 sm:max-w-full truncate">
                    {isCurrentUser ? (
                      <span className="font-bold text-green-700">
                        {entry.name} <span className="text-xs">(You)</span>
                      </span>
                    ) : (
                      entry.name
                    )}
                  </td>
                  <td className="border-b border-green-100 px-2 sm:px-4 py-2 sm:py-3 text-right font-mono text-xs sm:text-base">
                    {entry.carbonFootprint.toFixed(2)}
                  </td>
                  <td className="border-b border-green-100 px-2 sm:px-4 py-2 sm:py-3 text-right hidden sm:table-cell text-xs sm:text-base">
                    <span
                      className={
                        comparison > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {comparison > 0 ? "+" : ""}
                      {comparison}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center">
          <p className="text-xxs sm:text-xs text-green-600">
            Total Participants
          </p>
          <p className="text-lg sm:text-xl font-bold">{leaderboard.length}</p>
        </div>
        <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center">
          <p className="text-xxs sm:text-xs text-green-600">Total CO₂ Saved</p>
          <p className="text-lg sm:text-xl font-bold">
            {leaderboard
              .reduce((sum, entry) => sum + entry.carbonFootprint, 0)
              .toFixed(1)}{" "}
            kg
          </p>
        </div>
        <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center">
          <p className="text-xxs sm:text-xs text-green-600">Average Savings</p>
          <p className="text-lg sm:text-xl font-bold">
            {(
              leaderboard.reduce(
                (sum, entry) => sum + entry.carbonFootprint,
                0
              ) / Math.max(1, leaderboard.length)
            ).toFixed(1)}{" "}
            kg
          </p>
        </div>
        <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center">
          <p className="text-xxs sm:text-xs text-green-600">Top Saver</p>
          <p className="text-lg sm:text-xl font-bold">
            {leaderboard.length > 0
              ? leaderboard[0].carbonFootprint.toFixed(1)
              : "0.0"}{" "}
            kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default GreenLeaderboard;
