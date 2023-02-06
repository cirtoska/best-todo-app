import React from "react";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import FilterData from "../FilterData/FilterData";

const List = ({
  items,
  removeItem,
  editItem,
  markDone,
  handleToggleAZ,
  handleToggleDate,
  handleStatusChange,
}) => {
  return (
    <section className="list-container">
      <FilterData
        items={items}
        handleToggleAZ={handleToggleAZ}
        handleToggleDate={handleToggleDate}
        handleStatusChange={handleStatusChange}
      />
      {items.map((item) => {
        const { id, title, status, date } = item;
        const event = new Date(date);
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formattedDate = event.toLocaleString("en-US", options);

        return (
          <article key={id} className={status ? "done list-item" : "list-item"}>
            <div className="item">
              <h3
                className={
                  status === false ? "task-name" : "task-name-completed"
                }
              >
                {title}
              </h3>
            </div>
            <div className="date">{formattedDate}</div>
            <div className="buttons">
              <button
                type="button"
                className={status ? "completed-btn" : "not-completed-btn"}
                onClick={() => markDone(id)}
                title={status === false ? "Not completed" : "Completed"}
              >
                <FaCheckCircle size="1.2rem" />
              </button>
              {item.status ? null : (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editItem(id)}
                  title="Edit"
                >
                  <FaEdit size="1.2rem" />
                </button>
              )}

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem(id)}
                title="Remove from list"
              >
                <FaTrash size="1.1rem" />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default List;
