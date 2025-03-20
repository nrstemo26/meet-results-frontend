import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '../../../pages/Spinners/Spinner';
import PaywallOverlay from '../../Widgets/PaywallOverlay'
import { baseUrl } from '../../../config';
import { toast } from 'react-toastify'

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

  // Sample JSON data (this will eventually be replaced by an API call retrieving unique menu options)
  const jsonOptions = {
    genderOptions: ["Men's", "Women's"],
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

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  const triggerApiCall = () => {

    setApiData(null);
    setIsLoading(true);

    // Construct query string from filters
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach(value => queryParams.append(key, value));
    });
  
    axios.get(`${baseUrl}/v1/query?${queryParams.toString()}`)
      .then(response => {
        console.log('API Response:', response.data);
        setApiData(response.data);
        // Handle your response here
      })
      .catch(error => {
        console.error('API Error:', error);
        const errorMessage = error.response ? error.response.data.message : error.message;
        toast.error(`Error: ${errorMessage}`);
      })
      .finally(() => {
        // Set isLoading to false when the API call is completed or if there's an error
        setIsLoading(false);
      });
  };  

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    triggerApiCall();
  };
  
  // Function to handle updates (both from handleChange and removeFilter)
  const handleUpdate = (updatedFilters) => {
    setFilters(updatedFilters);

    // Trigger the API call or log to console for now
    console.log('Updated Filters:', updatedFilters);
    
  };
  
  // Function to handle changes in the select boxes and log to console
  const handleChange = (event) => {
    const { name, options } = event.target;
    const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);

    handleUpdate({
      ...filters,
      [name]: selectedOptions, // This should aggregate selections
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

  // useEffect(() => {
  //   setOptions(jsonOptions); // Assuming jsonOptions is your predefined options state
  //   triggerApiCall(); // This will trigger the API call on component mount
  // }, []); // Empty dependency array ensures this effect runs once on mount

  // Function to render options for a select
  const renderOptions = (optionList, filterCategory) => {
    if (!filters[filterCategory]) {
      console.error(`No filter found for category: ${filterCategory}`);
      return null; // or handle this case appropriately
    }
  
    return optionList.map((option, index) => {
      return (
        <option 
          key={index} 
          value={option.toLowerCase()} 
          className="hover:bg-primary-950 hover:text-white"
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
    <div>
      <div className="flex justify-center">
        <div className="w-full lg:w-3/4 p-6 bg-secondary-500 rounded-lg shadow-lg text-sm">
          <h1 className="text-center text-l text-primary-950 font-bold m-2 border-b border-primary-100">Lift Oracle Custom Query</h1>
          <p className="text-center text-xs text-primary-500 mb-4">Use <strong>Ctrl</strong> (Windows) or <strong>Cmd</strong> (Mac) to select multiple filters in one category.</p>
          <form className="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-900">
              {/* Gender Select with Label */}
              <div>
                <label htmlFor="gender" className="block text-gray-700 text-xs font-semibold mb-2">Gender</label>
                <select id="gender" className="border border-gray-300 hover:border-primary-950 rounded p-2 w-full" name="gender" multiple onChange={handleChange}>
                  {renderOptions(options.genderOptions, 'gender')}
                </select>
              </div>

              {/* Weight Class Select */}
              <div>
                <label htmlFor="weightClass" className="block text-gray-600 text-xs font-semibold mb-2">Weight Class</label>
                <select id="weightClass" className="border border-gray-300 hover:border-primary-950 rounded p-2 w-full" name="weightClass" multiple onChange={handleChange}>
                  {renderOptions(options.weightClassOptions, 'weightClass')}
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-gray-600 text-xs font-semibold mb-2">Category</label>
                <select id="category" className="border border-gray-300 hover:border-primary-950 rounded p-2 w-full" name="category" multiple onChange={handleChange}>
                  {renderOptions(options.categoryOptions, 'category')}
                </select>
              </div>

              {/* Age Group Select */}
              <div>
                <label htmlFor="ageGroup" className="block text-gray-600 text-xs font-semibold mb-2">Age Group</label>
                <select id="ageGroup" className="border border-gray-300 hover:border-primary-950 rounded p-2 w-full" name="ageGroup" multiple onChange={handleChange}>
                  {renderOptions(options.ageGroupOptions, 'ageGroup')}
                </select>
              </div>

              {/* Year Select */}
              <div>
                <label htmlFor="year" className="block text-gray-600 text-xs font-semibold mb-2">Year</label>
                <select id="year" className="border border-gray-300 hover:border-primary-950 rounded p-2 w-full" name="year" multiple onChange={handleChange}>
                  {renderOptions(options.yearOptions, 'year')}
                </select>
              </div>

              {/* Meet Type Select */}
              <div>
                <label htmlFor="meetType" className="block text-gray-600 text-xs font-semibold mb-2">Meet Type</label>
                <select id="meetType" className="border border-gray-300 hover:border-primary-950 rounded p-2 w-full" name="meetType" multiple onChange={handleChange}>
                  {renderOptions(options.meetTypeOptions, 'meetType')}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center w-full mt-4">
              <button type="submit" className="bg-primary-950 text-white rounded p-2 hover:bg-primary-500">Consult the Oracle</button>
            </div>
            
          </form>
          <div className="flex flex-wrap justify-center items-center mt-4">
            {renderSelectedFilters()}
          </div>
          
        </div>
      </div>
      <div>
        {isLoading && <Spinner />} 
      </div>
        <div>
          {!isLoading && apiData && (
            <>
              <PaywallOverlay buttonText="Unlock Custom Query with Lift Oracle Pro">
                <div className="my-2 flex flex-wrap gap-2 justify-evenly">
                  <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full sm:w-3/4">
                    
                      <div className="bg-secondary-500 p-6 rounded-lg w-full sm:w-1/3 shadow-lg p-2 mb-4">
                        <h1 className="text-center text-l text-primary-950 font-bold m-2 border-b border-primary-100">Query Statistics</h1>
                        <div className="text-left flex flex-col gap-1 mb-2">
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">Number of Athletes: <span className="font-mono text-gray-700 text-l">{apiData.stats["Number of Athletes"]}</span></a>
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">Overall Make Rate: <span className="font-mono text-gray-700 text-l">{apiData.stats["Overall Make %"]}</span></a>
                        </div>
                        <div className="text-left flex flex-col gap-1 mb-2">
                            <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Snatch</h1>
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Make Rate: <span className="font-mono text-gray-700 text-l">{apiData.stats["Snatch Make %"]}</span></a>
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Opener Make Rate: <span className="font-mono text-gray-700 text-l">{apiData.advanced_stats['Snatch']['Opener Make %']}</span></a>
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{apiData.advanced_stats['Snatch']['Total Avg Reach (Kg)']}kg</span></a>
                        </div>
                        <div className="text-left flex flex-col gap-1">
                            <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Clean & Jerk</h1>
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Make Rate: <span className="font-mono text-gray-700 text-l">{apiData.stats["C&J Make %"]}</span></a>
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Opener Make Rate: <span className="font-mono text-gray-700 text-l">{apiData.advanced_stats['C&J']['Opener Make %']}</span></a>
                            <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{apiData.advanced_stats['C&J']['Total Avg Reach (Kg)']}kg</span></a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 p-6 mb-4">
                        <h1 className="text-center text-xl text-primary-950 font-bold mb-4">Top 10 Sinclair Totals</h1>
                        <div className="w-full">
                          <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                            <thead>
                            <tr className="bg-gray-100 text-primary-950">
                              <th className="px-4 py-2 text-left"></th>
                              <th className="px-4 py-2 text-left">Athlete</th>
                              <th className="px-4 py-2 text-left">Sinclair Total</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            {apiData.sinclairs.map((data, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-4 py-2">{index + 1}</td>
                              <td className="px-4 py-2">{data[0]}</td>
                              <td className="px-4 py-2 font-mono">{data[1]}</td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    
                  </div>
                </div>
              </PaywallOverlay>
            </>
          )}
        </div>
      
    </div>
    
  );
};

export default ResultsFilterForm;
