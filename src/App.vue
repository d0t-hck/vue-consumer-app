<template>
  <div id="nav">
    <nav class="navbar navbar-expand navbar-light bg-light">
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
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Profile</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logout">Sign Out</a>
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
        return this.currentUser["role"].includes("admin");
      }
      return false;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
