<template>
  <div>
    <v-navigation-drawer color="primary" v-model="drawer" app>
      <div v-if="currentUser">
        <v-card class="mx-auto" max-width="200" tile mdi-account-circle>
          <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="65" tile>
                  <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" class="circle"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="title">{{ currentUser.email }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </div>
      <ul>
        <router-link tag="li" to="/">
          <v-icon color="grey">home</v-icon>Home
        </router-link>
        <router-link tag="li" to="/menu">
          <v-icon color="grey">mdi-dialpad</v-icon>Menu
        </router-link>
        <router-link tag="li" to="/about">
          <v-icon color="grey">info</v-icon>About
        </router-link>
        <router-link tag="li" to="/login">
          <v-icon color="grey">person</v-icon>Login
        </router-link>
        <router-link tag="li" v-if="currentUser" to="/orders" class="warning--text">
          <v-icon color="warning">assignment</v-icon>Orders
        </router-link>
        <router-link tag="li" to="/admin" class="grey--text">
          <v-icon color="grey">lock</v-icon>Admin
        </router-link>
      </ul>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="headline">
        <div class="sidebar-brand-text mx-0 text-uppercase">
          Duck
          <sup class="grey--text">Village</sup>
        </div>
        <!-- <span>Duck</span>
        <span class="font-weight-light">Village</span>-->
      </v-toolbar-title>
    </v-app-bar>
    <!--<div class="sidebar-brand-text mx-3 text-uppercase">Duck<sup>Village</sup></div>-->
  </div>
</template>
<script>
//import { dbMenuAdd } from '../../firebase'
import firebase from "firebase";
import "firebase/firestore";
import store from "@/store/index.js";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    store.dispatch("setUser", user);
  } else {
    // No user is signed in.
    store.dispatch("setUser", null);
  }
});

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>
<style lang="scss" scoped>
nav ul {
  padding: 0;
  margin-top: 20px;
  text-decoration: none;
}
nav li {
  color: whitesmoke;
  margin-left: 15%;
  padding: 5px 20px;
  list-style-type: none;
  cursor: pointer;
}
nav li i {
  margin-right: 10px;
}
nav li:last-child {
  position: absolute;
  bottom: 20px;
  color: whitesmoke;
}
</style>
    
    
    
   