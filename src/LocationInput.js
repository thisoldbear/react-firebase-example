import React from "react";
import firebase from "./firebase";

export const LocationInput = ({ location }) => {
  const [name, setName] = React.useState(location.name);

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection("locations")
      .doc(location.id)
      .set({ ...location, name });
  };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("locations")
      .doc(location.id)
      .delete();
  };

  return (
    <>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
};
