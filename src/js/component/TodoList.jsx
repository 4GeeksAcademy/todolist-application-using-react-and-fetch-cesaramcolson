import React, { useState, useEffect } from "react";
import TaskInput from "./AddTask.jsx";
import TaskItem from "./TaskItem.jsx";
import TaskCount from "./TaskCount.jsx";

const TodoList = () => {
    const [newTask, setNewTask] = useState("");
    const [tasksList, setTasksList] = useState([]);

    const createUser = () => {
        return fetch("https://playground.4geeks.com/todo/users/cesar-amcolson", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error creating user:", error);
        });
    };

    const fetchTasks = () => {
        return fetch("https://playground.4geeks.com/todo/users/cesar-amcolson", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((body) => {
            if (body && body.todos) {
                setTasksList(body.todos.map(task => ({ label: task.label, id: task.id })));
            }
        })
        .catch((error) => {
            console.error("Error fetching tasks:", error);
        });
    };

    const updateTasks = (tasks) => {
        return fetch("https://playground.4geeks.com/todo/users/cesar-amcolson", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ todos: tasks.map(task => ({ label: task.label, done: false })) })
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error updating tasks:", error);
        });
    };

    useEffect(() => {
        createUser().then(fetchTasks);
    }, []);

    const addTask = () => {
        if (newTask.trim()) {
            fetch("https://playground.4geeks.com/todo/todos/cesar-amcolson", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "label": newTask,
                    "is_done": false
                })
            })
            .then((response) => response.json())
            .then((body) => {
                const newTaskWithId = { label: newTask, id: body.id };
                setTasksList([...tasksList, newTaskWithId]);
                setNewTask("");
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
        }
    };

    const removeTask = (index) => {
        const taskToRemove = tasksList[index];
        const updatedTasks = tasksList.filter((t, currentIndex) => index !== currentIndex);
        setTasksList(updatedTasks);

        fetch(`https://playground.4geeks.com/todo/todos/${taskToRemove.id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((body) => {
        })
        .catch((error) => {
            console.error("Error deleting task:", error);
        });

        updateTasks(updatedTasks);
    };

    const deleteUser = () => {
        return fetch("https://playground.4geeks.com/todo/users/cesar-amcolson", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                setTasksList([]);
                return createUser().then(fetchTasks);
            }
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
    };

    return (
        <div className="container stack-top">
            <h1>Morning todos</h1>
            <ul>
                <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
                {tasksList.map((item, index) => (
                    <TaskItem key={index} item={item.label} index={index} removeTask={removeTask} />
                ))}
            </ul>
            <TaskCount tasksList={tasksList} />
            <div className="deleteButton">
                <button onClick={deleteUser} className="btn btn-danger">Clean All Tasks</button>
            </div>
        </div>
    );
};

export default TodoList;