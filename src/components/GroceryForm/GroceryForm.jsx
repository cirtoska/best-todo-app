import Alert from "../Alert/Alert";
import React from "react";

const GroceryForm = ({
  handleSubmit,
  name,
  setName,
  isEditing,
  type,
  msg,
  show,
  list,
  showAlert,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {show && (
        <Alert type={type} msg={msg} list={list} showAlert={showAlert} />
      )}
      <div>
        <h1>Grocery List</h1>
        <input
          type="text"
          className="grocery"
          placeholder="e.g. lemons"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-submit">
          {isEditing ? "edit" : "submit"}
        </button>
      </div>
    </form>
  );
};

export default GroceryForm;
