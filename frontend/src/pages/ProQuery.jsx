import React, { useState, useEffect } from 'react';

const ResultsFilterForm = () => {
  const [filters, setFilters] = useState({
    gender: [],
    weightClass: [],
    year: [],
    meetType: [],
    ageGroup: [],
    category: []
  });
  const [options, setOptions] = useState({
    genderOptions: [],
    weightClassOptions: [],
    yearOptions: [],
    meetTypeOptions: [],
    ageGroupOptions: [],
    categoryOptions: []
  });

  // Sample JSON data (this will be replaced by your API call)
  const jsonOptions = {
    genderOptions: ['Male', 'Female'],
    weightClassOptions: [
        '30',
        '32',
        '33',
        '36',
        '39',
        '40',
        '44',
        '45',
        '48',
        '49',
        '50',
        '53',
        '55',
        '56',
        '58',
        '59',
        '61',
        '62',
        '63',
        '64',
        '67',
        '69',
        '71',
        '73',
        '75',
        '76',
        '77',
        '81',
        '85',
        '87',
        '89',
        '90',
        '94',
        '96',
        '102',
        '105',
        '109',
        '+58',
        '+64',
        '+69',
        '+73',
        '+75',
        '+76',
        '+81',
        '+87',
        '+89',
        '+90',
        '+102',
        '+105',
        '+109'],
    yearOptions: ['2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023'],
    meetTypeOptions: ['Local', 'National', 'International'],
    ageGroupOptions:['',
    '(35-39)',
    '(40-44)', 
    '(45-49)',
    '(50-54)', 
    '(55-59)',
    '(60-64)', 
    '(65-69)', 
    '(70-74)',
    '(75-79)',
    '(75+)',
    '(80+)'],
    categoryOptions:['Youth', 'Junior', 'Open', 'Masters']
  };

  
  // Function to handle updates (both from handleChange and removeFilter)
  const handleUpdate = (updatedFilters) => {
    setFilters(updatedFilters);

    // Trigger the API call or log to console for now
    console.log('Updated Filters:', updatedFilters);
    // triggerApiCall(updatedFilters); // Replace with actual API call logic
  };
  
  // Function to handle changes in the select boxes and log to console
  const handleChange = (event) => {
    const { name, options } = event.target;
    const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);

    handleUpdate({
      ...filters,
      [name]: selectedOptions,
    });
  };

  // Function to handle initial data fetch
  const handleInitialDataFetch = () => {
    console.log('Initial Data:', filters);
  };

  // Load options from JSON data
  useEffect(() => {
    setOptions(jsonOptions);
    handleInitialDataFetch();
  }, []);

  // Function to render options for a select
  const renderOptions = (optionList, filterCategory) => {
    if (!filters[filterCategory]) {
      console.error(`No filter found for category: ${filterCategory}`);
      return null; // or handle this case appropriately
    }
  
    return optionList.map((option, index) => {
      const isSelected = filters[filterCategory].includes(option.toLowerCase());
      return (
        <option 
          key={index} 
          value={option.toLowerCase()} 
          className="hover:bg-primary-950 hover:text-white"
          selected={isSelected}
        >
          {option}
        </option>
      );
    });
  };
  
  

  const removeFilter = (filterCategory, filterValue) => {
    handleUpdate({
      ...filters,
      [filterCategory]: filters[filterCategory].filter(value => value !== filterValue),
    });
  };

  // Function to render selected filters as badges
  const renderSelectedFilters = () => {
    return Object.entries(filters).flatMap(([category, selectedValues]) => {
      return selectedValues.map(value => (
        <span 
          key={`${category}-${value}`} 
          className="bg-primary-950 text-white rounded p-1 m-1 cursor-pointer text-xs hover:bg-primary-500"
          onClick={() => removeFilter(category, value)}
        >
          {value} <b className="font-bold">×</b>
        </span>
      ));
    });
  };

  return (
    <div className="w-full sm:w-1/3 p-6 bg-secondary-500 rounded-lg shadow-lg text-sm">
      <h1 className="text-center text-l text-primary-950 font-bold m-2 border-b border-primary-100">Query Filters</h1>
      <form className="flex flex-col gap-4 text-gray-900">
        {/* Gender Select */}
        <select className="border border-gray-300 hover:border-primary-950 rounded p-2" name="gender" multiple onChange={handleChange}>
          {renderOptions(options.genderOptions, 'gender')}
        </select>

        {/* Weight Class Select */}
        <select className="border border-gray-300 hover:border-primary-950 rounded p-2" name="weightClass" multiple onChange={handleChange}>
          {renderOptions(options.weightClassOptions, 'weightClass')}
        </select>

        {/* Category Select */}
        <select className="border border-gray-300 hover:border-primary-950 rounded p-2" name="category" multiple onChange={handleChange}>
          {renderOptions(options.categoryOptions, 'category')}
        </select>

        {/* Age Group Select */}
        <select className="border border-gray-300 hover:border-primary-950 rounded p-2" name="ageGroup" multiple onChange={handleChange}>
          {renderOptions(options.ageGroupOptions, 'ageGroup')}
        </select>

        {/* Year Select */}
        <select className="border border-gray-300 hover:border-primary-950 rounded p-2" name="year" multiple onChange={handleChange}>
          {renderOptions(options.yearOptions, 'year')}
        </select>

        {/* Meet Type Select */}
        <select className="border border-gray-300 hover:border-primary-950 rounded p-2" name="meetType" multiple onChange={handleChange}>
          {renderOptions(options.meetTypeOptions, 'meetType')}
        </select>
      </form>
      <div className="flex flex-wrap mt-4">
        {renderSelectedFilters()}
      </div>
    </div>
  );
};

export default ResultsFilterForm;
