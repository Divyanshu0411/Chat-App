import "./App.css";
import Homepage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;