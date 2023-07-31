import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const MeetList = ({ meets }) => {
  const dispatch = useDispatch()

  const nameToQueryString = (str) =>{
    let queryString = str.split(/\s+/).join('%20')
    return `${queryString}`
  }
  
   const handleClick = (e) =>{
    //  dispatch(addToSession(e.target.textContent))
  }

  const renderUsers = (amount) => {
    let lis = []
    for( let i = 0; i<amount; i++){
      if(meets[i]){
        let meet = meets[i];
        //can i delay doing the name->query string function??
        // if(isSession){
          // lis.push(<div className='text-gray-700 p-1 hover:text-white hover:bg-gradient-to-r hover:from-primary-400 hover:to-transparent hover:cursor-pointer text-sm' key={meet}  onClick={(e)=> handleClick(e)}>{meet}</div> )  
        // }else{
          lis.push(<Link to={`/api/v1/meet/${nameToQueryString(meet)}`} ><div className='text-gray-700 p-1 hover:text-white hover:bg-gradient-to-r hover:from-primary-400 hover:to-transparent hover:cursor-pointer text-sm' key={meet} >{meet}</div></Link> )
        // }
      }else{
        break;
      }
    }
    return lis;
  }
  

  return (
    <div>
      <div>
        {renderUsers(20)}

      </div>
    </div>
  );
}



export default MeetList;
