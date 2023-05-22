

const UserList = ({ users }) => {


  return (
    <div>
      <h1>Search Results:</h1>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
