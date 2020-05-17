import express from "express";
import { createServer } from "http";
import SocketIO from "socket.io";
import { game } from "./src/game";
import { Player } from "./src/creature";

const app = express();
const server = createServer(app);
const io = SocketIO(server);

const port = process.env.PORT ?? 3000;


server.listen(port, () => {
    console.log("Server listening at port", port);
});

let userCount = 0;

let userMap = {};




io.on("connection", socket => {
    let username;


    socket.once("add user", name => {
        while (userMap[name] == true) {
            name += '2';
        }
        userMap[name] = true;

        username = name;
        userCount++;

        console.log(name, "joined");        
        game.new_player(name);

        socket.emit("login", { userCount });
        socket.broadcast.emit("user joined", {
            username,
            userCount,
            game,   
        });
    });


    socket.once("disconnect", () => {
        if (!username) return;

        userCount--;

        console.log(username, "left");

        socket.broadcast.emit("user left", {
            username,
            userCount,
        });
    });

    socket.on("new message", message => {
        console.log(username, "sent:", message);

        io.emit("new message", {
            username,
            message,
            game,
        });
        /*socket.emit("new message", {
            username,
            message,
            game,
        });*/

        /*socket.broadcast.emit("new message", {
            username,
            message,
            game,
        });*/

        if (message[0] == '@') {
            console.log('action');
            game.push_action(username, message);
        }
        
        
    });


    socket.on("new action", (e) => {

        console.log(username, e);
        
        io.emit("new action", {
            e
        });
        /*socket.emit("new message", {
            username,
            message,
            game,
        });*/

        /*socket.broadcast.emit("new message", {
            username,
            message,
            game,
        });*/

        /*if (message[0] == '@') {
            console.log('action');
            //game.push_action(username, message);
        }*/
        
        
    });

});