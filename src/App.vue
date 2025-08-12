<template>
  <div id="app">
    <!-- Navbar -->
    <nav v-if="authenticated" class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <router-link class="navbar-brand" to="/">Luna Bank</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link
                v-if="authenticated"
                class="nav-link text-white"
                to="/login"
                @click.native.prevent="logout"
                replace
              >
                Logout
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
          return {
            authenticated: this.$cookies.get("authenticated"),
            token: this.$cookies.get("token")
          }
        },
        mounted() {
          if(!this.authenticated) {
            this.$router.replace({ name: "login" })
          } else {
            this.$router.replace({ name: "saldo" })
          }
        },
        methods: {
          setAuthenticated(status) {
            this.authenticated = status
          },
          logout() {
            this.$cookies.remove("authenticated")
            this.$cookies.remove("token")
          }
        }
    }
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>