import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

import SharedLayout from "./Components/SharedLayout/SharedLayout";
import ContactsListPage from "./Pages/ContactList/ContactsListPage";
import AddEditContactPage from "./Pages/AddEditContact/AddEditContactPage";
import TagsPage from "./Pages/Tags/TagsPage";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Some One",
      email: "Jayne_Kuhic@sydney.com",
      tags: ["family", "friend", "work"],
    },
    {
      id: "2",
      name: "Good Contact",
      email: "Nikita@garfield.biz",
      tags: ["work", "unknown"],
    },
    {
      id: "3",
      name: "anynomus name",
      email: "Lew@alysha.tv",
      tags: ["friend", "work"],
    },
    {
      id: "4",
      name: "company manger",
      email: "boss@bussinesss.com",
      tags: ["family"],
    },
  ]);
  const [editedContactId, setEditedContactId] = useState(null);
  const [editContactMode, setEditContactMode] = useState(false);
  const [forSubmitContact, setForSubmitContact] = useState();
  const [forSubmitContactTagsCheckboxes, setForSubmitContactTagsCheckboxes] =
    useState([]);
  const [tags, setTags] = useState([
    {
      id: "1",
      label: "family",
      color: "green",
    },
    {
      id: "2",
      label: "friend",
      color: "blue",
    },
    {
      id: "3",
      label: "unknown",
      color: "purple",
    },
    {
      id: "3BnhZ_wZ8j7VIZzHquwag",
      label: "work",
      color: "red",
    },
  ]);
  const [forSubmitTag, setForSubmitTag] = useState();
  const [editedTagId, setEditedTagId] = useState(null);
  const [editTagMode, setEditTagMode] = useState(false);

  // RELATED TO SEARCH AND FILTER (not implemented)
  // const [searchValue, setSearchValue] = useState("");
  // const [filteredContacts, setFilteredContacts] = useState(contacts);

  const editContactModeNavigate = useNavigate();

  const inputChangeHandlerContact = (e) => {
    const { name, value } = e.target;
    setForSubmitContact({
      ...forSubmitContact,
      [name]: value,
    });
  };

  const inputChangeHandlerTag = (e) => {
    setForSubmitTag({
      ...forSubmitTag,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagColorChange = (color) => {
    setForSubmitTag({
      ...forSubmitTag,
      color: color,
    });
  };

  const contactTagsChangeHandler = (e) => {
    const { name } = e.target;

    const tempChekboxvalues = forSubmitContactTagsCheckboxes.map((item) => {
      if (item[name] !== undefined) {
        return { [name]: !item[name] };
      } else {
        return item;
      }
    });

    setForSubmitContactTagsCheckboxes(tempChekboxvalues);
  };

  const submitHandlerContact = (e) => {
    e.preventDefault();
    if (editContactMode) {
      editOneContact(editedContactId, forSubmitContact);
      getAllContacts();
      setEditedContactId(null);
      // alert("Contact Edited!");
      toast.info("Contact Edited!");
      editContactModeNavigate("/");
      setEditContactMode(false);
    } else {
      createOneContact(forSubmitContact);
      getAllContacts();
      // alert("Contact Created!");
      toast.info("Contact Created!");
    }
  };

  const submitHandlerTag = (e) => {
    e.preventDefault();
    if (editTagMode) {
      editOneTag(editedTagId, forSubmitTag);
      getAllTags();
      setEditedTagId(null);
      // alert("Tag Edited!");
      toast.info("Tag Edited!");
      setEditTagMode(false);
    } else {
      createOneTag(forSubmitTag);
      getAllTags();
      // alert("Tag Created!");
      toast.info("Tag Created!");
    }
  };

  const deletContactHandler = (id) => {
    deleteOneContact(id);
    getAllContacts();
    // alert("Contact Deleted!");
    toast.info("Contact Deleted!");
  };

  const editContactHandler = (id) => {
    setEditedContactId(id);
    setEditContactMode(true);
  };

  const deleteTagHandler = (id) => {
    deleteOneTag(id);
    getAllTags();
    // alert("Tag Deleted!");
    toast.info("Tag Deleted!");
  };

  const editTagHandler = (id) => {
    setEditedTagId(id);
    setEditTagMode(true);
  };

  const getAllContacts = () => {
    const data = JSON.parse(localStorage.getItem("contacts"));
    setContacts(data);
  };

  const deleteOneContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const createOneContact = (contact) => {
    // const updatedContacts = [...contacts, contact];
    const updatedContacts = [contact, ...contacts];
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const editOneContact = (id, contact) => {
    const updatedContacts = contacts.map((c) => {
      if (c.id === id) {
        return contact;
      } else {
        return c;
      }
    });
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    console.log("edit One Contact Function!");
  };

  const getAllTags = () => {
    const data = JSON.parse(localStorage.getItem("tags"));
    setTags(data);
  };

  const createOneTag = (tag) => {
    // const updatedTags = [...tags, tag];
    const updatedTags = [tag, ...tags];
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const deleteOneTag = (id) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const editOneTag = (id, tag) => {
    const updatedTags = tags.map((t) => {
      if (t.id === id) {
        return tag;
      } else {
        return t;
      }
    });
    localStorage.setItem("tags", JSON.stringify(updatedTags));
    console.log("edit One Contact Function!");
  };

  const getProperTags = () => {
    const properTags = [];
    forSubmitContactTagsCheckboxes.forEach((item) => {
      if (item[Object.keys(item)[0]] == true) {
        properTags.push(Object.keys(item)[0]);
      }
    });
    return properTags;
  };

  useEffect(() => {
    if (editContactMode) {
      const targetContact = contacts.filter((c) => c.id == editedContactId);

      const updatedCheckBoxes = forSubmitContactTagsCheckboxes.map((item) => {
        if (targetContact[0].tags.indexOf(Object.keys(item)[0]) > -1) {
          return { [Object.keys(item)[0]]: true };
        } else {
          return item;
        }
      });
      setForSubmitContact(targetContact[0]);
      setForSubmitContactTagsCheckboxes(updatedCheckBoxes);
      editContactModeNavigate("addEditContact");
    }
  }, [editContactMode]);

  useEffect(() => {
    if (editTagMode) {
      const targetTag = tags.filter((t) => t.id == editedTagId);
      setForSubmitTag(targetTag[0]);
    }
  }, [editTagMode]);

  // to correctly update two related state (forSubmitContact and contacts)
  useEffect(() => {
    setForSubmitContact({
      id: nanoid(),
      name: "",
      email: "",
      tags: [],
    });

    if (tags) {
      setForSubmitContactTagsCheckboxes(
        tags.map((t) => {
          return { [t.label]: false };
        })
      );
    } else {
      setForSubmitContactTagsCheckboxes([]);
    }
  }, [contacts]);

  useEffect(() => {
    // to be ready to create a new tag (tags page)
    setForSubmitTag({ id: nanoid(), label: "", color: "" });

    // to properly handle choosing tags for a new/edited contact (addEdit contact page)
    if (tags) {
      setForSubmitContactTagsCheckboxes(
        tags.map((t) => {
          return { [t.label]: false };
        })
      );
    } else {
      setForSubmitContactTagsCheckboxes([]);
    }
  }, [tags]);

  useEffect(() => {
    setForSubmitContact({ ...forSubmitContact, tags: getProperTags() });
  }, [forSubmitContactTagsCheckboxes]);

  useEffect(() => {
    // localStorage.setItem("contacts", JSON.stringify(contacts));
    // localStorage.setItem("tags", JSON.stringify(tags));

    if (
      JSON.parse(localStorage.getItem("tags")) == null &&
      JSON.parse(localStorage.getItem("contacts")) == null
    ) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
      localStorage.setItem("tags", JSON.stringify(tags));
    }
    getAllContacts();
    getAllTags();
  }, []);

  // RELATED TO SEARCH AND FILTER (not implement)
  // useEffect(() => {
  //   setFilteredContacts(contacts);
  // }, [contacts]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<SharedLayout editContactMode={editContactMode} />}
        >
          <Route
            index
            element={
              <ContactsListPage
                contacts={contacts}
                allTags={tags}
                deletContactHandler={deletContactHandler}
                editContactHandler={editContactHandler}
                // searchValue={searchValue}
                // setSearchValue={setSearchValue}
                // filteredContacts={filteredContacts}
                // setFilteredContacts={setFilteredContacts}
              />
            }
          />
          <Route
            path="addEditContact"
            element={
              <AddEditContactPage
                submitHandlerContact={submitHandlerContact}
                inputChangeHandlerContact={inputChangeHandlerContact}
                forSubmitContact={forSubmitContact}
                contactTagsChangeHandler={contactTagsChangeHandler}
                editContactMode={editContactMode}
                allTags={tags}
                forSubmitContactTagsCheckboxes={forSubmitContactTagsCheckboxes}
                contacts={contacts}
              />
            }
          />
          <Route
            path="tags"
            element={
              <TagsPage
                allTags={tags}
                forSubmitTag={forSubmitTag}
                inputChangeHandlerTag={inputChangeHandlerTag}
                submitHandlerTag={submitHandlerTag}
                deleteTagHandler={deleteTagHandler}
                editTagHandler={editTagHandler}
                editTagMode={editTagMode}
                handleTagColorChange={handleTagColorChange}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
