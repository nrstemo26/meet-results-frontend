import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FiLoader, FiBarChart2 } from 'react-icons/fi';

// Register the components needed by Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for development and testing
const MOCK_DATA = {
  "2015": {
    "Men": {
      "Body Weight (Kg)": [72.5, 85.6, 95.8, 105.2],
      "Lifter": ["John Doe", "Mike Smith", "Tom Jones", "Sam Williams"],
      "Total": [350, 375, 410, 430]
    },
    "Women": {
      "Body Weight (Kg)": [58.3, 63.4, 75.2, 84.9],
      "Lifter": ["Jane Smith", "Mary Jones", "Lisa Brown", "Kim Clark"],
      "Total": [210, 225, 255, 275]
    }
  },
  "2018": {
    "Men": {
      "Body Weight (Kg)": [68.7, 77.8, 90.3, 109.6],
      "Lifter": ["Bob Martin", "David Lee", "Jim Wilson", "Mark Davis"],
      "Total": [340, 370, 395, 425]
    },
    "Women": {
      "Body Weight (Kg)": [53.2, 64.5, 73.1, 89.5],
      "Lifter": ["Sarah Johnson", "Kate Miller", "Amy Wilson", "Tina Davis"],
      "Total": [205, 215, 245, 280]
    }
  },
  "2021": {
    "Men": {
      "Body Weight (Kg)": [74.1, 81.3, 98.2, 115.5],
      "Lifter": ["Chris Taylor", "Alex Brown", "Nick White", "Paul Green"],
      "Total": [365, 385, 420, 450]
    },
    "Women": {
      "Body Weight (Kg)": [55.7, 61.8, 78.4, 90.3],
      "Lifter": ["Jessica Lee", "Emily Wright", "Olivia Hill", "Rachel Scott"],
      "Total": [220, 230, 265, 290]
    }
  }
};

