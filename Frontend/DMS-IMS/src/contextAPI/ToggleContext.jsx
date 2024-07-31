import React, { createContext, useState } from 'react';

export const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
    const [toggleState, setToggleState] = useState(false);

    return (
        <ToggleContext.Provider value={{ toggleState, setToggleState }}>
            {children}
        </ToggleContext.Provider>
    );
};
