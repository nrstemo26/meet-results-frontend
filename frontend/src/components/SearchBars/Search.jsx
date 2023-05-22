import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import {useDispatch} from 'react-redux'
import { getAllAthletes } from "../../redux/lifterSlice";


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
  const dispatch = useDispatch()

  const [users, setUsers] = useState(lifterData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch users from backend API or any other data source
    // and update the `users` state
    const fetchUsers = async () => {

      //get all the lifter data then set it as users
      //const response = await fetch('/api/users');
      //const data = await response.json();
      const athletes = (await dispatch(getAllAthletes())).payload.athletes
      console.log(athletes)
      setUsers(athletes);
    };

    fetchUsers();
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
        <div className=" text-center">
            <SearchBar onSearch={handleSearch} />
            <UserList users={filteredUsers} />
        </div>
    )
}

export default Search;
