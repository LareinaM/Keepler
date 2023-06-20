import React, { useState } from 'react';
import {
  FaInbox,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { useSelectedTaskValue } from '../task-context';

export const Sidebar = () => {
  const { setSelectedTask } = useSelectedTaskValue();
  const [active, setActive] = useState('today');

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="today"
          className={active === 'today' ? 'active' : undefined}
        >
          <div
            data-testid="today-action"
            aria-label="Show today tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('today');
              setSelectedTask('TODAY');
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid="thoughts"
          className={active === 'thoughts' ? 'active' : undefined}
        >
          <div
            data-testid="thoughts-action"
            aria-label="Some thoughts"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('thoughts');
              setSelectedTask('THOUGHTS');
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Thoughts</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