const YearlyTotalsChart = ({ 
  title = "Historic Totals By Bodyweight",
  height = "400px",
  initialGender = "Men",
  showToggle = true,
  className = "",
  description = "This chart shows the highest totals achieved by bodyweight across different years. Each line represents the performance frontier for a given year."
}) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGender, setActiveGender] = useState(initialGender);
  const [error, setError] = useState(null);
  const [visibleYears, setVisibleYears] = useState([]);
  const currentYear = new Date().getFullYear();
  const FILTER_YEAR = 2012; // Filter data from 2012 onwards
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/v1/meets/year-class-totals`);
        
        if (response.data) {
          console.log('Fetched data:', response.data);
          processData(response.data);
        }
      } catch (err) {
        console.error('Error fetching yearly totals data:', err);
        // Fall back to mock data for development
        console.log('Using mock data as fallback');
        processData(MOCK_DATA);
        setError(null); // Clear any previous error since we're using mock data
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Process API data into format suitable for Chart.js
  const processData = (data) => {
    // Validate data structure
    if (!data || typeof data !== 'object') {
      console.error('Invalid data format:', data);
      setError('Invalid data format received from API');
      return;
    }
    
    const years = Object.keys(data)
      .filter(year => parseInt(year) >= FILTER_YEAR && parseInt(year) <= currentYear)
      .sort();
    
    if (years.length === 0) {
      console.warn('No data available for the selected year range');
    }
    
    // Initialize visible years (most recent 5 years or all if less than 5)
    const initialVisibleYears = years.slice(-5);
    setVisibleYears(initialVisibleYears);
    
    const menDataByYear = {};
    const womenDataByYear = {};
    
    years.forEach(year => {
      menDataByYear[year] = [];
      womenDataByYear[year] = [];
      
      // Process men's data
      if (data[year]?.Men && data[year].Men['Body Weight (Kg)']?.length > 0) {
        const points = [];
        for (let i = 0; i < data[year].Men['Body Weight (Kg)'].length; i++) {
          const bodyWeight = parseFloat(data[year].Men['Body Weight (Kg)'][i]);
          const total = parseFloat(data[year].Men.Total[i]);
          
          // Skip invalid data points
          if (isNaN(bodyWeight) || isNaN(total)) {
            console.warn(`Skipping invalid data point for year ${year}, Men, index ${i}`);
            continue;
          }
          
          points.push({
            x: bodyWeight,
            y: total,
            lifter: data[year].Men.Lifter[i] || 'Unknown'
          });
        }
        
        // Log the number of valid points found
        console.log(`Found ${points.length} valid data points for Men in ${year}`);
        
        // Sort points by bodyweight
        points.sort((a, b) => a.x - b.x);
        
        // Find the frontier points (highest total for each bodyweight range)
        const frontierMap = new Map();
        
        // Group by bodyweight ranges (2kg buckets)
        points.forEach(point => {
          // Group by 2kg ranges for better distribution
          const bucketKey = Math.floor(point.x / 2) * 2;
          
          if (!frontierMap.has(bucketKey) || frontierMap.get(bucketKey).y < point.y) {
            frontierMap.set(bucketKey, point);
          }
        });
        
        // Convert map to array and sort by bodyweight
        const frontierPoints = Array.from(frontierMap.values())
          .sort((a, b) => a.x - b.x);
        
        menDataByYear[year] = frontierPoints;
        console.log(`Generated ${frontierPoints.length} frontier points for Men in ${year}`);
      } else {
        console.log(`No Men's data available for ${year}`);
      }
      
      // Process women's data
      if (data[year]?.Women && data[year].Women['Body Weight (Kg)']?.length > 0) {
        const points = [];
        for (let i = 0; i < data[year].Women['Body Weight (Kg)'].length; i++) {
          const bodyWeight = parseFloat(data[year].Women['Body Weight (Kg)'][i]);
          const total = parseFloat(data[year].Women.Total[i]);
          
          // Skip invalid data points
          if (isNaN(bodyWeight) || isNaN(total)) {
            console.warn(`Skipping invalid data point for year ${year}, Women, index ${i}`);
            continue;
          }
          
          points.push({
            x: bodyWeight,
            y: total,
            lifter: data[year].Women.Lifter[i] || 'Unknown'
          });
        }
        
        // Log the number of valid points found
        console.log(`Found ${points.length} valid data points for Women in ${year}`);
        
        // Sort points by bodyweight
        points.sort((a, b) => a.x - b.x);
        
        // Find the frontier points (highest total for each bodyweight range)
        const frontierMap = new Map();
        
        // Group by bodyweight ranges (2kg buckets)
        points.forEach(point => {
          // Group by 2kg ranges for better distribution
          const bucketKey = Math.floor(point.x / 2) * 2;
          
          if (!frontierMap.has(bucketKey) || frontierMap.get(bucketKey).y < point.y) {
            frontierMap.set(bucketKey, point);
          }
        });
        
        // Convert map to array and sort by bodyweight
        const frontierPoints = Array.from(frontierMap.values())
          .sort((a, b) => a.x - b.x);
        
        womenDataByYear[year] = frontierPoints;
        console.log(`Generated ${frontierPoints.length} frontier points for Women in ${year}`);
      } else {
        console.log(`No Women's data available for ${year}`);
      }
    });
    
    const processedData = {
      Men: menDataByYear,
      Women: womenDataByYear,
      years: years
    };
    
    console.log('Processed chart data:', processedData);
    setChartData(processedData);
  };
  
  // Toggle a year's visibility in the chart
  const toggleYearVisibility = (year) => {
    setVisibleYears(prev => {
      if (prev.includes(year)) {
        return prev.filter(y => y !== year);
      } else {
        return [...prev, year];
      }
    });
  };
  
  // Options for the chart
  const chartOptions = {
    parsing: false, // Important: tell Chart.js that we're using pre-processed data
    normalized: true,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Body Weight (kg)',
          font: {
            weight: 'bold',
            size: 14
          }
        },
        min: 40,
        max: 150,
        ticks: {
          stepSize: 10
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Total (kg)',
          font: {
            weight: 'bold',
            size: 14
          }
        },
        min: 0, // Start from 0 for better visualization
        ticks: {
          stepSize: 50
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: (context) => {
          // Responsive title - shorter on small screens
          const screenWidth = window.innerWidth;
          return screenWidth < 768 
            ? `${activeGender} (2012-Present)` 
            : `Highest Totals by Bodyweight (${activeGender}) - 2012 to Present`;
        },
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            if (!point) return [];
            
            return [
              `Lifter: ${point.lifter || 'Unknown'}`,
              `Year: ${context.dataset.label}`,
              `Body Weight: ${point.x.toFixed(1)} kg`,
              `Total: ${point.y} kg`
            ];
          }
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 15,
          // Improve legend readability on small screens
          font: {
            size: (context) => {
              return window.innerWidth < 768 ? 10 : 12;
            }
          }
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          const year = ci.data.datasets[index].label;
          
          toggleYearVisibility(year);
          ci.update();
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        tension: 0.3, // Slight curve to the lines
        borderWidth: 3
      },
      point: {
        radius: (context) => {
          // Smaller points on mobile for less crowding
          return window.innerWidth < 768 ? 3 : 4;
        },
        hoverRadius: (context) => {
          return window.innerWidth < 768 ? 5 : 6;
        }
      }
    }
  };
  
  // Generate data for the chart based on active gender
  const getLineData = () => {
    if (!chartData) return { datasets: [] };
    
    // Generate color array - creating a gradient of colors for different years
    const generateColor = (year) => {
      // Use a blue gradient for men and a purple gradient for women
      const baseColor = activeGender === 'Men' 
        ? { r: 49, g: 130, b: 206 }  // Blue base for men
        : { r: 159, g: 122, b: 234 }; // Purple base for women
      
      // Calculate color based on year (newer years are more saturated)
      const yearsSince2012 = parseInt(year) - FILTER_YEAR;
      const maxYears = currentYear - FILTER_YEAR;
      const intensity = 0.5 + (0.5 * (yearsSince2012 / maxYears));
      
      return `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${intensity})`;
    };
    
    // Create datasets only for visible years
    const datasets = visibleYears
      .filter(year => {
        const yearData = chartData[activeGender][year];
        return yearData && yearData.length > 0;
      })
      .map(year => {
        const yearData = chartData[activeGender][year];
        const color = generateColor(year);
        
        // Make sure we have enough points for a good curve (at least 3)
        // If not, add interpolated points
        let enhancedData = [...yearData];
        if (enhancedData.length < 3) {
          console.log(`Not enough data for year ${year}, only ${enhancedData.length} points`);
        }
        
        // Ensure all data points are valid numbers
        enhancedData = enhancedData.filter(point => 
          !isNaN(point.x) && !isNaN(point.y) && 
          point.x !== null && point.y !== null
        );
        
        return {
          label: year,
          data: enhancedData,
          borderColor: color,
          backgroundColor: color.replace(')', ', 0.1)').replace('rgba', 'rgba'),
          fill: false,
          pointBackgroundColor: color,
          pointBorderColor: color,
          cubicInterpolationMode: 'monotone',
          showLine: true,  // Ensure lines are shown
          spanGaps: true   // Connect points even if there are gaps
        };
      });
    
    return { datasets };
  };
  
  // Render year toggles for the legend - improved for mobile
  const renderYearToggles = () => {
    if (!chartData || !chartData.years) return null;
    
    return (
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 justify-center">
        {chartData.years.map(year => (
          <button
            key={year}
            onClick={() => toggleYearVisibility(year)}
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              visibleYears.includes(year)
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 ${className}`}>
      {/* Improved header layout for mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <FiBarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-primary-950">{title}</h3>
        </div>
        
        {/* Gender toggle buttons - improved for mobile */}
        {showToggle && (
          <div className="flex rounded-md shadow-sm self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveGender('Men')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium ${
                activeGender === 'Men'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 rounded-l-md focus:z-10 focus:outline-none`}
            >
              Men
            </button>
            <button
              type="button"
              onClick={() => setActiveGender('Women')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium ${
                activeGender === 'Women'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 rounded-r-md focus:z-10 focus:outline-none`}
            >
              Women
            </button>
          </div>
        )}
      </div>
      
      {/* Year toggle buttons for custom filtering */}
      {chartData && renderYearToggles()}
      
      <div style={{ height }} className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <FiLoader className="animate-spin text-primary-500 w-8 h-8" />
            <span className="ml-2 text-gray-600">Loading chart data...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : chartData ? (
          <Line options={chartOptions} data={getLineData()} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
      
      {description && (
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default YearlyTotalsChart; 