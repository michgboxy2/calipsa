<template>
  <div class="creator">
    <div class="col-12">
      <div class="col-md-4 offset-md-4 container shadow p-3">
        <form class="form-horizontal" id="form">
          <div class="col-12 p-3">
            <header>Creator</header>
            <hr>
            <form class="form-horizontal" id="form" @submit="submit">
              <div class="col-12 mb-5">
                <label>Your name:</label>
                <input type="text" class="form-control" id="name" v-model="game.name">
              </div>

              <div class="col-12 mb-5">
                <label>Give a word:</label>
                <input type="text" class="form-control" id="word" v-model="game.word">
              </div>

              <div class="col-12 d-flex">
                <div class="col-6">
                  <button class="action-btn btn-success">
                    Submit
                  </button>
                </div>

                <div class="col-6">
                  <button class="action-btn btn-info">
                    <router-link to="/">Back</router-link>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </form>
      </div>
      <div class="footer fixed-bottom">
        <p class="pt-1">@ 2019, calipsa</p>
      </div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";

export default {
  name: "Game",
  data() {
    return {
      game: {
        name: "",
        word: ""
      },
      socket: io("127.0.0.1:3000")
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (!this.game.name || !this.game.word) {
        this.$toasted.show("Fill both fields");
        return;
      }
      this.socket.emit("createGame", this.game);
    }
  },
  mounted() {
    sessionStorage.removeItem("gameCreationDetails");
    sessionStorage.removeItem("gameJoinDetails");
    this.socket.on("newGameCreated", msg => {
      sessionStorage.setItem("gameCreationDetails", JSON.stringify(msg));
      this.$router.push("/player2");
    });
  },
  props: {
    msg: String
  }
};
</script>




