import IO from "socket.io-client";
// import { socket_2 } from './socketClient';

console.log("enter socket 2 file => ");

const API_URI_2 = `http://28632861c3e9.ngrok.io`;

// socket config
export let socket_2;

if (!socket_2) {
    socket_2 = IO(API_URI_2, { forceNew: true });
}

// if (socket_2) {
socket_2.on("connect", () => {
    console.log("Connection for 2");
});

socket_2.on("startQuestion", (data) => {
    console.log("Game Socket=========> ", data);
});
