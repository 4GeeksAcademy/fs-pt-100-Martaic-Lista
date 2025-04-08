import React, { useEffect, useState } from "react";

export const Lista = () => {
    const [data, setData] = useState([]);
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") return;
        setData([...data, { task, id: Math.floor(Math.random() * 99999999) }]);
        setTask(""); //
    };

    const handleClick = (index) => {
        const aux = data.filter((_, i) => i !== index);
        setData(aux);
    };

    return (
        <div className="lista-container">
            <form onSubmit={handleSubmit} className="task-form">
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
                {data.map((el, i) => (
                    <li key={el.id} className="task-item">
                        {el.task}
                        {el.task !== "" && (
                            <span 
                                onClick={() => handleClick(i)} 
                                className="delete-button"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
