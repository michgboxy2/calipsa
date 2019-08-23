module.exports = (io, socket, db) => {
  socket.emit("connected", { rooms: io.sockets.adapter.rooms });
  socket.on("createGame", createNewGame);
  socket.on("getRooms", getRoomsList);
  socket.on("joinGame", joinGame);
  socket.on("guess", takeaguess);
  socket.on("questions", askAQuestion);
  socket.on("exceed", exceedCount);
  socket.on("answerAQuestion", answerAQuestion);

  async function createNewGame({ word, name }) {
    var roomid = (Math.random() * 100000) | 0;
    try {
      await db.game.create({ roomid: roomid.toString(), word, creator: name });
    } catch (e) {
      return;
    }

    //emit the game details to the creator
    this.emit("newGameCreated", {
      gameId: roomid,
      mySockedId: this.id,
      guessword: word,
      status: "game created, waiting for a player to join",
      name,
      play_status: "creator"
    });

    //join the room and wait for co-player
    this.join(roomid.toString());
  }

  function joinGame({ room, name }) {
    var gameRoom = io.sockets.adapter.rooms[room];

    if (gameRoom != undefined) {
      if (gameRoom.length >= 2) {
        io.emit("error", { message: "room is full, you can't join" });
      } else {
        if (io.sockets.adapter.sids[socket.id][room] == true) {
          io.to(room).emit("error", { message: "you're already in the room" });
        } else {
          this.join(room);
          io.emit("playerJoined", {
            name,
            gameId: room,
            message: `${name}  has joined the game`,
            play_status: "joiner"
          });
        }
      }
    } else {
      io.emit("error", { message: "room does not exist" });
    }
  }

  function getRoomsList() {
    var rooms = io.sockets.adapter.rooms;
    this.emit("roomList", rooms);
  }

  async function takeaguess({ room, guess }) {
    try {
      let data = await db.game.findOne({
        where: { roomid: room },
        attributes: ["id", "roomid", "word"]
      });

      if (data.word == guess) {
        io.emit("congrats", {
          message: "Congratulations, player2 has guessed correctly"
        });
      } else {
        io.emit("gameOver", {
          message: "Player2 guess is wrong, game is over"
        });
      }
    } catch (e) {
      return;
    }
  }

  async function exceedCount() {
    io.emit("gameOver", {
      message:
        "player 2 has exceeded the number of questions allowed, game is over"
    });
  }

  async function askAQuestion({ room, question, player = null }) {
    try {
      let css_class;

      let data = await db.game.findOne({
        where: { roomid: room },
        attributes: ["id", "roomid", "word", "count"]
      });
      await db.game.update({ count: data.count++ }, { where: { id: data.id } });

      if (player === "joiner") {
        css_class = "put-right";
      }

      io.emit("question_asked", { question, css_class, player });
    } catch (e) {
      return;
    }
  }

  async function answerAQuestion({ question }) {
    io.emit("question_asked", { question });
  }
};
