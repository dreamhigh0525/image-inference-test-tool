<template>
  <Upload msg="Allegro Model Test" />
</template>

<script>
import Upload from './components/Upload.vue';

export default {
  name: 'App',
  components: {
    Upload
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*text-align: center;*/
}
</style>
