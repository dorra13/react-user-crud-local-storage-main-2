import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

export default function CreatePage() {
  const navigate = useNavigate();

  async function createUser(newUser) {
    newUser.id = Date.now().toString(); // add the current date as id

    const data = localStorage.getItem("users"); // get data from local storage
    const usersData = JSON.parse(data) || []; // parse the data from string to javascript array

    usersData.push(newUser); // add the new user to the array
    localStorage.setItem("users", JSON.stringify(usersData)); // save the users array to local storage

    navigate("/"); // navigate to the home page
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Create New User</h1>
        <UserForm onSubmit={createUser} onCancel={handleCancel} />
      </div>
    </section>
  );
}
