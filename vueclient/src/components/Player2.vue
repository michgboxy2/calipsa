<template>
  <div class="join">
    <div class="col-12 p-4">
      <div class="col-md-4 player1 m-auto">
        <div>
          <h3 class="text-center p-3">{{creator}} has created game {{gameid}}!!!!!</h3>
        </div>

        <div class="chat-container">
          <ul id="messages" class="striped-list">
            <li
              v-bind:key="i"
              v-for="(list, i) in lists"
              v-bind:class="list.css_class"
            >{{list.question}}</li>
          </ul>
        </div>
      </div>
      <div
        class="input-container col-md-4 d-flex justify-content-between fixed-bottom mr-auto ml-auto mt-auto mb-5 flex-wrap"
        v-if="status"
      >
        <div class="col-4 col-md-4 p-md-0">
          <select class="h-100" v-model="game.option">
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </div>
        <div class="d-flex col-12 col-md-7 p-md-0">
          <button
            type="Submit"
            value="Submit"
            class="btn btn-success h-100 ml-4"
            @click="answerQuestion"
          >Submit</button>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
export default {
  name: "Player2",
  data() {
    return {
      creator: JSON.parse(sessionStorage.getItem("gameCreationDetails")).name,
      gameid: JSON.parse(sessionStorage.getItem("gameCreationDetails")).gameId,
      status: false,
      socket: io("127.0.0.1:3000"),
      game: {
        option: "",
        class: "",
        player: ""
      },
      disable: true,
      lists: []
    };
  },

  methods: {
    answerQuestion() {
      this.status = false;

      var room = JSON.parse(sessionStorage.getItem("gameCreationDetails"))
        .gameId;
      if (!this.game.option) {
        this.$toasted.show("please answer the question");
        return;
      }

      this.socket.emit("answerAQuestion", {
        room,
        question: this.game.option
      });
    }
  },

  mounted() {
    this.socket.on("error", msg => {
        this.$toasted.show(msg.message);
    });

    this.socket.on("playerJoined", msg => {
      this.$toasted.show(msg.name + "has joined the game");
    });

    this.socket.on("congrats", msg => {
      this.$toasted.show("Yaaay!!!!! Player2 has guess the word correctly");
      this.$router.push("/");
    });

    this.socket.on("question_asked", msg => {
      this.lists = [...this.lists, msg];
      this.game.player = msg.player;

      if (msg.player) {
        this.status = true;
      }
    });

    this.socket.on("gameOver", msg => {
      this.$toasted.show(msg.message);
      this.$router.push("/");
      return;
    });
  }
};
</script>

