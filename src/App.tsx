import './App.css'
import {Route, Routes} from "react-router-dom";
import ToolBar from "./components/UI/ToolBar/ToolBar.tsx";
import Categories from "./containers/Categories/Categories.tsx";
import Home from "./containers/Home/Home.tsx";

const App = () => {

  return (
    <>
      <ToolBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  )
};

export default App
