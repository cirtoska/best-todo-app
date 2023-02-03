import { useEffect, useState } from "react";
import GroceryForm from "./components/GroceryForm/GroceryForm";
import List from "./components/List/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
    } else {
      showAlert(true, "success", "item added to the list");

      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const findItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(findItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <main>
      <section className="section-center">
        <GroceryForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          isEditing={isEditing}
          {...alert}
          showAlert={showAlert}
          list={list}
        />
        {list.length > 0 && (
          <div>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="btn-clear" onClick={clearList}>
              Clear Items
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
