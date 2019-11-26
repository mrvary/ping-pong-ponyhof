import React from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const socket = io("http://localhost");

  return (
    <div className="App">
      <h1>Woo, you see me!</h1>
      <div id="output"></div>
      <button id="send">Say yo</button>

      <script src="/socket.io/socket.io.js"></script>
    </div>
  );
}

export default App;
