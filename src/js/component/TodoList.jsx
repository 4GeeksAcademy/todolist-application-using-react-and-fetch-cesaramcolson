import React, { useState } from "react";
import TaskInput from "./AddTask.jsx";
import TaskItem from "./TaskItem.jsx";
import TaskCount from "./TaskCount.jsx";

const TodoList = () => {
    const [ newTask, setNewTask ] = useState("");
    const [ tasksList, setTasksList ] = useState([]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasksList([...tasksList, newTask]);
            setNewTask("");
        }
    };

    const removeTask = (index) => {
        setTasksList(tasksList.filter((t, currentIndex) => index !== currentIndex));
    };

    return (
		<>
        <div className="container stack-top">
            <h1>Morning todos</h1>
            <ul>
                <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
                {tasksList.map((item, index) => (
                    <TaskItem key={index} item={item} index={index} removeTask={removeTask} />
                ))}
            </ul>
            <TaskCount tasksList={tasksList} />
        </div>
		<div className="footer1"></div>
		<div className="footer2"></div>
		</>
    );
};

export default TodoList;