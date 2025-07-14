import { io } from "socket.io-client";

function getCookie(name) {
  const cookieStr = document.cookie;
  const cookies = cookieStr.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

const socket = io("http://localhost:9000", {
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});

socket.on("reconnect_attempt", (attempt) => {
  socket.auth.token = getCookie("token");
  console.log(`Reconnection attempt #${attempt}`);
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("reconnect_error", (err) => {
  console.error("Reconnection error:", err);
});

socket.on("reconnect_failed", () => {
  console.error("Reconnection failed");
});

export default socket;
