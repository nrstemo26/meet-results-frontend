// FilterForm.jsx
import React from 'react';
import Select from 'react-select';
import { tagOptions } from '../../config/tagOptions';

const gymTypeOptions = [
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
    const handleSelectChange = (selectedOption, { name }) => {
        onFilterChange({ target: { name, value: selectedOption ? selectedOption.value : '' } });
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        onTagsChange(selectedOptions);
    };

    return (
        <form className="space-y-4 p-4 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gym Type
                </label>
                <Select
                    name="gymType"
                    value={gymTypeOptions.find(option => option.value === filters.gymType)}
                    options={gymTypeOptions}
                    onChange={handleSelectChange}
                    className="mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Monthly Rate
                </label>
                <div className="flex items-center justify-between">
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
                    className="w-full mt-1"
                />
                <span className="block text-xs text-gray-500 font-mono mt-1 text-center">{formatCurrency(filters.maxMonthlyRate)}</span>
            </div>
            <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                    Max Drop-In Rate
                </label>
                <div className="flex items-center justify-between">
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
                    className="w-full mt-1"
                />
                <span className="block text-xs text-gray-500 font-mono mt-1 text-center">{formatCurrency(filters.maxDropInRate)}</span>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    USAW Club
                </label>
                <Select
                    name="usawClub"
                    value={usawClubOptions.find(option => option.value === filters.usawClub)}
                    options={usawClubOptions}
                    onChange={handleSelectChange}
                    className="mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                </label>
                <Select
                    name="tags"
                    value={filters.tags.map(tag => tagOptions.find(option => option.value === tag))}
                    options={tagOptions}
                    isMulti
                    onChange={handleMultiSelectChange}
                    className="mt-1"
                />
            </div>
        </form>
    );
};

export default FilterForm;
