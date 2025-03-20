// MarkerCard.jsx
import React from 'react';

const MarkerCard = ({ marker, isMobile }) => {
    const website = marker.website ? (marker.website.startsWith('http') ? marker.website : `https://${marker.website}`) : '#';
    const ctaLink = marker.email ? `mailto:${marker.email}` : website;
    const ratingPercentage = marker.rating ? (marker.rating / 5) * 100 : 0;

    // Mobile-optimized card classes
    const cardClasses = isMobile 
        ? "p-3 bg-white rounded-lg shadow-sm max-w-full transition-all duration-200 border border-gray-100"
        : "p-5 bg-white rounded-lg shadow-lg max-w-xs transition-all duration-200 border border-gray-100 hover:shadow-xl";
    
    const sectionClasses = isMobile 
        ? "mb-2 pb-2 border-b border-gray-100"
        : "mb-3 pb-3 border-b border-gray-100";
    
    // For mobile, make the pricing items more compact
    const pricingItemClasses = isMobile 
        ? "flex-1 bg-green-50 rounded-lg p-1 text-center"
        : "flex-1 bg-green-50 rounded-lg p-2 text-center";
    
    // For mobile, make text a bit smaller
    const nameTextClasses = isMobile 
        ? "text-base font-bold mb-0.5 text-primary-950"
        : "text-lg font-bold mb-1 text-primary-950";
    
    const addressTextClasses = isMobile 
        ? "text-xs text-gray-600"
        : "text-sm text-gray-600";

    return (
        <div className={cardClasses}>
            {/* Header */}
            <div className={sectionClasses}>
                <h2 className={nameTextClasses}>{marker.name}</h2>
                <p className={addressTextClasses}>{marker.address}</p>
            </div>
            
            {/* Price Section */}
            <div className={isMobile ? "mb-2" : "mb-4"}>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Pricing</p>
                <div className="flex space-x-2">
                    <div className={pricingItemClasses}>
                        <p className="text-xs text-gray-500">Drop-in</p>
                        <p className={isMobile ? "text-base font-bold text-primary-950" : "text-lg font-bold text-primary-950"}>${marker.dropInFee}</p>
                    </div>
                    <div className={pricingItemClasses}>
                        <p className="text-xs text-gray-500">Monthly</p>
                        <p className={isMobile ? "text-base font-bold text-primary-950" : "text-lg font-bold text-primary-950"}>${marker.monthlyRate}</p>
                    </div>
                </div>
            </div>
            
            {/* Contact Section - Simplified for mobile */}
            {!isMobile && (
                <div className="mb-4 space-y-2">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Contact</p>
                    <p className="text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                        </svg>
                        <a href={website} className="text-blue-600 hover:text-blue-800 truncate hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                            {marker.website || 'Website unavailable'}
                        </a>
                    </p>
                    
                    {marker.email && (
                        <p className="text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${marker.email}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                {marker.email}
                            </a>
                        </p>
                    )}
                    
                    {marker.instagram && (
                        <p className="text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            </svg>
                            <a href={`https://www.instagram.com/${marker.instagram}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                                @{marker.instagram}
                            </a>
                        </p>
                    )}
                </div>
            )}

            {/* Simplified contact for mobile */}
            {isMobile && (
                <div className="mb-2 flex space-x-2 justify-center">
                    <a 
                        href={website} 
                        className="text-blue-600 p-1 border border-blue-100 rounded-md flex items-center bg-blue-50" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                        </svg>
                        Website
                    </a>
                    
                    {marker.email && (
                        <a 
                            href={`mailto:${marker.email}`} 
                            className="text-blue-600 p-1 border border-blue-100 rounded-md flex items-center bg-blue-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                        </a>
                    )}
                </div>
            )}
            
            {/* Rating */}
            {marker.rating && (
                <div className={isMobile ? "mb-2" : "mb-4"}>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Rating</p>
                    <div className="flex items-center">
                        <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg 
                                    key={star} 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`h-4 w-4 ${star <= Math.round(marker.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className={isMobile ? "text-xs font-medium" : "text-sm font-medium"}>{marker.rating.toFixed(1)}</span>
                    </div>
                </div>
            )}
            
            {/* Tags - Simplified for mobile */}
            <div className={isMobile ? "mb-2" : "mb-4"}>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Features</p>
                <div className="flex flex-wrap gap-1">
                    <span className={`inline-flex items-center rounded-md bg-blue-50 px-2 py-1 ${isMobile ? 'text-xs' : 'text-xs'} font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10`}>
                        {marker.gymType} 💪
                    </span>
                    {marker.usawClub && (
                        <span className={`inline-flex items-center rounded-md bg-red-50 px-2 py-1 ${isMobile ? 'text-xs' : 'text-xs'} font-medium text-red-700 ring-1 ring-inset ring-red-700/10`}>
                            USAW Club 🇺🇸
                        </span>
                    )}
                    {marker.tags && !isMobile && marker.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {tag.label}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* CTA Button - Full version for desktop */}
            {!isMobile && (
                <div>
                    <a
                        href={ctaLink}
                        target={marker.email ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-950 hover:bg-primary-700 transition-colors shadow-sm"
                    >
                        Train Here
                    </a>
                </div>
            )}

            {/* CTA Button - Condensed version for mobile */}
            {isMobile && (
                <div className="mt-2">
                    <a
                        href={ctaLink}
                        target={marker.email ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full py-1.5 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary-950 hover:bg-primary-700 transition-colors shadow-sm"
                    >
                        Train Here
                    </a>
                </div>
            )}
        </div>
    );
};

export default MarkerCard;
