// MarkerCard.jsx
import React, { useEffect, useState } from 'react';
import { tagOptions } from '../../config/tagOptions';
import { sanitizeText, sanitizeUrl, sanitizeEmail, sanitizeNumber, sanitizeStyle } from '../../utils/sanitize';

// Helper function to get tag label from value
const getTagLabel = (tagValue) => {
    // If it's already an object with a label, return it
    if (tagValue && typeof tagValue === 'object' && tagValue.label) {
        return sanitizeText(tagValue.label);
    }
    
    // Find the tag in tagOptions
    const tag = tagOptions.find(t => t.value === tagValue);
    const labelText = sanitizeText(tag ? tag.label : tagValue); // Fall back to the value if not found
    
    // Simple HTML entity decoder for apostrophes and other common entities
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = labelText;
    return tempDiv.textContent;
};

// Helper function to format the verification date
const formatVerificationDate = (timestamp) => {
    if (!timestamp) return null;
    
    const date = new Date(timestamp);
    // Check if date is valid
    if (isNaN(date.getTime())) return null;
    
    return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};

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
    
    // Sanitize all marker data
    const safeMarker = {
        name: sanitizeText(marker.name, 'Unknown Gym'),
        address: sanitizeText(marker.address, 'No address available'),
        website: marker.website ? sanitizeUrl(marker.website, '#') : '#',
        email: marker.email ? sanitizeEmail(marker.email) : null,
        instagram: sanitizeText(marker.instagram, ''),
        dropInFee: sanitizeNumber(marker.dropInFee, 0),
        monthlyRate: sanitizeNumber(marker.monthlyRate, 0),
        rating: sanitizeNumber(marker.rating, 0),
        gymType: sanitizeText(marker.gymType, 'Other'),
        usawClub: !!marker.usawClub,
        tags: Array.isArray(marker.tags) ? marker.tags : [],
        created: marker.created || null,
        updated: marker.updated || null,
        isUserGym: !!marker.isUserGym,
        athleteCount: marker.athleteCount || 0
    };

    // Determine verification status
    const createdDate = safeMarker.created ? new Date(safeMarker.created) : null;
    const updatedDate = safeMarker.updated ? new Date(safeMarker.updated) : null;
    
    // Get the most recent timestamp
    let verificationDate = null;
    if (createdDate && updatedDate) {
        verificationDate = createdDate > updatedDate ? createdDate : updatedDate;
    } else if (createdDate) {
        verificationDate = createdDate;
    } else if (updatedDate) {
        verificationDate = updatedDate;
    }
    
    // Format the verification date
    const formattedVerificationDate = formatVerificationDate(verificationDate);
    const isVerified = !!formattedVerificationDate;
    
    const website = safeMarker.website;
    const ctaLink = safeMarker.email ? `mailto:${safeMarker.email}` : website;
    const ratingPercentage = safeMarker.rating ? (safeMarker.rating / 5) * 100 : 0;

    // Theme-aware styling with more subtle user gym styling
    const cardClasses = `${isMobile 
        ? "p-3 rounded-lg shadow-sm max-w-full transition-all duration-200 border" 
        : "p-5 rounded-lg shadow-lg max-w-xs transition-all duration-200 border hover:shadow-xl"} ${
        isDarkMode 
            ? "bg-gray-800 border-gray-700 text-white" 
            : "bg-white border-gray-100 text-gray-900"
    } ${
        safeMarker.isUserGym 
            ? isDarkMode 
                ? "border-l-4 border-l-green-600" 
                : "border-l-4 border-l-green-500"
            : ""
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

    // Define verification badge styles
    const verificationBadgeClasses = `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
        isVerified 
            ? (isDarkMode 
                ? "bg-blue-900 text-blue-300 ring-1 ring-inset ring-blue-700/30" 
                : "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10")
            : (isDarkMode 
                ? "bg-yellow-900 text-yellow-300 ring-1 ring-inset ring-yellow-700/30" 
                : "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-700/10")
    }`;

    return (
        <div className={cardClasses}>
            {/* Header */}
            <div className={sectionClasses}>
                <div>
                    <h2 className={nameTextClasses} 
                        dangerouslySetInnerHTML={{ __html: safeMarker.name }}></h2>
                    <p className={addressTextClasses}
                        dangerouslySetInnerHTML={{ __html: safeMarker.address }}></p>
                    
                    {/* Add user gym indicator with more subtle styling */}
                    {safeMarker.isUserGym && (
                        <div className={`mt-1 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                            isDarkMode 
                                ? "bg-gray-700 text-green-300" 
                                : "bg-gray-50 text-green-700"
                        }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Your Home Gym
                        </div>
                    )}
                </div>
                <div className={verificationBadgeClasses}>
                    {isVerified ? (
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {isMobile ? "Updated" : `Updated: ${formattedVerificationDate}`}
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Unverified
                        </div>
                    )}
                </div>
            </div>
            
            {/* Add athlete count section */}
            {safeMarker.athleteCount > 0 && (
                <div className={isMobile ? "mb-2" : "mb-4"}>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className={`text-sm ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}>
                            {safeMarker.athleteCount} {safeMarker.athleteCount === 1 ? 'user trains' : 'users train'} here
                        </span>
                    </div>
                </div>
            )}
            
            {/* Price Section */}
            <div className={isMobile ? "mb-2" : "mb-4"}>
                <p className={labelClasses}>Pricing</p>
                <div className="flex space-x-2">
                    <div className={pricingItemClasses}>
                        <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Drop-in</p>
                        <p className={`${isMobile ? "text-base" : "text-lg"} font-bold ${isDarkMode ? "text-white" : "text-primary-950"}`}>${safeMarker.dropInFee}</p>
                    </div>
                    <div className={pricingItemClasses}>
                        <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Monthly</p>
                        <p className={`${isMobile ? "text-base" : "text-lg"} font-bold ${isDarkMode ? "text-white" : "text-primary-950"}`}>${safeMarker.monthlyRate}</p>
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
                            {safeMarker.website !== '#' ? safeMarker.website.replace(/^https?:\/\//, '') : 'Website unavailable'}
                        </a>
                    </p>
                    
                    {safeMarker.email && (
                        <p className="text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${safeMarker.email}`} className={linkClasses}>
                                {safeMarker.email}
                            </a>
                        </p>
                    )}
                    
                    {safeMarker.instagram && (
                        <p className="text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            </svg>
                            <a href={`https://www.instagram.com/${safeMarker.instagram}`} className={linkClasses} target="_blank" rel="noopener noreferrer">
                                @{safeMarker.instagram}
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
                    
                    {safeMarker.email && (
                        <a 
                            href={`mailto:${safeMarker.email}`} 
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
            {safeMarker.rating > 0 && (
                <div className={isMobile ? "mb-2" : "mb-4"}>
                    <p className={labelClasses}>Rating</p>
                    <div className="flex items-center">
                        <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg 
                                    key={star} 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`h-4 w-4 ${star <= Math.round(safeMarker.rating) ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium ${isDarkMode ? "text-gray-300" : ""}`}>{safeMarker.rating.toFixed(1)}</span>
                    </div>
                </div>
            )}
            
            {/* Tags */}
            <div className={isMobile ? "mb-2" : "mb-4"}>
                <p className={labelClasses}>Features</p>
                <div className="flex flex-wrap gap-1">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        isDarkMode 
                            ? "bg-blue-900 text-blue-300 ring-1 ring-inset ring-blue-700/30" 
                            : "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    }`}>
                        {safeMarker.gymType} 💪
                    </span>
                    {safeMarker.usawClub && (
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            isDarkMode 
                                ? "bg-red-900 text-red-300 ring-1 ring-inset ring-red-700/30" 
                                : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-700/10"
                        }`}>
                            USAW Club 🇺🇸
                        </span>
                    )}
                    {safeMarker.tags && safeMarker.tags.map((tag, index) => {
                        // For mobile, limit to first 2 tags to save space
                        if (isMobile && index > 1) return null;
                        
                        return (
                            <span key={index} className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                isDarkMode 
                                    ? "bg-gray-700 text-gray-300 ring-1 ring-inset ring-gray-500/30" 
                                    : "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                            }`}>
                                {getTagLabel(tag)}
                            </span>
                        );
                    })}
                    {/* Show count of hidden tags on mobile if there are more than 2 */}
                    {isMobile && safeMarker.tags && safeMarker.tags.length > 2 && (
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            isDarkMode 
                                ? "bg-gray-700 text-gray-400" 
                                : "bg-gray-50 text-gray-500"
                        }`}>
                            +{safeMarker.tags.length - 2} more
                        </span>
                    )}
                </div>
            </div>
            
            {/* CTA */}
            <a 
                href={ctaLink}
                className={buttonClasses}
                target={safeMarker.email ? undefined : "_blank"}
                rel={safeMarker.email ? undefined : "noopener noreferrer"}
            >
                {safeMarker.email ? "Contact via Email" : "Visit Website"}
            </a>
        </div>
    );
};

export default MarkerCard;
