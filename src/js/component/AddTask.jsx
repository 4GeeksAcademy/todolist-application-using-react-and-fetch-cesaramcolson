import React from "react";

const AddTask = ({ newTask, setNewTask, addTask }) => {
    return (
        <li>
            <input 
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder="Add a new task"
            />
        </li>
    );
};

export default AddTask;


