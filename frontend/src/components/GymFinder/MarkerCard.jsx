// MarkerCard.jsx
import React, { useEffect, useState } from 'react';

const MarkerCard = ({ marker, isMobile }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // Listen for theme changes
    useEffect(() => {
        const checkTheme = () => {
            const savedTheme = localStorage.getItem('mapThemePreference');
            setIsDarkMode(savedTheme === 'dark');
        };
        
        // Initial check
        checkTheme();
        
        // Listen for storage events (in case theme is changed in another tab)
        window.addEventListener('storage', checkTheme);
        
        return () => {
            window.removeEventListener('storage', checkTheme);
        };
    }, []);
    
    const website = marker.website ? (marker.website.startsWith('http') ? marker.website : `https://${marker.website}`) : '#';
    const ctaLink = marker.email ? `mailto:${marker.email}` : website;
    const ratingPercentage = marker.rating ? (marker.rating / 5) * 100 : 0;

    // Theme-aware styling
    const cardClasses = `${isMobile 
        ? "p-3 rounded-lg shadow-sm max-w-full transition-all duration-200 border" 
        : "p-5 rounded-lg shadow-lg max-w-xs transition-all duration-200 border hover:shadow-xl"} ${
        isDarkMode 
            ? "bg-gray-800 border-gray-700 text-white" 
            : "bg-white border-gray-100 text-gray-900"
    }`;
    
    const sectionClasses = `${isMobile 
        ? "mb-2 pb-2 border-b" 
        : "mb-3 pb-3 border-b"} ${
        isDarkMode 
            ? "border-gray-700" 
            : "border-gray-100"
    }`;
    
    // For mobile, make the pricing items more compact
    const pricingItemClasses = `${isMobile 
        ? "flex-1 rounded-lg p-1 text-center" 
        : "flex-1 rounded-lg p-2 text-center"} ${
        isDarkMode 
            ? "bg-primary-900" 
            : "bg-green-50"
    }`;
    
    // Text classes based on theme
    const nameTextClasses = `${isMobile 
        ? "text-base font-bold mb-0.5" 
        : "text-lg font-bold mb-1"} ${
        isDarkMode 
            ? "text-white" 
            : "text-primary-950"
    }`;
    
    const addressTextClasses = `${isMobile 
        ? "text-xs" 
        : "text-sm"} ${
        isDarkMode 
            ? "text-gray-300" 
            : "text-gray-600"
    }`;
    
    const labelClasses = `text-xs uppercase tracking-wider mb-1 font-medium ${
        isDarkMode 
            ? "text-gray-400" 
            : "text-gray-500"
    }`;
    
    const linkClasses = `${
        isDarkMode 
            ? "text-blue-400 hover:text-blue-300 border-blue-800 bg-blue-900" 
            : "text-blue-600 hover:text-blue-800 border-blue-100 bg-blue-50"
    } hover:underline transition-colors`;
    
    const buttonClasses = `inline-flex items-center justify-center w-full py-${isMobile ? "1.5" : "2"} px-${isMobile ? "3" : "4"} border border-transparent text-sm font-medium rounded-md text-white ${
        isDarkMode 
            ? "bg-primary-700 hover:bg-primary-600" 
            : "bg-primary-950 hover:bg-primary-700"
    } transition-colors shadow-sm`;

    return (
        <div className={cardClasses}>
            {/* Header */}
            <div className={sectionClasses}>
                <h2 className={nameTextClasses}>{marker.name}</h2>
                <p className={addressTextClasses}>{marker.address}</p>
            </div>
            
            {/* Price Section */}
            <div className={isMobile ? "mb-2" : "mb-4"}>
                <p className={labelClasses}>Pricing</p>
                <div className="flex space-x-2">
                    <div className={pricingItemClasses}>
                        <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Drop-in</p>
                        <p className={`${isMobile ? "text-base" : "text-lg"} font-bold ${isDarkMode ? "text-white" : "text-primary-950"}`}>${marker.dropInFee}</p>
                    </div>
                    <div className={pricingItemClasses}>
                        <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Monthly</p>
                        <p className={`${isMobile ? "text-base" : "text-lg"} font-bold ${isDarkMode ? "text-white" : "text-primary-950"}`}>${marker.monthlyRate}</p>
                    </div>
                </div>
            </div>
            
            {/* Contact Section - Simplified for mobile */}
            {!isMobile && (
                <div className="mb-4 space-y-2">
                    <p className={labelClasses}>Contact</p>
                    <p className="text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                        </svg>
                        <a href={website} className={`${linkClasses} truncate`} target="_blank" rel="noopener noreferrer">
                            {marker.website || 'Website unavailable'}
                        </a>
                    </p>
                    
                    {marker.email && (
                        <p className="text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${marker.email}`} className={linkClasses}>
                                {marker.email}
                            </a>
                        </p>
                    )}
                    
                    {marker.instagram && (
                        <p className="text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            </svg>
                            <a href={`https://www.instagram.com/${marker.instagram}`} className={linkClasses} target="_blank" rel="noopener noreferrer">
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
                        className={`p-1 rounded-md flex items-center ${isDarkMode ? "bg-gray-700 border-gray-600 text-blue-300" : "bg-blue-50 border-blue-100 text-blue-600"} border`} 
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
                            className={`p-1 rounded-md flex items-center ${isDarkMode ? "bg-gray-700 border-gray-600 text-blue-300" : "bg-blue-50 border-blue-100 text-blue-600"} border`}
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
                    <p className={labelClasses}>Rating</p>
                    <div className="flex items-center">
                        <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg 
                                    key={star} 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`h-4 w-4 ${star <= Math.round(marker.rating) ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium ${isDarkMode ? "text-gray-300" : ""}`}>{marker.rating.toFixed(1)}</span>
                    </div>
                </div>
            )}
            
            {/* Tags - Simplified for mobile */}
            <div className={isMobile ? "mb-2" : "mb-4"}>
                <p className={labelClasses}>Features</p>
                <div className="flex flex-wrap gap-1">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        isDarkMode 
                            ? "bg-blue-900 text-blue-300 ring-1 ring-inset ring-blue-700/30" 
                            : "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    }`}>
                        {marker.gymType} 💪
                    </span>
                    {marker.usawClub && (
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            isDarkMode 
                                ? "bg-red-900 text-red-300 ring-1 ring-inset ring-red-700/30" 
                                : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-700/10"
                        }`}>
                            USAW Club 🇺🇸
                        </span>
                    )}
                    {marker.tags && !isMobile && marker.tags.map((tag, index) => (
                        <span key={index} className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            isDarkMode 
                                ? "bg-gray-700 text-gray-300 ring-1 ring-inset ring-gray-500/30" 
                                : "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        }`}>
                            {tag.label || tag}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* CTA Button */}
            <div className={isMobile ? "mt-2" : ""}>
                <a
                    href={ctaLink}
                    target={marker.email ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={buttonClasses}
                >
                    Train Here
                </a>
            </div>
        </div>
    );
};

export default MarkerCard;
