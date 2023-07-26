import { useSelector } from "react-redux";

function Insights() {
  const {data: stats } = useSelector((state)=>state.meet)

  return (
    stats ? (
      <div className="sm:w-full flex flex-col">
        <h1 className="text-center text-xl text-primary-950 font-bold m-2 border-b border-primary-100">Insights</h1>
        <div className="sm:flex sm:flex-auto">
            <div className="bg-secondary-500 p-6 rounded-lg w-full sm:w-1/3 shadow-lg p-2 mb-4">
                <h1 className="text-center text-l text-primary-950 font-bold m-2 border-b border-primary-100">All Athletes</h1>
                <div className="text-left flex flex-col gap-1 mb-2">
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Number of Athletes: <span className="font-mono text-gray-700 text-l">{stats.headline.stats["Number of Athletes"]}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Overall Make Rate: <span className="font-mono text-gray-700 text-l">{stats.headline.stats["Overall Make %"]}</span></a>
                </div>
                <div className="text-left flex flex-col gap-1 mb-2">
                    <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Snatch</h1>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Make Rate: <span className="font-mono text-gray-700 text-l">{stats.headline.stats["Snatch Make %"]}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Opener Make Rate: <span className="font-mono text-gray-700 text-l">{stats.headline.advanced_stats['Snatch']['Opener Make %']}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{stats.headline.advanced_stats['Snatch']['Total Avg Reach (Kg)']}kg</span></a>
                </div>
                <div className="text-left flex flex-col gap-1">
                    <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Clean & Jerk</h1>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Make Rate: <span className="font-mono text-gray-700 text-l">{stats.headline.stats["C&J Make %"]}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Opener Make Rate: <span className="font-mono text-gray-700 text-l">{stats.headline.advanced_stats['C&J']['Opener Make %']}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{stats.headline.advanced_stats['C&J']['Total Avg Reach (Kg)']}kg</span></a>
                </div>
            </div>
            <div className="bg-secondary-500 p-6 rounded-lg w-full sm:w-1/3 shadow-lg p-2">
                <h1 className="text-center text-l text-primary-950 font-bold m-2 border-b border-primary-100">Men</h1>
                <div className="text-left flex flex-col gap-1 mb-2">
                    
                    
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best Total: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["Best Total"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best Sinclair Total: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["Best Sinclair Total"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Number of Athletes: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["Number of Athletes"]}</span></a>                    
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Overall Make Rate: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["Overall Make %"]}</span></a>
                </div>
                <div className="text-left flex flex-col gap-1 mb-2">
                    <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Snatch</h1>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best Snatch: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["Best Snatch"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Make Rate: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["Snatch Make %"]}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Opener Make Rate: <span className="font-mono text-gray-700 text-l">{stats.mens.advanced_stats['Snatch']['Opener Make %']}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{stats.mens.advanced_stats['Snatch']['Total Avg Reach (Kg)']}kg</span></a>
                </div>
                <div className="text-left flex flex-col gap-1">
                    <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Clean & Jerk</h1>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best C&J: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["Best C&J"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Make Rate: <span className="font-mono text-gray-700 text-l">{stats.mens.stats["C&J Make %"]}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Opener Make Rate: <span className="font-mono text-gray-700 text-l">{stats.mens.advanced_stats['C&J']['Opener Make %']}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{stats.mens.advanced_stats['C&J']['Total Avg Reach (Kg)']}kg</span></a>
                </div>
            </div>
            <div className="bg-secondary-500 p-6 rounded-lg w-full sm:w-1/3 shadow-lg p-2">
                <h1 className="text-center text-l text-primary-950 font-bold m-2 border-b border-primary-100">Women</h1>
                <div className="text-left flex flex-col gap-1 mb-2">
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best Total: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["Best Total"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best Sinclair Total: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["Best Sinclair Total"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Number of Athletes: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["Number of Athletes"]}</span></a>                    
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Overall Make Rate: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["Overall Make %"]}</span></a>
                </div>
                <div className="text-left flex flex-col gap-1 mb-2">
                    <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Snatch</h1>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best Snatch: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["Best Snatch"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Make Rate: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["Snatch Make %"]}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Opener Make Rate: <span className="font-mono text-gray-700 text-l">{stats.womens.advanced_stats['Snatch']['Opener Make %']}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{stats.womens.advanced_stats['Snatch']['Total Avg Reach (Kg)']}kg</span></a>
                </div>
                <div className="text-left flex flex-col gap-1">
                    <h1 className="text-center text-l text-primary-950 font-semibold border-b border-primary-100">Clean & Jerk</h1>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Best C&J: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["Best C&J"]}kg</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Make Rate: <span className="font-mono text-gray-700 text-l">{stats.womens.stats["C&J Make %"]}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Opener Make Rate: <span className="font-mono text-gray-700 text-l">{stats.womens.advanced_stats['C&J']['Opener Make %']}</span></a>
                    <a className="text-primary-950 border-2 border-secondary rounded-lg">Total Avg Reach: <span className="font-mono text-gray-70 text-l">{stats.womens.advanced_stats['C&J']['Total Avg Reach (Kg)']}kg</span></a>
                </div>
            </div>
        </div>
        
      </div>
    ) : (
      <div className="text-gray-700">No stats for meet.</div>
    )
  );
}

export default Insights;
