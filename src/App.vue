<template>
  <v-app id="App">
    <navigation />
    <v-content>
      <!--<v-container
        class="fill-height"
        fluid>
      </v-container>-->
      <router-view></router-view>
    </v-content>
    <!-- <v-footer
      color="orange"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>-->
  </v-app>
</template>
<script>
import Navigation from "./components/Navigation";
export default {
  components: {
    Navigation
  },

  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>--
<style lang="scss">
main {
  background-image: url("./assets/slide1.jpeg");
  background-size: cover;
}

h1 {
  @include infobox_mixin(0px, grey, 0px, 0px, white);
  font-weight: bold;
  font-size: 16;
  text-align: left;
}
.col:last-child h1 {
  text-align: left;
}
#info {
  background-color: white;
  border-radius: 0.3rem;
}
</style>
