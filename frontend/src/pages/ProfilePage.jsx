import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/api';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile();
      setUserProfile(profile);
    };

    getUserProfile();
  }, []);

  return (
    <div>
      <h1>Your Profile</h1>
      {userProfile && (
        <div>
          <h2>{userProfile.name}</h2>
          <p>Email: {userProfile.email}</p>
          <p>Total Carbon Footprint: {userProfile.totalCarbonFootprint} kg CO2</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
