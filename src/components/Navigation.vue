<template>
  <div>
    <v-navigation-drawer
      flat
      width="240"
      text
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      color="primary"
      app
    >
      <!-- <v-navigation-drawer flat color="primary" v-model="drawer" app> -->
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
                    <v-list-item-subtitle>Software Engineer</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </div>
      <ul>
        <router-link tag="li" to="/" exact>
          <v-icon color="grey">mdi-home-outline</v-icon>Start
        </router-link>
        <router-link tag="li" to="/menu" exact>
          <v-icon color="grey">mdi-layers-triple-outline</v-icon>Menu
        </router-link>
        <router-link tag="li" to="/about" exact>
          <v-icon color="grey">mdi-clipboard-alert-outline</v-icon>About
        </router-link>
        <!-- <router-link tag="li" v-if="!currentUser" to="/login" exact>
          <v-icon color="grey">mdi-login</v-icon>Login
        </router-link>-->
        <v-divider class="mt-4"></v-divider>
        <v-subheader class="grey--text">Category</v-subheader>

        <v-router-link v-if="currentUser" class="category">Internal</v-router-link>

        <router-link tag="li" v-if="currentUser" to="/orders" exact>
          <v-icon color="success">mdi-shopping-outline</v-icon>Orders
        </router-link>

        <router-link tag="li" v-if="currentUser" to="/addNew" exact>
          <v-icon color="white">mdi-plus</v-icon>Add Item
        </router-link>
        <v-divider :inset="inset"></v-divider>
        <router-link tag="li" to="/admin" exact class="grey--text">
          <v-icon color="grey">mdi-shield-lock-outline</v-icon>Dashboard
        </router-link>
      </ul>
    </v-navigation-drawer>
    <!-- Topnavbar-->
    <!-- <v-app-bar flat app color="primary" dark> -->
    <v-app-bar flat :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">
          <div class="sidebar-brand-text mx-0 text-lowercase font-weight-bold">
            <router-link to="/">
              <a class="logo">
                Mandalay
                <sup class="grey--text">Mm</sup>
              </a>
            </router-link>
          </div>
        </span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Seach what you are looking for..."
        class="hidden-sm-and-down"
      ></v-text-field>
      <!--  <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="headline">
        <div class="sidebar-brand-text mx-0 text-uppercase font-weight-bold">
          <router-link to="/">
            <a class="logo">
              Duck
              <sup class="grey--text">Village</sup>
            </a>
          </router-link>
        </div> 
        <span>Duck</span>
        <span class="font-weight-light">Village</span>
      </v-toolbar-title>-->
      <v-spacer></v-spacer>
      <router-link v-if="!currentUser" to="/login" exact>
        <v-btn text class="text-capitalize font-weight-bold">
          Log in
          <v-icon small class="ml-1" color="warning">mdi-login</v-icon>
        </v-btn>
      </router-link>
      <router-link v-if="currentUser" to="/register" exact>
        <v-btn text class="text-capitalize font-weight-bold">
          <v-icon small>mdi-plus</v-icon>Create user
        </v-btn>
      </router-link>
      <router-link v-if="currentUser" to="/" exact>
        <v-btn text @click.prevent="signOut()" class="text-capitalize font-weight-bold">
          Log out
          <v-icon small class="ml-2" color="black">mdi-logout</v-icon>
        </v-btn>
      </router-link>
      <!-- 
      <v-btn icon>
        <v-icon>mdi-cart-arrow-down</v-icon>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
        </v-avatar>
      </v-btn>-->
      <router-link to="/login" exact>
        <v-btn icon>
          <v-icon>mdi-comment-processing-outline</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/login" exact>
        <v-btn icon>
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/menu" exact>
        <v-btn icon>
          <v-icon>mdi-cart-arrow-down</v-icon>
        </v-btn>
      </router-link>
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
    drawer: null,
    basketDump: []
  }),
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Are you sure you want to log out?");
          this.$router.replace("/");
        })
        .catch(error => {
          alert(error);
        });
    }
  },
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
}
nav li {
  color: whitesmoke;
  margin-left: 0%;
  padding: 7px 15px;
  list-style-type: none;
  cursor: pointer;
}
nav li i {
  margin-right: 30px;
}
nav li:last-child {
  position: absolute;
  bottom: 20px;
  color: whitesmoke;
}
.router-link-active {
  background: inherit;
  color: #000;
  text-decoration: none;
}
.logo {
  color: lighten($color: #ffffff, $amount: 0);
  text-decoration: none;
  margin-left: 0px;
}
.signout {
  margin-right: 0px;
}
.category {
  color: #9e9e9e;
  font-size: 14px;
  font-weight: bold;
  margin-left: 17px;
}
</style>
    
    
    
   