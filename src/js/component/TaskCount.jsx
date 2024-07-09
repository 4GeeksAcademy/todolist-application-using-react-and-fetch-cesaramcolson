import React from "react";

const TaskCount = ({ tasksList }) => {
    return (
        <div>
            <p>
                {tasksList.length === 0
                    ? "No pending tasks"
                    : `${tasksList.length} pending 
                    ${tasksList.length === 1 ? "task" : "tasks"}`}
            </p>
        </div>
    );
};

export default TaskCount;