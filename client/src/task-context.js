import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SelectedTaskContext = createContext();
export const SelectedTaskProvider = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState('TODAY');

  return (
    <SelectedTaskContext.Provider
      value={{ selectedTask, setSelectedTask }}
    >
      {children}
    </SelectedTaskContext.Provider>
  );
};

export const useSelectedTaskValue = () => useContext(SelectedTaskContext);

SelectedTaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
