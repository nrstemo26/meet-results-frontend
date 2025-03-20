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

const FilterForm = ({ filters, onFilterChange, onTagsChange, ranges }) => {
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
            borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
            boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? '#1e293b' 
                : state.isFocused 
                    ? '#f1f5f9' 
                    : null,
            color: state.isSelected ? 'white' : '#334155',
            '&:active': {
                backgroundColor: '#1e293b'
            }
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#f1f5f9'
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#334155'
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            '&:hover': {
                backgroundColor: '#e2e8f0',
                color: '#ef4444'
            }
        })
    };

    return (
        <form className="space-y-2 p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-4">Filters</h3>
            
            {/* Gym Type */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <h4 className="text-sm font-medium text-gray-700">Pricing</h4>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isExpanded.pricing ? 'transform rotate-180' : ''}`} 
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
                                <label className="block text-xs font-medium text-gray-700">
                                    Max Monthly Rate
                                </label>
                                <span className="text-xs text-primary-950 font-semibold bg-gray-100 px-2 py-1 rounded">
                                    {formatCurrency(filters.maxMonthlyRate)}
                                </span>
                            </div>
                            <div className="px-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-500 font-mono">{formatCurrency(ranges.minMonthlyRate)}</span>
                                    <span className="text-xs text-gray-500 font-mono">{formatCurrency(ranges.maxMonthlyRate)}</span>
                                </div>
                                <input 
                                    type="range" 
                                    name="maxMonthlyRate" 
                                    min={ranges.minMonthlyRate} 
                                    max={ranges.maxMonthlyRate} 
                                    step="5"
                                    value={filters.maxMonthlyRate} 
                                    onChange={onFilterChange} 
                                    className="w-full mt-1 accent-primary-950"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-medium text-gray-700">
                                    Max Drop-In Rate
                                </label>
                                <span className="text-xs text-primary-950 font-semibold bg-gray-100 px-2 py-1 rounded">
                                    {formatCurrency(filters.maxDropInRate)}
                                </span>
                            </div>
                            <div className="px-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-500 font-mono">{formatCurrency(ranges.minDropInRate)}</span>
                                    <span className="text-xs text-gray-500 font-mono">{formatCurrency(ranges.maxDropInRate)}</span>
                                </div>
                                <input 
                                    type="range" 
                                    name="maxDropInRate" 
                                    min={ranges.minDropInRate} 
                                    max={ranges.maxDropInRate}
                                    step="5"
                                    value={filters.maxDropInRate} 
                                    onChange={onFilterChange} 
                                    className="w-full mt-1 accent-primary-950"
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
                    <h4 className="text-sm font-medium text-gray-700">Features & Amenities</h4>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isExpanded.features ? 'transform rotate-180' : ''}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                
                {isExpanded.features && (
                    <>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
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
                            <label className="block text-xs font-medium text-gray-700 mb-2">
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
