<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> // vue 로고... -->
    <br>
    <br>
    <br>
    <modal name="hello-world">
        hello, world!
    </modal>
    <button @click="show()">버튼입니다</button>
    <router-view/>
  </div>
  
</template>

<script>
export default {
  name: 'app',
  methods : {
    show : function() {
      console.log("show?");
      this.$modal.show('Hello-world');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
