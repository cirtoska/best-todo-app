import Alert from "../Alert/Alert";
import React from "react";

const GroceryForm = ({
  handleSubmit,
  name,
  setName,
  date,
  setDate,
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
      <div className="form-row">
        <input
          type="text"
          className="input-field"
          placeholder="e.g. buy groceries"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="datetime-local"
          className="input-field date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="btn-submit">
          {isEditing ? "edit" : "+ add new"}
        </button>
      </div>
    </form>
  );
};

export default GroceryForm;
