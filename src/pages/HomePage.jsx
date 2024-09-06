import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("name"); // state to handle the sort

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); // get data from local storage

      let usersData = [];

      if (data) {
        // if data exists in local storage
        usersData = JSON.parse(data); // parse the data from string to javascript array
      } else {
        // if data does not exist in local storage fetch the data from the API
        usersData = await fetchUsers(); // fetch the data from the API
      }

      console.log(usersData);
      setUsers(usersData); // set the users state with the data from local storage
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/dorra13/monopoly/main/boardgames.json"
    ); // fetch the data from the API
    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("users", JSON.stringify(data)); // save the data to local storage
    return data; // return the data
  }

  // Search, filter, and sort the users array
  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define all unique filter options
  const names = [...new Set(users.map((user) => user.name))];
  const themes = [...new Set(users.map((user) => user.theme))];
  const people = [...new Set(users.map((user) => user.people))];
  const time = [...new Set(users.map((user) => user.time))];
  const intensity = [...new Set(users.map((user) => user.intensity))];

  // Apply filters if a filter is selected
  if (filter) {
    filteredUsers = filteredUsers.filter(
      (user) => user.name === filter || user.theme === filter
    ); // filter the users array by the selected name or theme
  }

  // Sort the filtered users
  filteredUsers.sort((user1, user2) =>
    user1[sortBy].localeCompare(user2[sortBy])
  ); // sort the users array by the selected sort option

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Name{" "}
          <input
            placeholder="Search"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Filter by Title
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">Select name or theme</option>
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
            {people.map((people) => (
              <option key={people} value={people}>
                {people}
              </option>
            ))}
            {time.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}

            {intensity.map((intensity) => (
              <option key={intensity} value={intensity}>
                {intensity}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="theme">Theme</option>
            <option value="people">People</option>
            <option value="time">Time</option>
            <option value="intensity">Intensity</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
