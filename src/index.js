import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ObservableTodoStore from "./store";

export const StoreContext = React.createContext();

ReactDOM.render(
    <StoreContext.Provider value={new ObservableTodoStore}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('root')
);


