import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./page/page.js";
import Body from "./components/Body/body.js";
import HomePage from "./page/homePage";
// import Header from "./components/Header/header.js";

function App() {
  return (
    <Routes>
      <Route path="/manga/:id" element={<Page />} />
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
