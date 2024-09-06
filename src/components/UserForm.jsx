import { useEffect, useState } from "react";

export default function UserForm({ onSubmit, onCancel, user }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      user.name && setName(user.name); // if user.name is true, set the name state with the user.name value
      user.title && setTitle(user.title); // if user.title is true, set the title state with the user.title value
      user.mail && setMail(user.mail); // if user.mail is true, set the mail state with the user.mail value
      user.image && setImage(user.image); // if user.image is true, set the image state with the user.image value
    }
  }, [user]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // validate the form
    if (!name || !title || !mail) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    } else if (!mail.includes("@") || !mail.includes(".")) {
      alert("Please paste a valid email");
      return;
    }

    const user = {
      // key/name: value from state,
      name: name,
      title: title,
      mail: mail,
      image: image
    };
    onSubmit(user);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="">Name</label>
      <input id="name" type="text" value={name} placeholder="Type a name" onChange={e => setName(e.target.value)} />
      <label htmlFor="title">Title</label>
      <input id="title" type="text" value={title} placeholder="Type a title" onChange={e => setTitle(e.target.value)} />
      <label htmlFor="mail">Mail</label>
      <input id="mail" type="mail" value={mail} placeholder="Type a mail" onChange={e => setMail(e.target.value)} />
      <label htmlFor="mail">Image URL</label>
      <input type="url" value={image} placeholder="Paste image url" onChange={e => setImage(e.target.value)} />
      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
        alt="Choose"
        onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
      />
      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button>{user ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
