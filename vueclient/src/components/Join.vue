<template>
  <div class="join">
    <div class="col-12">
      <div class="col-md-4 offset-md-4 container shadow p-3 col-11">
        <form class="form-horizontal" id="form">
          <div class="col-12 p-3">
            <header>Join Game</header>
            <hr>
            <form class="form-horizontal" id="form" @submit="submit">
              <div class="col-12 mb-5">
                <label>Game ID:</label>
                <input type="text" class="form-control" v-model="game.gameid">
              </div>

              <div class="col-12 mb-5">
                <label>Name:</label>
                <input type="text" class="form-control" v-model="game.name">
              </div>

              <div class="col-12 d-flex">
                <div class="col-6">
                  <button class="action-btn btn-success">Submit</button>
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
      <div class="footer fixed-bottom">
        <p class="pt-1">@ 2019, calipsa</p>
      </div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";

export default {
  name: "Join",
  data() {
    return {
      game: {
        gameid: "",
        name: ""
      },
      socket: io("127.0.0.1:3000")
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (!this.game.name || !this.game.gameid) {
        this.$toasted.show("fill both fields");
        return;
      }
      this.socket.emit("joinGame", {
        room: this.game.gameid,
        name: this.game.name
      });
    }
  },
  mounted() {
    this.socket.on("error", msg => {
      this.$toasted.show(msg.message);
    });

    this.socket.on("playerJoined", msg => {
      sessionStorage.setItem("gameJoinDetails", JSON.stringify(msg));
      this.$router.push("/player1");
    });
  }
};
</script>

