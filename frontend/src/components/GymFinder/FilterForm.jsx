// FilterForm.jsx
import React from 'react';
import Select from 'react-select';

const gymTypeOptions = [
    { value: 'Weightlifting-only', label: 'Weightlifting-only' },
    { value: 'CrossFit', label: 'CrossFit' },
    { value: 'Globo-gym/Other', label: 'Globo-gym/Other' }
];

const usawClubOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];

const tagOptions = [
    { label: "Can't Drop Weights ❌", value: "cant_drop_weights" },
    { label: "Exquisite vibes 🤙🏼", value: "exquisite_vibes" },
    { label: "Nat'l Coach 🧠", value: "national_coach" },
    { label: "Kilo Plates 🧿", value: "kilo_plates" },
];

const FilterForm = ({ filters, onFilterChange, onTagsChange }) => {
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
                <input 
                    type="range" 
                    name="maxMonthlyRate" 
                    min="0" 
                    max="500" 
                    value={filters.maxMonthlyRate} 
                    onChange={onFilterChange} 
                    className="w-full mt-1"
                />
                <span className="block text-sm text-gray-500 mt-1">{filters.maxMonthlyRate}</span>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Drop-In Rate
                </label>
                <input 
                    type="range" 
                    name="maxDropInRate" 
                    min="0" 
                    max="100" 
                    value={filters.maxDropInRate} 
                    onChange={onFilterChange} 
                    className="w-full mt-1"
                />
                <span className="block text-sm text-gray-500 mt-1">{filters.maxDropInRate}</span>
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
