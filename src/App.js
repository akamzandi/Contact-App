import "./App.css";
import Header from "./Components/Header";
import AddForm from "./Components/AddForm";
import ContactList from "./Components/ContactList";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 0,
      name: "John Doe",
      email: "JohnDoe@example.com",
    },
    {
      id: 1,
      name: "Some One",
      email: "test@mail.com",
    },
  ]);
  // const [contacts, setContacts] = useState(null);

  const [newContact, setNewContact] = useState({
    id: contacts ? contacts.length + 1 : 0,
    name: "",
    email: "",
  });

  const inputChangeHandler = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setContacts(contacts ? [...contacts, newContact] : [newContact]);
  };

  const deletContactHandler = (id) => {
    const filteredContacts = contacts.filter((item) => item.id != id);
    setContacts(filteredContacts);
  };

  useEffect(() => {
    setNewContact({
      id: contacts ? contacts.length + 1 : 0,
      name: "",
      email: "",
    });
  }, [contacts]);

  return (
    <div className="App">
      <Header />
      <AddForm
        submitHandler={submitHandler}
        inputChangeHandler={inputChangeHandler}
        newContact={newContact}
      />
      <ContactList
        contacts={contacts}
        deletContactHandler={deletContactHandler}
      />
    </div>
  );
}

export default App;
