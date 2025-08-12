<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-4">Login</h3>

      <!-- Campo Usuário -->
      <div class="mb-3">
        <label for="username" class="form-label">Usuário</label>
        <input
          type="text"
          id="username"
          name="username"
          class="form-control"
          v-model="input.username"
          placeholder="Digite seu usuário"
        />
      </div>

      <!-- Campo Senha -->
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          v-model="input.password"
          placeholder="Digite sua senha"
        />
      </div>

      <!-- Botão Login -->
      <div class="d-grid">
        <button class="btn btn-primary" type="button" @click="login">
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("https://12cc9d275efc.ngrok-free.app/login", {
          username: this.input.username,
          password: this.input.password,
        });

        // Salva o token JWT retornado
        const token = res.data.token;
        this.$cookies.set("authenticated", true);
        this.$cookies.set("token", token);

        // Redireciona para rota 'saldo'
        this.$router.replace({ name: "saldo" });
      } catch (err) {
        console.error(err);
        alert("Erro nas credenciais ou problema na conexão com o servidor");
      }
    },
  },
};
</script>
