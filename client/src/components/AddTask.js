import React, { useState } from 'react';

export const AddTask = (props) => {
    const [taskName, setTaskName] = useState('');
    const [show, setShow] = useState(false);

    async function addTask(e) {
        if (taskName !== ''){
            e.preventDefault();
            const taskObj = {taskName: taskName};
            await fetch("http://localhost:5000/add/task/", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(taskObj),
            })
            .then(() => {
                props.setTasks(prev => [taskName, ...prev]);
            })
            .catch(error => {
                window.alert(error);
                return;
            });
        }
        setTaskName('');
        setShow(false);
    };

    return (
        <div className="add-task" data-testid="add-task">
            {show && <div className="add-task__input" data-testid="add-task-inner">
                <input
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="add-task__name"
                    data-testid="task-name"
                    type="text"
                    placeholder="Name your task"
                />
                <button
                    className="add-task__submit"
                    type="button"
                    onClick={addTask}
                    data-testid="add-task-submit"
                >
                    Add Task
                </button>
                <span
                    aria-label="Cancel adding task"
                    data-testid="hide-task-overlay"
                    className="add-task__cancel"
                    onClick={() => setShow(false)}
                    role="button"
                    tabIndex={0}
                >
                    Cancel
                </span>
            </div>}

            <span className="add-task__plus">+</span>
            <span
                aria-label="Add Task"
                data-testid="add-task-action"
                className="add-task__text"
                onClick={() => setShow(true)}
                role="button"
                tabIndex={0}
            >
                Add Task
            </span>
        </div>
    );
};