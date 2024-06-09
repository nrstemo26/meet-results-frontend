// MarkerCard.jsx
import React from 'react';


const MarkerCard = ({ marker }) => {
    const website = `https://${marker.website}`
    const ctaLink = marker.email ? `mailto:${marker.email}` : website;
    const ratingPercentage = (marker.rating / 5) * 100;

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
          <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1"><strong>Google Rating:</strong> <span className="font-mono">{marker.rating}</span></p>
              <div className="relative h-3 rounded-full overflow-hidden bg-gray-300">
                  <div
                      className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-950"
                      style={{ width: `${ratingPercentage}%` }}
                  ></div>
              </div>
          </div>
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
      <div className="mt-4">
          <a
              href={ctaLink}
              target={marker.email ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-950 hover:bg-primary-500"
          >
              Train Here
          </a>
      </div>
    </div>
  );
};

export default MarkerCard;
