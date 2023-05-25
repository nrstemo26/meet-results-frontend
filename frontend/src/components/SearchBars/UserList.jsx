import {Link } from 'react-router-dom'

const UserList = ({ users ,isSession, setSessionAthletes}) => {
  
  const nameToQueryString = (str) =>{
    // console.log(str)
    let queryString = str.split(/\s+/).join('%20')
    // console.log('bout to return ',queryString)
    return queryString
  }

   const handleClick = (e) =>{
    setSessionAthletes(arr=>[...arr,e.target.textContent])
   }

  const renderUsers = (amount) => {
    let lis = []
    for( let i = 0; i<amount; i++){
      if(users[i]){
      let user = users[i];
      //can i delay doing the name->query string function??
      if(isSession){
        lis.push(<div className='border-primary-500 p-2 border-2 m-2 hover:text-white hover:bg-primary-500 hover:cursor-pointer' key={user}  onClick={(e)=> handleClick(e)}>{user}</div> )  
      }else{
        lis.push(<Link to={`/api/v1/athlete/${nameToQueryString(user)}`} ><div className='border-primary-500 p-2 border-2 m-2 hover:text-white hover:bg-primary-500 hover:cursor-pointer' key={user} >{user}</div></Link> )
      }
      // lis.push(<Link to={`/api/v1/lifter/${nameToQueryString(user)}`} ><div className='border-primary-500 p-2 border-2 m-2 hover:text-white hover:bg-primary-500 hover:cursor-pointer' key={user} onClick={handleClick}>{user}</div></Link> )
      }
    }
    return lis;
  }
  

  return (
    <div>
      <h1>Search Results:</h1>
      <div>
        {renderUsers(20)}
      
      </div>
    </div>
  );
}

export default UserList;
