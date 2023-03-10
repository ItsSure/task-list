import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";
import { ListTodo } from "./components/ListTodo/ListTodo";
import { FilterTodo } from "./components/FilterTodo/FilterTodo";

function App() {
  // Sacar los todos que esten en local storage
  let stringTodos = localStorage.getItem("todos");
  let todosIniciales: any;
  if (!stringTodos) {
    todosIniciales = [];
  } else {
    todosIniciales = JSON.parse(stringTodos);
  }

  // Arreglo de todos con useState
  const [todos, guardarTodo] = useState(todosIniciales);
  const [filtrarTodo, setFiltrarTodos] = useState("all");

  // todos completados
  const completedTodos = todos.filter((todo: any) => todo.completed).length;
  const totalTodos = todos.length;

  // Funcion que agrega los todo a la lista
  const agregarTodo = (text: any) => {
    const nuevosTodos = [...todos];
    nuevosTodos.push({ text, completed: false });
    guardarTodo(nuevosTodos);
  };

  // Funcion que elimina un todo por su texto
  const eliminarTodo = (text: any) => {
    const nuevosTodos = todos.filter((todo: any) => todo.text !== text);
    guardarTodo(nuevosTodos);
  };

  // Funcion que elimina los todos marcados como completados
  const eliminarTodoCompletados = () => {
    const nuevosTodos = todos.filter((todo: any) => todo.completed !== true);
    guardarTodo(nuevosTodos);
  };

  // Funcion que marca los todo como completados
  const marcarTodo = (text: any) => {
    let nuevosTodos = todos.filter((todo: any) => todo.text === text);
    if (nuevosTodos[0].completed) {
      nuevosTodos[0].completed = false;
    } else {
      nuevosTodos[0].completed = true;
    }

    nuevosTodos = [...todos];
    guardarTodo(nuevosTodos);
  };

  // filtrar to-dos con los botones all, active y completed
  let mostrarTodos = [];
  if (filtrarTodo === "all") {
    mostrarTodos = todos;
  } else if (filtrarTodo === "active") {
    mostrarTodos = todos.filter((todo: any) => todo.completed !== true);
  } else if (filtrarTodo === "completed") {
    mostrarTodos = todos.filter((todo: any) => todo.completed !== false);
  }

  // useEffect que modifica los todos que estan en local storage cada vez que se elimina o agrega uno nuevo
  useEffect(() => {
    if (todosIniciales) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, [todos, todosIniciales]);

  // App UI
  return (
    <Fragment>
      <Header />
      <main className="main">
        <CreateTodo agregarTodo={agregarTodo} />
        <ListTodo
          completedTodos={completedTodos}
          totalTodos={totalTodos}
          mostrarTodos={mostrarTodos}
          marcarTodo={marcarTodo}
          eliminarTodo={eliminarTodo}
          eliminarTodoCompletados={eliminarTodoCompletados}
        />
        <FilterTodo setFiltrarTodos={setFiltrarTodos} />
      </main>
      <p className="drag-and-drop">Drag and drop to reorder list</p>
      <Footer />
    </Fragment>
  );
}

export default App;
