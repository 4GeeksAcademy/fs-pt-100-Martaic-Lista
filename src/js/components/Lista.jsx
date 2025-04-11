import React, { useEffect, useState } from "react";

export const Lista = () => {
    const [data, setData] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        fetch("https://playground.4geeks.com/todo/users/minigoca",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            .then(() => fetch("https://playground.4geeks.com/todo/users/minigoca"))
            .then(response => response.json())
            .then(tasks => setData(tasks.todos))
            .catch(error => console.error("Error al obtener tareas", error));
    }, []);

    const addTask = (e) => {
        e.preventDefault();
        if (task.trim() === "") return;

        fetch("https://playground.4geeks.com/todo/todos/minigoca", {
            method: "POST",
            body: JSON.stringify({ label: task, done: false }),
            headers: { "Content-Type": "application/json" }
        })
            .then(() => fetch("https://playground.4geeks.com/todo/users/minigoca"))
            .then(response => response.json())
            .then(tasks => setData(tasks.todos))
            .catch(error => console.error("Error al agregar tarea", error));

        setTask("");
    };

    const deleteTask = (taskId) => {
        fetch(`https://playground.4geeks.com/todo/todos/${taskId}`,
            { method: "DELETE" })
            .then(() => fetch("https://playground.4geeks.com/todo/users/minigoca"))
            .then(response => response.json())
            .then(tasks => setData(tasks.todos))
            .catch(error => console.error("Error al eliminar tarea", error));
    };

    const clearAllTasks = () => {
        fetch("https://playground.4geeks.com/todo/users/minigoca",
            { method: "DELETE" })
            .then(() => setData([]))
            .catch(error => console.error("Error al eliminar todas las tareas", error));
    };

    return (
        <div className="lista-container">
            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="No hay tareas, añadir tareas"
                    className="task-input"
                />
                <button type="submit" className="add-button">Agregar</button>
            </form>
            <ul className="task-list">
                {data.map((el) => (
                    <li key={el.id} className="task-item">
                        {el.label}
                        <span
                            onClick={() => deleteTask(el.id)}
                            className="delete-button"
                        >
                            <i className="fa-solid fa-trash"></i>
                        </span>
                    </li>
                ))}
            </ul>
            {data.length > 0 && (
                <button onClick={clearAllTasks} className="clear-button">
                    Elimina las tareas <i className="fa-solid fa-ban"></i>
                </button>
            )}
        </div>
    );
};

