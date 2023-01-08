import React from "react";
import "./CreateTodo.css";

function CreateTodo({ agregarTodo }: any) {
  // Funcion para agregar todos con la tecla enter
  const agregarTodoKeyPress = (event: any) => {
    if (event.charCode === 13 && event.target.value !== "") {
      agregarTodo(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className="createTodo">
      <div className="circulo"></div>
      <input
        className="input"
        placeholder="Create a new task..."
        onKeyPress={agregarTodoKeyPress}
      ></input>
    </div>
  );
}

export { CreateTodo };
