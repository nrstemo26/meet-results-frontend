

const UserList = ({ users, searchQuery }) => {
//    const filteredUsers = users.filter((user) =>
//         user.toLowerCase().includes(searchQuery.toLowerCase())
//    );

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
