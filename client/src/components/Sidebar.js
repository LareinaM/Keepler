import React, { useEffect, useState } from "react";
import {
    FaInbox,
    FaRegCalendarAlt,
    FaLightbulb
} from 'react-icons/fa';
import { useSelectedTaskValue } from '../task-context';
import { AddTask } from './AddTask';
import { Task } from './Task';

export const Sidebar = () => {
    const { setSelectedTask } = useSelectedTaskValue();
    const [active, setActive] = useState('today');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/get/tasks`)
            .then(response => response.json())
            .then(actualData => {
                setTasks(actualData);
            });
    }, []);

    return (
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                <Task taskName='Today' active={active} setActive={setActive} setSelectedTask={setSelectedTask} icon={<FaInbox />} />
                <Task taskName='Thoughts' active={active} setActive={setActive} setSelectedTask={setSelectedTask} icon={<FaLightbulb />} />
                {tasks.map((task, idx) => {
                    return <Task key={idx} taskName={task.taskName} active={active} setActive={setActive} setSelectedTask={setSelectedTask} icon={<FaRegCalendarAlt />} />
                })}
            </ul>
            <AddTask setTasks={setTasks} />
        </div>
    );
};
