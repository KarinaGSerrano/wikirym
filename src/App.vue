<template>
  <div id="app">
    <body>
      <!-- ------------------------NAV----------------------------  -->

      <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div class="container-fluid blur">
            <router-link to="/" class="navbar-brand">
              <img
                class="img-fluid"
                src="./../public/img/Wiki-RyM.png"
                alt="logo"
              />
            </router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                backendData
                fill="currentColor"
                class="bi bi-list navbar-toggler-icon"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav pe-lg-2 d-flex align-items-center">
                <li class="d-flex align-items-center">
                  <router-link to="/" class="nav-link"> Home</router-link>
                </li>

                <li class="d-flex align-items-center">
                  <router-link to="/wiki" class="nav-link">
                    Wiki R&M
                  </router-link>
                </li>

                <li class="d-flex align-items-center ms-3">
                  <router-link
                    to="/logIn"
                    class="nav-link btn-login text-center"
                  >
                    Login
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- ................................ -->
          </div>
        </nav>
      </header>

      <!-- ------------------CONTENIDO DINÁMICO--------------------- -->

      <div>
        <router-view />
      </div>
      <!-- ------------------------------------------------------- -->
    </body>

    <!--  -----------------------  FOOTER  -----------------------  -->
    <footer class="footer">
      <div class="container text-center">
        <hr />
        <form class="container">
          <div class="m-2">
            <label class="form-label label-ask"
              >Pedile un consejo a Rick Sanchez, ingresá tu nombre:
            </label>
            <br />
            <label class="form-label label-ask-2" v-text="backendData"></label>
            <input
              v-model="inputPost"
              type="text"
              class="form-control w-25 mx-auto"
            />
          </div>
          <button @click="pedirConsejoRick" class="btn btn-style">
            Enviar Nombre
          </button>
          <div class="w-25 mx-auto mt-3 form-check">
            <input
              @change="checkPersuasion"
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="inputGet"
            />
            <label class="form-check-label" for="exampleCheck1"
              >No me dan ganas de hablar con Rick</label
            >
          </div>
        </form>

        <div class="p-5"></div>
        <hr />

        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-emoji-smile color-smile"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
            />
          </svg>
          2023 | DWN3AV - PWA - Serrano Karina
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      inputPost: "",
      inputGet: false,
      backendData: "[acá serás iluminado]",
    };
  },
  methods: {
    async checkPersuasion() {
      if (this.inputGet) this.backendData = await this.fetchBackendGET();
      else this.backendData = "[acá serás iluminado]";
    },

    async fetchBackendGET() {
      try {
        const response = await fetch(`http://localhost:4000/getPersuasion`);
        const data = await response.text();
        return data;
      } catch (err) {
        throw new Error(
          "Ocurrió un problema al recuperar los datos del backend"
        );
      }
    },

    async pedirConsejoRick() {
      this.backendData = await this.fetchBackendPOST();
    },

    async fetchBackendPOST() {
      const url = "http://localhost:4000/postAskRick";
      const data = this.inputPost;

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((responseData) => {
          return responseData;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style></style>
