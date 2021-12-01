import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import BottomNavigation from "@material-ui/core/BottomNavigation";

function App() {
  return (
    <div className="App">
      <p>This is text</p>
      <BottomNavigation />
    </div>
  );
}

export default App;
