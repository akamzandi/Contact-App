import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import ContactsListPage from "./Pages/ContactsListPage";
import SharedLayout from "./Components/SharedLayout";
import AddEditContactPage from "./Pages/AddEditContactPage";
import { nanoid } from "nanoid";
import TagsPage from "./Pages/TagsPage";

function App() {
  const [contacts, setContacts] = useState(null);
  const [editedContactId, setEditedContactId] = useState(null);
  const [editContactMode, setEditContactMode] = useState(false);
  const [forSubmitContact, setForSubmitContact] = useState();
  const [forSubmitContactTagsCheckboxes, setForSubmitContactTagsCheckboxes] =
    useState([]);
  const [tags, setTags] = useState(null);
  const [forSubmitTag, setForSubmitTag] = useState();
  const [editedTagId, setEditedTagId] = useState(null);
  const [editTagMode, setEditTagMode] = useState(false);
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
      alert("Contact Edited!");
      editContactModeNavigate("/");
      setEditContactMode(false);
    } else {
      createOneContact(forSubmitContact);
      getAllContacts();
      alert("Contact Created!");
    }
  };

  const submitHandlerTag = (e) => {
    e.preventDefault();
    if (editTagMode) {
      editOneTag(editedTagId, forSubmitTag);
      getAllTags();
      setEditedTagId(null);
      alert("Tag Edited!");
      setEditTagMode(false);
    } else {
      createOneTag(forSubmitTag);
      getAllTags();
      alert("Tag Created!");
    }
  };

  const deletContactHandler = (id) => {
    deleteOneContact(id);
    getAllContacts();
    alert("Contact Deleted!");
  };

  const editContactHandler = (id) => {
    setEditedContactId(id);
    setEditContactMode(true);
  };

  const deleteTagHandler = (id) => {
    deleteOneTag(id);
    getAllTags();
    alert("Tag Deleted!");
  };

  const editTagHandler = (id) => {
    setEditedTagId(id);
    setEditTagMode(true);
  };

  const getAllContacts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/contacts`);
      // console.log(data);
      setContacts(data);
    } catch (error) {
      console.log("get all contacts function - ", error);
    }
  };

  const deleteOneContact = async (id) => {
    try {
      const contactDeletionResp = await axios.delete(
        `http://localhost:3001/contacts/${id}`
      );
      // console.log(contactDeletionResp);
    } catch (error) {
      console.log("delete one contact function - ", error);
    }
  };

  const createOneContact = async (contact) => {
    try {
      const createContactResp = await axios.post(
        `http://localhost:3001/contacts/`,
        contact
      );
      // console.log(createContactResp);
    } catch (error) {
      console.log("create one contact function - ", error);
    }
  };

  const editOneContact = async (id, contact) => {
    try {
      await axios.put(`http://localhost:3001/contacts/${id}`, contact);
    } catch (error) {
      console.log("edit one contact function - ", error);
    }
  };

  const getAllTags = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/tags`);
      setTags(data);
    } catch (error) {
      console.log("get all tags function - ", error);
    }
  };

  const createOneTag = async (tag) => {
    try {
      await axios.post(`http://localhost:3001/tags`, tag);
    } catch (error) {
      console.log("create one tag function - ", error);
    }
  };

  const deleteOneTag = async (id) => {
    try {
      const deleteTagResp = await axios.delete(
        `http://localhost:3001/tags/${id}`
      );
      // console.log(deleteTagResp);
    } catch (error) {
      console.log("delete one tag function - ", error);
    }
  };

  const editOneTag = async (id, tag) => {
    try {
      const editTagResp = await axios.put(
        `http://localhost:3001/tags/${id}`,
        tag
      );
    } catch (error) {
      console.log("edit one tag function - ", error);
    }
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
    getAllContacts();
    getAllTags();
  }, []);

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
