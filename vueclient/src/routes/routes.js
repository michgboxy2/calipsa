import Game from '../components/Create.vue'
import Home from '../components/Home.vue'
import Join from '../components/Join.vue'
import Player1 from '../components/Player1.vue'
import Player2 from '../components/Player2'



const routes = [
    {path: '', component: Home},
    {path: '/game', component: Game},
    {path: '/join', component: Join},
    {path: '/player1', component: Player1},
    {path: '/player2', component: Player2}
];


export default routes;