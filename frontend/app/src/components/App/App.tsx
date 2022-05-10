import React from 'react';
import './App.scss';
import Header from "../Header/Header";
import { set } from "../../store/filter/store";
import { useDispatch } from "react-redux";
import MapsPage from "../MapsPage/MapsPage";

function App() {
    const dispatch = useDispatch();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.filter) {
        const values = JSON.parse(params.filter);
        dispatch(set(values));
    }

    return (
        <div className="app">
            <Header/>
            <div className='app-content'>
                <MapsPage/>
            </div>
        </div>
    );
}

export default App;
