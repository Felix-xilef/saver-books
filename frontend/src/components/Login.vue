/*html*/
<template>
  <div class="row m-0">
    <img src="../assets/logo.svg" alt="logo do site" class="logo" />
  </div>
  <div class="row m-0 justify-content-center p-md-0 p-3">
    <div class="card p-4 backgroundLightPurple borderPurple">
      <div class="row row-cols-md-2 row-cols-1">
        <div class="col-md-4">
          <div class="row justify-content-center">
            <img src="../assets/userIcon.svg" alt="ícone de uma pessoa" class="userIcon">
          </div>
        </div>
        <form class="col-md-8">
          <div class="mb-3">
            <label for="txtLogin" class="form-label">Login</label>
            <input
              type="text"
              name="txtLogin"
              id="txtLogin"
              placeholder="Digite seu CPF"
              class="form-control"
              :value="login"
            />
          </div>

          <div class="mb-3">
            <label for="txtPassword" class="form-label">Senha</label>
            <input
              type="password"
              name="txtPassword"
              id="txtPassword"
              placeholder="Digite sua Senha"
              class="form-control"
              :value="password"
            />
          </div>

          <div class="d-flex justify-content-end">
            <button
              type="submit"
              class="btn btn-primary backgroundGradientBlue"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Login",
    props: {
			login: String,
			password: String,
    }
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.logo {
		max-height: 164px;
	}

  .userIcon {
    max-height: 150px;
  }

	.card {
		max-width: 540px;
	}

	input {
		border-radius: 20px;
	}
</style>
