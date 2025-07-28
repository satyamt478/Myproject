// src/App.js
import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { FindAll } from "./Component/Findall";
import { FindById } from "./Component/Findbyid";
import { Update } from "./Component/Update";
import { Delete } from "./Component/Deletefile";
import { Employee } from "./Component/Employee";
import "./Header.css";

function App() {
    return ( <
        div >
        <
        nav className = "nav-bar" >
        <
        NavLink to = "/"
        end className = "nav-link" > Add < /NavLink> <
        span className = "separator" > | < /span> <
        NavLink to = "/FindAll"
        className = "nav-link" > FindAll < /NavLink> <
        span className = "separator" > | < /span> <
        NavLink to = "/FindOne"
        className = "nav-link" > FindById < /NavLink> <
        span className = "separator" > | < /span> <
        NavLink to = "/Update"
        className = "nav-link" > Update < /NavLink> <
        span className = "separator" > | < /span> <
        NavLink to = "/deletefile"
        className = "nav-link" > Delete < /NavLink> < /
        nav >

        <
        Routes >
        <
        Route path = "/"
        element = { < Employee / > }
        /> <
        Route path = "/FindAll"
        element = { < FindAll / > }
        /> <
        Route path = "/FindOne"
        element = { < FindById / > }
        /> <
        Route path = "/Update"
        element = { < Update / > }
        /> <
        Route path = "/deletefile"
        element = { < Delete / > }
        /> < /
        Routes > <
        /div>
    );
}

export default App;