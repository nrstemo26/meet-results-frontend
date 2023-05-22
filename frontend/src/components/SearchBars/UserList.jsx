

const UserList = ({ users }) => {
  let lis = []
  const renderUsers = (amount) => {
    for( let i = 0; i<amount; i++){
      if(users[i]){
      let user = users[i];
      lis.push(<div className='border-primary-500 p-2 border-2 m-2 hover:text-white hover:bg-primary-500 hover:cursor-pointer' key={user}>{user}</div> )
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
