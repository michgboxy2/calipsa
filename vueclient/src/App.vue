<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// // import HelloWorld from './components/HelloWorld.vue';
// import Game from './components/Create.vue'
// import Join from './components/Join.vue'


export default {
//   name: 'app',
//   components: {
//     Join
//   }
}
</script>

<style>
body{
    /* background-image: linear-gradient(to top left,black,grey); */
    background-repeat: no-repeat;
    height: -webkit-fill-available;
    width: 100%;
    font-family: 'Comfortaa', cursive;
    background-color: #242a44;

}

.creator,
.join{
    /* background-image: linear-gradient(to right,#171515,white); */
    background-repeat: no-repeat;
    height: -webkit-fill-available;
    width: 100%;
    background-color: #242a44;
}

.card-id{
    text-align: left;
    height: auto;
    background-color: black;
    color: white;
}

.action-btn{
    width: 100%;
    height: auto;
    color: white;
}

.chat-container{
    width: 100%;
    height: 550px;
    overflow: scroll;
}

.modal-dialog{
    margin-top:15%;
}

.card-id:hover{
    background-color: grey;
}

.container{
    background:whitesmoke;
    margin-top: 15%;
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
    border-radius: 3px;
    /* margin-left: 30%; */
}

button{
    height: 100px;
}

.btn-success,
.btn-info{
    border-radius: 50px;
    font-weight: bold;
    font-size: 20px;
}

.btn-success a,
.btn-info a{
    text-decoration: none;
    color: white;
}

header{
    font-size:25px;
    text-align:center;
}

ul.striped-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    max-width: 100%;
}

ul.striped-list>li {
    border-bottom: 1px solid rgb(221, 221, 221);
    padding: 6px;
}

ul.striped-list>li:nth-of-type(odd) {
    background-color: black;
    color: white;
}

ul.striped-list>li:last-child {
    border-bottom: none;
}

.put-right{
    text-align: right;
}

.footer{
    background-color: white;
    text-align:center;
}

.player1{
    background-color: white;
    color: black;
    height: -webkit-fill-available;
    border-radius: 2px;
}

.input-container button{
    border-radius: 2px;
    font-size: 15px;
}
/* .chat-line{
    line-height: 1px;
} */
</style>
