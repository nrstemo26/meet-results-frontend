import MapComponent from './MapComponent';
import AddGym from './AddGym';
import GoogleMapsLoader from './GoogleMapsLoader';

const GymFinder = () => {
  return (
    <GoogleMapsLoader>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold m-2 mb-4">Find an Olympic Weightlifting Gym Near You</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full">
          <div className="col-span-2">
            <MapComponent />
          </div>
          <div className="col-span-1">
            <AddGym />
          </div>
        </div>
      </div>
    </GoogleMapsLoader>
  );
};

export default GymFinder;
