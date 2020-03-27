import React from "react";
import "./App.css";
import firebase from "./firebase";
import { LocationInput } from "./LocationInput";

function App() {
  const [locations, setLocations] = React.useState([]);
  const [newLocationName, setNewLocationName] = React.useState();

  React.useEffect(() => {
    const db = firebase.firestore();

    // Async
    // const data = await db.collection("locations").get();
    // setLocations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));

    // Subscribe to firebase changes
    return db.collection("locations").onSnapshot(snapshot => {
      const locationsData = [];

      snapshot.forEach(doc =>
        locationsData.push({ ...doc.data(), id: doc.id })
      );

      setLocations(locationsData);
    });
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("locations").add({ name: newLocationName });
  };

  return (
    <ul>
      <input
        value={newLocationName}
        onChange={e => setNewLocationName(e.target.value)}
      />
      <button onClick={onCreate}>Create</button>
      {locations.map(location => (
        <li key={location.name}>
          <LocationInput location={location} />
        </li>
      ))}
    </ul>
  );
}

export default App;
