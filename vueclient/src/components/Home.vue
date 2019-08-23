<template>
    <div>
        <div class="col-12">
        <div class="col-md-4 offset-md-4 container shadow p-3">
            <header>Calipsa</header>
            <form class="form-horizontal">
                <div class="col-12 p-3">
                    <button class="btn btn-success col-12 mb-5"><router-link to="/game">Game</router-link></button>
                    <button class="btn btn-info col-12 mb-2"><router-link to="/join">Join Game</router-link></button>
                </div>
            </form>
        </div>
        <div class="footer fixed-bottom">
            <p class="pt-1">@ 2019, Calipsa</p>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name : "Home"
}
</script>

