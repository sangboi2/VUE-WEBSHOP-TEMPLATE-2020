<template>
  <div class="Team">
    <!--<v-alert dense color="#d8f7eb" class="alert black--text pl-6">
      I'm a dense alert with the
      <strong>text</strong> prop and a
      <strong>type</strong> of customize by sangbawi
    </v-alert>-->
    <h3 class="subheading black--text pt-3 pl-6">Latest products</h3>
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-left ma-2">
            <v-card-title class="black--text">Top western road trips</v-card-title>
            <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>
            <v-responsive class="pt-4 pl-4">Image goes here</v-responsive>
            <v-card-text>
              <div class="subheading">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary">
                <v-icon small left>message</v-icon>
                <span small class="text-capitalize">See more</span>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <!-- <v-container grid-list-xs fluid>
    <v-layout align-center class="info_box">
      <v-flex sm2 xs12 offset-sm-10>
        <h1>Home page</h1>
        <div>
          <p>Buy our Duck Standard</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout align-center class="info_box row wrap">
      <v-flex sm2 offset-sm-0 ml-0 mr-5>
        <h1>Duck one</h1>
        <div>
          <p>Buy our Duck Standard</p>
        </div>
      </v-flex>
      <v-flex sm2 xs12 mr-5>
        <h1>Duck two</h1>
        <div>
          <p>Buy our Duck Standard</p>
        </div>
      </v-flex>
      <v-flex sm2 xs12>
        <h1>Duck 3</h1>
        <div>
          <p>Buy our Duck Standard</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>-->
</template>

<script>
//import HelloWorld from '../components/HelloWorld';
export default {
  data() {
    return {
      team: [
        { name: "The Net Ninja", role: "Web Developer" },
        { name: "Gyu", role: "Web Developer" },
        { name: "Ghanddi", role: "Web Developer" },
        { name: "Trump", role: "Chairman" },
        { name: "Obama", role: "President" },
        { name: "Obama", role: "President" },
        { name: "Obama", role: "President" },
        { name: "Obama", role: "President" },
        { name: "Obama", role: "President" },
        { name: "Obama", role: "President" },
        { name: "Obama", role: "President" },
        { name: "Obama", role: "President" }
      ]
    };
  }

  /* name: 'HelloWorld', */

  //data: () => ({
  // ecosystem: []
  //})
};
</script>
<style lang="scss">
/* .info_box .flex h1 {
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
} */
.alert {
  border-radius: inherit !important;
  color: #d8f7eb !important;
}
</style>





