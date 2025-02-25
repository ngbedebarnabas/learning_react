import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 1234,
    fname: "Ade",
    lname: "Amos",
    image: "https://i.pravatar.cc/48?=dsfgdskj",
    skills: ["JavaScript 👍", "Git🚀", "React💪", "HTML & CSS🌐"],
    bio: "Some brief bio about this friend goes here.",
  },

  {
    id: 12334,
    fname: "Levi",
    lname: "Anderson",
    image: "https://i.pravatar.cc/48?=kfsad",
    skills: ["Python 👍", "Django 🚀", "PHP🌐", "HTML & CSS 😎"],
    bio: "Backend developer and Data Scientist with expertise in ML and AI.",
  },

  {
    id: 12365,
    fname: "Fred ",
    lname: "Frank",
    image: "https://i.pravatar.cc/48?=jkdsfks",
    skills: ["Ruby 😎", "WordPress🔮", "HTML & CSS🌐"],
    bio: "An astute frontend web developer with strong skills with JavaScript, ReactJS, NextJS and TypeScript",
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddForm() {
    setShowAddFriend((cur) => !cur);

    setSelectedFriend(null);
  }

  function handleSelection(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleRemoveFriend(friend) {
    if (window.confirm("Are you sure you want to remove this friend?")) {
      setFriends(friends.filter((cur) => cur.id !== friend.id));

      setSelectedFriend(null);
    }
  }

  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  const [sortBy, setSortBy] = useState("input");

  let sortedFriends;

  if (sortBy === "input") sortedFriends = friends;

  if (sortBy === "fname")
    sortedFriends = friends
      .slice()
      .sort((a, b) => a.fname.localeCompare(b.fname));

  if (sortBy === "lname")
    sortedFriends = friends
      .slice()
      .sort((a, b) => a.lname.localeCompare(b.lname));

  return (
    <div className="app">
      <h1>Friends List</h1>
      <div className="container">
        <div className="friend-box">
          <span>Sort By:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Order</option>
            <option value="fname">First Name</option>
            <option value="lname">Last Name</option>
          </select>

          {sortedFriends.map((friend) => (
            <Friend
              friend={friend}
              key={friend.id}
              onView={handleSelection}
              selectedFriend={selectedFriend}
              onRemove={handleRemoveFriend}
            />
          ))}

          {showAddFriend && <AddFriendForm onAddFriend={handleAddNewFriend} />}

          <Button btn="btn" onAddNewFriend={handleShowAddForm}>
            {showAddFriend ? "Close" : "Add New Friend"}
          </Button>
        </div>
        {/* Friend details that displays when you click to view */}

        {selectedFriend && (
          <FriendDetails
            selectedFriend={selectedFriend}
            onRemove={handleRemoveFriend}
          />
        )}

        {/* To add new friends  */}
      </div>
    </div>
  );
}

function Button({ btn, children, onAddNewFriend }) {
  return (
    <button className={`${btn}`} onClick={onAddNewFriend}>
      {children}
    </button>
  );
}

function Friend({ friend, onView, selectedFriend, onRemove }) {
  const isSelected = friend.id === selectedFriend?.id;

  return (
    <div className="friend">
      <img src={friend.image} alt="alttext" />
      <div className="friend-info">
        <h4>{`${friend.fname} ${friend.lname}`}</h4>
        <p>{`${friend.bio.substring(0, 35)}...`}</p>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => onView(friend)}>
          {isSelected ? "Close" : "Meet"}
        </button>
        <button className="btn-remove" onClick={() => onRemove(friend)}>
          Remove
        </button>
      </div>
    </div>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [bio, setBio] = useState("");

  function handleAddFriend(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      fname,
      lname,
      image,
      bio,
    };
    onAddFriend(newFriend);
  }

  return (
    <form className="add-friend-form" onSubmit={handleAddFriend}>
      <h3>Add New Friend</h3>

      <div className="form-input-group">
        <label>First Name: </label>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>

      <div className="form-input-group">
        <label>Last Name: </label>
        <input
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className="form-input-group">
        <label>Image URL: </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="form-input-group">
        <label>Brief Bio: </label>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <Button btn="btn">Add Friend</Button>
    </form>
  );
}

function FriendDetails({ selectedFriend, onRemove }) {
  return (
    <div className="friend-details">
      <h2>Meet {selectedFriend.fname}</h2>
      <img src={`${selectedFriend.image}`} alt="alttext" />
      <p>
        <strong>First Name: </strong>
        {selectedFriend.fname} <strong>Last Name: </strong>
        {selectedFriend.lname}
      </p>
      <p>
        <strong>Bio: </strong>
        {selectedFriend.bio}
      </p>
      <p>
        <strong>Skills:</strong> {selectedFriend.skills}
      </p>

      {/* <Button btn="btn-remove" onClick={() => onRemove(selectedFriend)}>
        Remove
      </Button> */}
    </div>
  );
}
