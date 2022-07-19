import logo from "./logo.svg";
import "./App.css";
import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./page/Page";

function App() {
  return (
    <Routes>
      <Route path="/manga/:id" element={<Page />} />
      <Route path="/" element={<Body />}></Route>
    </Routes>
  );
}

export default App;
