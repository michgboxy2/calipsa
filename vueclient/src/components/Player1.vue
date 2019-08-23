<template>
  <div class="join">
    <div class="col-12 p-4">
      <div class="col-md-4 player1 m-auto">
        <div>
          <h3 class="text-center p-3">Lets Play!!!!!</h3>
          <p>{{creator}} has Joined game</p>
        </div>

        <div class="chat-container">
          <ul id="messages" class="striped-list">
            <li v-bind:key="i" v-for="(list, i) in lists" v-bind:class="list.css_class">{{list.question}}</li>
          </ul>
        </div>
      </div>
      <div
        class="input-container col-md-4 d-flex justify-content-between fixed-bottom mr-auto ml-auto mt-auto mb-5 flex-wrap"
      >
        <div class="col-4 col-md-4 p-md-0">
          <select class="h-100" id="selected" v-model="game.option">
            <option value="ask">Ask Question</option>
            <option value="guess">Guess a word</option>
          </select>
        </div>
        <div class="d-flex col-12 col-md-7 p-md-0" v-if="status">
          <input
            type="text"
            class="form-control"
            placeholder="Type something......"
            id="input"
            v-model="game.input"
          >
          <button
            type="button"
            value="Submit"
            class="btn btn-success h-100 ml-4"
            id="submit"
            @click="askOrGuess"
          >Submit({{count}})</button>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
export default {
  name: "Player1",
  data() {
    return {
      creator: JSON.parse(sessionStorage.getItem("gameJoinDetails")).name,
      joiner: false,
      gameId: JSON.parse(sessionStorage.getItem("gameJoinDetails")).gameId,
      status: true,
      socket: io("127.0.0.1:3000"),
      game: {
        option: "",
        input: "",
        class: "",
        player: ""
      },
      lists: [],
      count: 0
    };
  },

  methods: {
    askOrGuess() {
        this.status = false;
      //check the number of questions asked.
      if (this.count >= 20) {
        this.socket.emit("exceed", {});
      }

      if (!this.game.option || !this.game.input) {
          this.status = true;
        this.$toasted.show("please decide to either ask a question or guess the word");
        return;
      }
      let room = JSON.parse(sessionStorage.getItem("gameJoinDetails")).gameId;
      if (this.game.option === "ask") {
        var clickCount = (this.count += 1);
        this.count = clickCount;
        this.socket.emit("questions", {
          room,
          question: this.game.input,
          player: "joiner"
        });

        //clear the fields
        this.game.input = "";
      } else {
        this.socket.emit("guess", { room, guess: this.game.input });
        this.game.input = "";
      }
    }
  },

  mounted() {
    this.socket.on("error", msg => {
      this.$toasted.show(msg.message);
      this.status = true;
   });

    this.socket.on("playerJoined", msg => {
      this.$toasted.show(msg.name + `joined game`);
    });

    this.socket.on("congrats", () => {
      this.$toasted.show("Congratulations, Player2 has guessed the right word");
      this.$router.push("/");
    });

    this.socket.on("question_asked", msg => {
        if(!msg.player){
            this.status = true;
        }
       
      this.lists = [...this.lists, msg];
      this.game.player = msg.player;
    });

    this.socket.on("gameOver", msg => {
      this.$toasted.show(msg.message);
      this.$router.push("/");
      return;
    });
  }
};
</script>

