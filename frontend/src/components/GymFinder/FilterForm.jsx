// FilterForm.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import { tagOptions } from '../../config/tagOptions';

const gymTypeOptions = [
    { value: '', label: 'All Gym Types' },
    { value: 'Weightlifting-only', label: 'Weightlifting-only' },
    { value: 'CrossFit', label: 'CrossFit' },
    { value: 'Globo-gym/Other', label: 'Globo-gym/Other' }
];

const usawClubOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];

const formatCurrency = value => `$${Number(value).toFixed(0)}`;

const FilterForm = ({ filters, onFilterChange, onTagsChange, ranges, isDarkMode = false }) => {
    const [isExpanded, setIsExpanded] = useState({
        pricing: true,
        features: true
    });

    const toggleSection = (section) => {
        setIsExpanded(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    
    const handleSelectChange = (selectedOption, { name }) => {
        onFilterChange({ target: { name, value: selectedOption ? selectedOption.value : '' } });
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        onTagsChange(selectedOptions);
    };

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#1f2937' : 'white',
            borderColor: state.isFocused 
                ? isDarkMode ? '#3b82f6' : '#3b82f6' 
                : isDarkMode ? '#4b5563' : '#e5e7eb',
            boxShadow: state.isFocused ? `0 0 0 1px ${isDarkMode ? '#3b82f6' : '#3b82f6'}` : 'none',
            '&:hover': {
                borderColor: state.isFocused 
                    ? isDarkMode ? '#3b82f6' : '#3b82f6' 
                    : isDarkMode ? '#6b7280' : '#cbd5e1',
            },
            color: isDarkMode ? '#e5e7eb' : '#334155'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? isDarkMode ? '#2563eb' : '#1e293b'
                : state.isFocused 
                    ? isDarkMode ? '#374151' : '#f1f5f9'
                    : isDarkMode ? '#1f2937' : null,
            color: state.isSelected 
                ? 'white' 
                : isDarkMode ? '#e5e7eb' : '#334155',
            '&:active': {
                backgroundColor: isDarkMode ? '#3b82f6' : '#1e293b'
            }
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#1f2937' : 'white',
            borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
            boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' : provided.boxShadow
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#374151' : '#f1f5f9'
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: isDarkMode ? '#e5e7eb' : '#334155'
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            '&:hover': {
                backgroundColor: isDarkMode ? '#4b5563' : '#e2e8f0',
                color: isDarkMode ? '#f87171' : '#ef4444'
            }
        }),
        input: (provided) => ({
            ...provided,
            color: isDarkMode ? '#e5e7eb' : provided.color
        }),
        singleValue: (provided) => ({
            ...provided,
            color: isDarkMode ? '#e5e7eb' : provided.color
        })
    };

    return (
        <form className={`space-y-2 p-4 shadow-md rounded-lg border ${
            isDarkMode 
                ? 'bg-gray-800 text-gray-200 border-gray-700' 
                : 'bg-white text-gray-800 border-gray-200'
        }`}>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                isDarkMode ? 'text-gray-200' : 'text-primary-950'
            }`}>Filters</h3>
            
            {/* Gym Type */}
            <div className="mb-5">
                <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                    Gym Type
                </label>
                <Select
                    name="gymType"
                    value={gymTypeOptions.find(option => option.value === filters.gymType) || gymTypeOptions[0]}
                    options={gymTypeOptions}
                    onChange={handleSelectChange}
                    className="mt-1"
                    styles={customSelectStyles}
                    placeholder="Select gym type..."
                />
            </div>
            
            {/* Pricing Filters */}
            <div className="mb-5">
                <div 
                    className="flex justify-between items-center cursor-pointer mb-2" 
                    onClick={() => toggleSection('pricing')}
                >
                    <h4 className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Pricing</h4>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-400'
                        } ${isExpanded.pricing ? 'transform rotate-180' : ''}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                
                {isExpanded.pricing && (
                    <>
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <label className={`block text-xs font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    Max Monthly Rate
                                </label>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                    isDarkMode 
                                        ? 'text-blue-300 bg-gray-700' 
                                        : 'text-primary-950 bg-gray-100'
                                }`}>
                                    {formatCurrency(filters.maxMonthlyRate)}
                                </span>
                            </div>
                            <div className="px-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-xs font-mono ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>{formatCurrency(ranges.minMonthlyRate)}</span>
                                    <span className={`text-xs font-mono ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>{formatCurrency(ranges.maxMonthlyRate)}</span>
                                </div>
                                <input 
                                    type="range" 
                                    name="maxMonthlyRate" 
                                    min={ranges.minMonthlyRate} 
                                    max={ranges.maxMonthlyRate} 
                                    step="5"
                                    value={filters.maxMonthlyRate} 
                                    onChange={onFilterChange} 
                                    className={`w-full mt-1 ${
                                        isDarkMode ? 'accent-blue-500' : 'accent-primary-950'
                                    }`}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className={`block text-xs font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    Max Drop-In Rate
                                </label>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                    isDarkMode 
                                        ? 'text-blue-300 bg-gray-700' 
                                        : 'text-primary-950 bg-gray-100'
                                }`}>
                                    {formatCurrency(filters.maxDropInRate)}
                                </span>
                            </div>
                            <div className="px-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-xs font-mono ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>{formatCurrency(ranges.minDropInRate)}</span>
                                    <span className={`text-xs font-mono ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>{formatCurrency(ranges.maxDropInRate)}</span>
                                </div>
                                <input 
                                    type="range" 
                                    name="maxDropInRate" 
                                    min={ranges.minDropInRate} 
                                    max={ranges.maxDropInRate}
                                    step="5"
                                    value={filters.maxDropInRate} 
                                    onChange={onFilterChange} 
                                    className={`w-full mt-1 ${
                                        isDarkMode ? 'accent-blue-500' : 'accent-primary-950'
                                    }`}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            
            {/* Features */}
            <div className="mb-4">
                <div 
                    className="flex justify-between items-center cursor-pointer mb-2" 
                    onClick={() => toggleSection('features')}
                >
                    <h4 className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Features & Amenities</h4>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-400'
                        } ${isExpanded.features ? 'transform rotate-180' : ''}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                
                {isExpanded.features && (
                    <>
                        <div className="mb-4">
                            <label className={`block text-xs font-medium mb-2 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                USAW Club
                            </label>
                            <Select
                                name="usawClub"
                                value={usawClubOptions.find(option => option.value === filters.usawClub)}
                                options={usawClubOptions}
                                onChange={handleSelectChange}
                                className="mt-1"
                                styles={customSelectStyles}
                                placeholder="Select..."
                            />
                        </div>
                        
                        <div>
                            <label className={`block text-xs font-medium mb-2 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Gym Features
                            </label>
                            <Select
                                name="tags"
                                value={filters.tags.map(tag => tagOptions.find(option => option.value === tag))}
                                options={tagOptions}
                                isMulti
                                onChange={handleMultiSelectChange}
                                className="mt-1"
                                styles={customSelectStyles}
                                placeholder="Select features..."
                            />
                        </div>
                    </>
                )}
            </div>
        </form>
    );
};

export default FilterForm;
