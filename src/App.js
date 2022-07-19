import logo from "./logo.svg";
import "./App.css";
<<<<<<< HEAD
import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./page/Page";
=======
import Body from "./components/Body/body.js";
// import Header from "./components/Header/header.js";
>>>>>>> 8b5877128bd55784622760f60888bbbeda973a52

function App() {
  return (
    <Routes>
      <Route path="/manga/:id" element={<Page />} />
      <Route path="/" element={<Body />}></Route>
    </Routes>
  );
}

export default App;
