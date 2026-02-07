import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "@mui/icons-material";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  )
};

export default App
