import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToSession } from '../../features/sessionSlice'
import PropTypes from 'prop-types';

const UserList = ({ users ,isSession }) => {
  const dispatch = useDispatch()

  const nameToQueryString = (str) =>{
    let queryString = str.split(/\s+/).join('%20')
    return queryString
  }
  
   const handleClick = (e) =>{
     dispatch(addToSession(e.target.textContent))
  }

  const renderUsers = (amount) => {
    let lis = []
    for( let i = 0; i<amount; i++){
      if(users[i]){
        let user = users[i];
        //can i delay doing the name->query string function??
        if(isSession){
          lis.push(<div className='text-gray-700 p-1 hover:text-white hover:bg-gradient-to-r hover:from-primary-400 hover:to-transparent hover:cursor-pointer text-sm' key={user}  onClick={(e)=> handleClick(e)}>{user}</div> )  
        }else{
          lis.push(<Link to={`/api/v1/athlete/${nameToQueryString(user)}`} ><div className='text-gray-700 p-1 hover:text-white hover:bg-gradient-to-r hover:from-primary-400 hover:to-transparent hover:cursor-pointer text-sm' key={user} >{user}</div></Link> )
        }
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

UserList.propTypes = {
  users: PropTypes.array,
  isSession: PropTypes.bool
};

export default UserList;
