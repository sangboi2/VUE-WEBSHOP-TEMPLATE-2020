<template>
<v-container grid-list-xs>
    <v-layout align-center class="info_box">
          <v-flex sm2 xs12 offset-sm-9>
              <h1>
                Home page
              </h1>
              <div>
                <p>
                  Buy our Duck Standard
                </p>
              </div>
          </v-flex>
    </v-layout>
    <v-layout align-center class="info_box row wrap">
          <v-flex sm2 offset-sm-0 ml-12 mr-5>
              <h1>
                Duck one
              </h1>
              <div>
                <p>
                  Buy our Duck Standard
                </p>
              </div>
          </v-flex>
          <v-flex sm2 xs12 mr-5>
              <h1>
                Duck two
              </h1>
              <div>
                <p>
                  Buy our Duck Standard
                </p>
              </div>
          </v-flex>
          <v-flex sm2 xs12>
              <h1>
                Duck 3
              </h1>
              <div>
                <p>
                  Buy our Duck Standard
                </p>
              </div>
          </v-flex>
    </v-layout>
</v-container>
</template>

<script>
//import HelloWorld from '../components/HelloWorld';
  export default {
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        
      ]
    }),
  }
</script>
<style lang="scss">
  .info_box .flex h1{
    @include infobox_mixin(1px, grey, 1px, 5px, white);
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16;
    text-align: center;
  }
  .info_box .flex div {
    background-color: white;
    padding: 20px;

  }
  .layout:first-child {
    height: 40vh;
  }
  .layout:last-child {
    height: 40vh;
  }
</style>
