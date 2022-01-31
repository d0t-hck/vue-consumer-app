<template>
  <div class="container-fluid" id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/sign-in" class="nav-link">Sign-In</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sign-up" class="nav-link">Sign-Up</router-link>
          </li>
        </div>
        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li v-if="isAdmin" class="nav-item">
            <router-link to="/manage" class="nav-link">Manage</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{currentUser.user}}
            </a>
            <div class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
              <router-link to="/profile" class="dropdown-item">
                Profile
              </router-link>
              <a class="dropdown-item" @click="logout">Sign Out</a>
            </div>
          </li>
        </div>
      </div>
    </nav>
  </div>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser["role"]) {
        return this.currentUser["role"].includes("Admin");
      }
      return false;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/sign-in");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0;

  a {
    font-weight: bold;
    color: #8b8b8b;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
