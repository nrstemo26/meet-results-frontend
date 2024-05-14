import MapComponent from './MapComponent';
import AddGym from './AddGym';
import GoogleMapsLoader from './GoogleMapsLoader';

const GymFinder = () => {
  return (
    <GoogleMapsLoader>
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold m-2 mb-4">Olympic Weightlifting Gym Finder</h1>
            <MapComponent />
            <AddGym />
        </div>
    </GoogleMapsLoader>
    
  );
};

export default GymFinder;
