import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";

const lifterData = [
    // "athletes": [
        "Nicholas  Allevato",
        "Mikerline  Apollon",
        "Luke  Carroll",
        "Lorelei  Dalton",
        "Dario  Garcia",
        "Madison  Gray",
        "Theresa  Hadley",
        "Kristin  Leet",
        "Makiyah  Nickerson",
        "Diane  Ortiz",
        "Emily  Roberts",
        "Jordan  Thomas",
        "Cheyenne  Warmack",
        "Leanne  Watson",
        "Katelyn  Witte",
        "John (Brad) King",
        "James (Jim) Storch",
        "Katherine (Katie) Plante",
        "Charles (Nick) Gordon",
        "Yehwalashet (Nyah) Matson",
        "Benjamin Abbott",
        "Kelsey Abdallah",
        "Nadeem Abdin",
        "Victoria Abell",
        "Shanna Aberson",
        "Keenan Abeyta",
        "Hunter Abila",
        "Christine Abrams",
        "Alexander Aceituno",
        "Samantha Acevedo",
        "Carlee Acevedo-Fuller",
        "Aaron Acosta",
        "Carlos Acosta",
        "Jason Acosta",
        "Javier Acosta",
        "Jordan Acosta",
        "Matthew Adamcheck",
        "Robert Adamire",
        "Haley Adams",
        "Dandre Adams",
        "McKenna Adams",
        "Marcus Adams",
        "Jamie Adams",
        "Cynthia Adams",
        "Brent Adams",
        "Chad Addison",
        "Jordan Adel",
        "David Adeyemo",
        "Courtney Adkins",
        "Brittney Adkisson",
        "Zachary Adler",
        "James Adrian",
        "Robert Adriano",
        "James Aftosmis",
        "Marie Agbah Hughes",
        "Karen Agena",
        "Manuel Aguero",
        "Carla Aguilar",
        "Billy Aguilar",
        "Patricia Aguilar",
        "Casey Aguilar-Gervase",
        "John Aguinaldo",
        "Emily Aguirre",
        "Nabeela Ahmed",
        "Andre Ainsworth",
        "Inna Aizenshtein",
        "Nu Akalegbere",
        "Jonathan Akin",
        "Jacob Alamina",
        "B. Alanna C. Fisk",
        "Alex Alas",
        "Miguel Alava",
        "Dana Albanese",
        "Timothy Albergotti",
        "Mark Albers",
        "Jaclyn Alberts",
        "Dimitri Albury",
        "Christopher Alcantara",
        "Jairo Alcaraz",
        "Mark Alcaraz",
        "Juan Alcazar",
        "Kim Alderwick",
        "Elizabeth Aldrich"]
    // }

const Search = () => {
//   const [users, setUsers] = useState([]);
  const [users, setUsers] = useState(lifterData);
  const [searchQuery, setSearchQuery] = useState('');

  console.log(users)

  useEffect(() => {
    // Fetch users from backend API or any other data source
    // and update the `users` state
    const fetchUsers = async () => {
      //const response = await fetch('/api/users');
      //const data = await response.json();
      setUsers(lifterData);
    };

    fetchUsers();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) =>
    // user.name.toLowerCase().includes(searchQuery.toLowerCase())
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
        <div>
            <SearchBar onSearch={handleSearch} searchQuery={searchQuery}  />
            <UserList users={filteredUsers} />
        </div>
    )
}

export default Search;
