import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    setUser(usersData.find(user => user.id === id));
  }, [id]); // <--- "[params.id]" VERY IMPORTANT!!!

  async function updateUser(userToUpdate) {
    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    // map through the users
    const updatedUsers = usersData.map(user => {
      // if the user id is the same as the id from the params
      if (user.id === id) {
        return { ...user, ...userToUpdate }; // return the user with the updated data
      }
      return user; // return the user without updating
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // save the users state to local storage
    navigate(`/users/${id}`); // navigate to the user detail page
  }

  function handleCancel() {
    navigate(-1); // go back
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <UserForm onSubmit={updateUser} onCancel={handleCancel} user={user} />
      </div>
    </section>
  );
}
