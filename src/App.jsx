import { useEffect, useState } from "react";
import GroceryForm from "./components/TaskForm/TaskForm";
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
  const [date, setDate] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [sortAZ, setSortAZ] = useState(1);
  const [filterByDate, setFilterByDate] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusChange = (newStatus) => {
    setFilterStatus(newStatus);
  };

  let filteredList = [...list];
  if (filterStatus === "completed") {
    filteredList = filteredList.filter((list) => list.status);
  } else if (filterStatus === "active") {
    filteredList = filteredList.filter((list) => !list.status);
  }

  const handleToggleAZ = () => {
    setSortAZ(sortAZ * -1);
    const sortedAZList = [...list].sort((a, b) => {
      if (a.title < b.title) return -1 * sortAZ;
      if (a.title > b.title) return 1 * sortAZ;
      return 0;
    });
    setList(sortedAZList);
  };

  const handleToggleDate = () => {
    setFilterByDate(filterByDate * -1);
    const sortedListByDate = [...list].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return -1 * filterByDate;
      if (dateA > dateB) return 1 * filterByDate;
      return 0;
    });
    setList(sortedListByDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name, date: date };
          }
          return item;
        })
      );
      setName("");
      setDate("");
      setEditId(null);
      setIsEditing(false);
    } else {
      showAlert(true, "success", "task added to the list");

      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        date: date,
        status: false,
      };

      setList([...list, newItem]);
      setName("");
      setDate("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const markDone = (id) => {
    showAlert(true, "success", "task completed");
    setList(
      list.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "task removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const findItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(findItem.title);
    setDate(findItem.date);
  };

  const cancelEditItem = () => {
    isEditing(false);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <main className="section-center">
        <GroceryForm
          handleSubmit={handleSubmit}
          name={name}
          date={date}
          setDate={setDate}
          setName={setName}
          isEditing={isEditing}
          {...alert}
          showAlert={showAlert}
          list={filteredList}
        />

        {list.length > 0 && (
          <>
            <List
              items={filteredList}
              removeItem={removeItem}
              editItem={editItem}
              cancelEditItem={cancelEditItem}
              markDone={markDone}
              handleToggleAZ={handleToggleAZ}
              handleToggleDate={handleToggleDate}
              handleStatusChange={handleStatusChange}
            />
            <button className="btn-clear" onClick={clearList}>
              Clear Items
            </button>
          </>
        )}
      </main>
    </>
  );
}

export default App;
