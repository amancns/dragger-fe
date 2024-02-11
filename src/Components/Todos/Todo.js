import React, { useState } from "react";
import TodoServices from "../../Services/TodoServices";
import "../../Styles/Todo.css";

const Todo = () => {
  const [text, setText] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await TodoServices.postNotesData({
        user: text,
      });
      console.log(response)
      window.location.reload();
    } catch (error) {
      console.error("POST Request Error:", error);
    }
  };

  console.log('text',text)
  return (
    <div className="input-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Your Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Todo;
