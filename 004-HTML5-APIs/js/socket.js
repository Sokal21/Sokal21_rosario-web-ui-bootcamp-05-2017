var connection = new WebSocket('ws://echo.websocket.org');

function sendMessage() {
  let msg = document.querySelector(".echoMessage").value;
  connection.send(msg);
}

connection.onopen = function () {
  connection.send('Ping');
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};
