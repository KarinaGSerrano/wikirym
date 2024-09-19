<template>
  <div class="bg-portada">
    <div class="portada-rym">
      <div
        class="text-end pe-3 position-fixed fixed-bottom m-5"
        v-if="instalacionPendiente"
      >
        <button
          @click="instalarAplicacion"
          id="install"
          type="button"
          class="btn btn-primary btn-style"
        >
          Instalar aplicación
        </button>
      </div>

      <div class="d-flex justify-content-center">
        <img
          src="../../public/img/portadarym.png"
          class="img-fluid portada-img"
          alt="rick"
        />
      </div>
      <h1 class="text-center pt-5">Dimensiones desconocidas te esperan...</h1>

      <div class="text-center">
        <router-link to="/wiki" class="btn btn-style">
          Haz clic aquí para explorar
        </router-link>
      </div>
    </div>

    <div class="info-rym padding-top">
      <div class="container pt-5">
        <!--  -->

        <div>
          <h2 class="span-title">
            Wiki R&M
            <span class="span-strong-title">| EXPLORA</span>
          </h2>
          <hr />
        </div>

        <!--  -->

        <div class="text-center pt-5">
          <div class="row">
            <div class="col-4">
              <img
                src="../../public/img/ico-1.png"
                class="img-fluid w-75 img-ico"
                alt="rick"
              />

              <div class="p-icon">
                <p>Personajes</p>
              </div>
            </div>
            <div class="col-4">
              <img
                src="../../public/img/ico-2.png"
                class="img-fluid w-75 img-ico"
                alt="rick"
              />
              <div class="p-icon">
                <p>Locacion</p>
              </div>
            </div>
            <div class="col-4">
              <img
                src="../../public/img/ico-3.png"
                class="img-fluid w-75 img-ico"
                alt="rick"
              />
              <div class="p-icon">
                <p>episodios</p>
              </div>
            </div>
          </div>

          <hr />
        </div>
      </div>
    </div>
    <img
      src="../../public/img/bg-footer.svg"
      class="img-fluid w-100 img-footer"
      alt="rick"
    />
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data: function () {
    return {
      instalacionPendiente: true,
      eventoDeInstalacion: null,
    };
  },

  methods: {
    instalarAplicacion() {
      if (this.eventoDeInstalacion != null) {
        this.eventoDeInstalacion.prompt().then(({ outcome }) => {
          if (outcome === "accepted") this.instalacionPendiente = false;
        });
      }
    },
  },

  mounted: function () {
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("---- beforePrompt ----");
      this.eventoDeInstalacion = event;
      this.instalacionPendiente = true;
    });

    console.log("---- nullo? ----");
    if (this.eventoDeInstalacion == null) {
      console.log("---- es nulo nomás ----");
      this.instalacionPendiente = false;
    }
  },
};
</script>
