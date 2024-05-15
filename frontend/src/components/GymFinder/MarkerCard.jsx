// MarkerCard.jsx
import React from 'react';


const MarkerCard = ({ marker }) => {
    const website = `https://${marker.website}`
    console.log(marker)
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
      <h2 className="text-lg font-semibold mb-1 text-primary-950">{marker.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{marker.address}</p>
      <div className="mb-1 grid grid-cols-2 gap-2 justify-items-center">
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10"><span className="font-mono mr-1">${marker.dropInFee}</span> Drop-in 💸</span>
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10"><span className="font-mono mr-1">${marker.monthlyRate}</span> Monthly 💳</span>
      </div>
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
      {marker.rating && (
        <p className="text-sm text-gray-600 mb-1"><strong>Google Rating:</strong> <span className="font-mono">{marker.rating}/5</span></p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10">
          {marker.gymType} 💪
        </span>
        {marker.usawClub && (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-500/10">
            USAW Club 🇺🇸
          </span>
        )}
        {marker.tags && marker.tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarkerCard;
