<template>
  <div>
    <Form @submit="handleLogin" :validation-schema="schema">
      <div>
        <label for="email">Email</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div>
        <label for="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <button :disabled="loading">
        <span v-show="loading" />
        <span>Login</span>
      </button>
      <div v-if="message" role="alert">
        {{ message }}
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object.shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
        loading: false,
        message: "",
        schema,
    };
  },
  computed: {
      loggedIn() {
          return this.$store.state.auth.status.loggedIn;
      },
  },
  created() {
      if (this.loggedIn){
          this.$router.push("/");
      }
  },
  methods: {
      handleLogin(user) {
          this.loading = true;

          this.$store.dispatch("auth/login", user).then(
              () => {
                  this.$router.push("/");
              },
              (error) => {
                  this.loading = false;
                  this.message =
                  (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                  error.message ||
                  error.toString();
              }
          );
      },
  },
};
</script>