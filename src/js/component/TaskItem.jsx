import React from "react";

const TaskItem = ({ item, index, removeTask }) => {
    return (
        <li>
            <span>{item}</span>
            <div className="icon">
                <i 
                    className="fa-solid fa-x"
                    onClick={() => removeTask(index)}
                ></i>
            </div>
        </li>
    );
};

export default TaskItem;