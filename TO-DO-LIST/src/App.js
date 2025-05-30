import React, { useState, useEffect } from "react";
import "./App.css";
import { Footer } from "./MyComponents/Footer";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Sidebar } from "./MyComponents/Sidebar";  // <== Import Sidebar
import confetti from 'canvas-confetti';

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);
  const [currentQuote, setCurrentQuote] = useState("");

  const quotes = [
    "One task at a time, you've got this!",
    "Small steps lead to big wins.",
    "Conquer the chaos, one task at a time!",
    "Keep going, you're doing great!",
    "Focus. Breathe. Achieve.",
  ];

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, desc) => {
    let sno = todos.length > 0 ? todos[todos.length - 1].sno + 1 : 1;
    const myTodo = { sno: sno, title: title, desc: desc };
    setTodos([...todos, myTodo]);

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#E27396', '#6D9F71', '#FFDBE5']
    });
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  return (
<>
  <Sidebar />
  <div style={{ marginLeft: "250px" }}>
    <header>📝 Whack-a-Task </header>
    <p className="quote">{currentQuote}</p>
    <div className="container">
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </div>
    <Footer />
    <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
  </div>
</>

  );
}

export default App;
