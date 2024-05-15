// MarkerCard.jsx
import React from 'react';

const MarkerCard = ({ marker }) => {
    const website = `https://${marker.website}`
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
      <h2 className="text-lg font-semibold mb-1 text-primary-950">{marker.name} {marker.usawClub ? '🇺🇸🏋️‍♂️' : ''}</h2>
      <p className="text-sm text-gray-600 mb-2">{marker.address}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Gym Type:</strong> {marker.gymType}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Drop-in Fee:</strong> ${marker.dropInFee}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Monthly Rate:</strong> ${marker.monthlyRate}</p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Website:</strong> <a href={website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{marker.website}</a>
      </p>
      {marker.email && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Email:</strong> <a href={`mailto:${marker.email}`} className="text-blue-500">{marker.email}</a>
        </p>
      )}
      {marker.instagram && (
        <>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Instagram:</strong> <a href={`https://www.instagram.com/${marker.instagram}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">@{marker.instagram}</a>
          </p>
          {/* <div dangerouslySetInnerHTML={{ __html: `<iframe src="https://embedsocial.com/api/embed/${marker.instagram}" width="100%" height="400px" frameborder="0"></iframe>` }} /> */}
        </>
      )}
      
    </div>
  );
};

export default MarkerCard;
