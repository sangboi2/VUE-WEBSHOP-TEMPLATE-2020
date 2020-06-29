<template>
  <div class="Productpage">
    <!--<v-alert dense color="#d8f7eb" class="alert black--text pl-6">
      I'm a dense alert with the
      <strong>text</strong> prop and a
      <strong>type</strong> of customize by sangbawi
    </v-alert>-->
    <h3 class="subheading black--text pt-3 pl-6">Product Page</h3>
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <v-col offset-md="0" md="9" class="ma-0">
          <!-- <h3 class="pl-0 black--text text-capitalize">Products</h3> -->
          <div class="pa-0" id="info">
            <v-card class="mx-auto" max-width="100%">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="400px"></v-img>

              <v-card-title>Top western road trips</v-card-title>

              <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>

              <v-card-actions>
                <v-btn text>Share</v-btn>

                <v-btn color="primary" text>Explore</v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>

                  <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
        </v-col>
        <v-col offset-md="0" md="3">
          <!--  <h3 class="pl-0 text-left text-capitalize black--text">
            Shopping cart
            <span class="float-right mr-6"></span>
          </h3>-->
          <div class="pa-2" id="info">
            <h2>Put something here</h2>
          </div>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false
  })
};
</script>