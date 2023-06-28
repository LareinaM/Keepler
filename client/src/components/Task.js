import React from 'react';

export const Task = (props) => {
    const taskName = props.taskName;
    const lower = props.taskName.toLowerCase();
    const upper = props.taskName.toUpperCase();
    return (
        <li
            data-testid={lower}
            className={props.active === lower ? 'active' : undefined}
        >
            <div
                data-testid={lower + "-action"}
                aria-label={taskName}
                tabIndex={0}
                role="button"
                onClick={() => {
                    props.setActive(lower);
                    props.setSelectedTask(upper);
                }}
            >
                <span>
                    {props.icon}
                </span>
                <span>{taskName}</span>
            </div>
        </li>
    );
};