<template>
  <div class="bg-portada">
    <div>
      <div class="container">
        <h1 class="text-center pb-4">¡Explora R&M!</h1>
        <div class="">
          <ul class="row">
            <div class="col d-flex justify-content-center">
              <button
                class="btn btn-style"
                :class="{
                  'btn-style-not-select': !wiki.personajes.status,
                }"
                @click="botonClickeado(wiki.personajes)"
              >
                Personajes
              </button>
            </div>
            <div class="col d-flex justify-content-center">
              <button
                class="btn btn-style"
                :class="{
                  'btn-style-not-select': !wiki.locaciones.status,
                }"
                @click="botonClickeado(wiki.locaciones)"
              >
                Locaciones
              </button>
            </div>
            <div class="col d-flex justify-content-center">
              <button
                class="btn btn-style"
                :class="{
                  'btn-style-not-select': !wiki.episodios.status,
                }"
                @click="botonClickeado(wiki.episodios)"
              >
                Episodios
              </button>
            </div>
          </ul>
        </div>

        <!-- ..............BUSCADOR FORM ............ -->

        <nav>
          <div class="position-volver-1 mb-3">
            <!-- button volver -->
            <div class="position-volver-2">
              <router-link to="/" class="btn-volver"> Volver</router-link>
            </div>
            <!-- ............. -->

            <form class="d-flex position-1" role="search">
              <input
                v-model="busquedaWiki"
                class="form-control form-search-style"
                :class="{ 'form-search-style-error': !validaBusquedaWiki }"
                type="search"
                placeholder=" Busca tu curiosidad Interdimensional aqui. "
                aria-label="Search"
                :disabled="listaWiki.length === 0"
              />
              <div class="color-style">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-search position-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
              </div>
            </form>
          </div>
        </nav>
      </div>

      <!-- ------------------------------------------- -->

      <div class="info-rym">
        <div class="container">
          <div>
            <div class="row d-flex align-items-end">
              <div class="col pt-5">
                <h2 class="span-title">
                  Wiki R&M
                  <span class="span-strong-title">| {{ wikiNombre }}</span>
                </h2>
              </div>

              <div class="col d-flex justify-content-end">
                <img
                  :src="'/img/ico-' + wikiId + '.png'"
                  class="img-fluid img-ico-wiki"
                  alt=""
                />
              </div>
            </div>
            <hr />
          </div>

          <!-- <ol class="list-group list-group-numbered list-historial d-none"></ol> -->
          <div class="row d-flex justify-content-center container-cards">
            <span style="color: red">{{ msgError }}</span>
            <!-- -----------------Elemento Dinàmico-------------------- -->
            <div
              class="py-4 col-lg-4 col-md-6 col-sm-12"
              v-for="item in listaWikiBusqueda"
              v-bind:key="item.id"
            >
              <div class="card text-center">
                <img :src="item.image" class="card-img-top" :alt="item.alt" />
                <div class="card-body">
                  <h2 class="card-title">{{ item.name }}</h2>
                  <button
                    @click="setDataItem(item)"
                    type="button"
                    class="btn btn-style"
                    data-bs-toggle="modal"
                    data-bs-target="#modalDetalle"
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
            <!-- -------------------------------------------------------- -->
          </div>
          <modal-detalle :item="listaWikiItem"></modal-detalle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ModalDetalle from "@/components/ModalDetalle.vue";

export default {
  name: "WikiView",
  components: {
    ModalDetalle,
  },
  data: function () {
    return {
      wiki: {
        personajes: {
          id: 1,
          nombre: "personajes",
          status: false,
          endpointAPI: "/character",
        },
        locaciones: {
          id: 2,
          nombre: "locaciones",
          status: false,
          endpointAPI: "/location",
        },
        episodios: {
          id: 3,
          nombre: "episodios",
          status: false,
          endpointAPI: "/episode",
        },
      },
      wikiSelec: {},
      dataAPI: [],
      listaWiki: [],
      listaWikiItem: {},
      busquedaWiki: "",
      msgError: "",
    };
  },
  methods: {
    async botonClickeado(wiki) {
      // activa o desactiva el boton clickeado:
      wiki.status = true;
      // desactiva el resto de los botones:
      for (let i in this.wiki) {
        if (this.wiki[i] !== wiki) this.wiki[i].status = false;
      }
      // guarda la wiki seleccionada:
      this.wikiSelec = wiki;
      // se recuperan los datos de la API de Rick And Morty según botón wiki presionado
      // y se guarda en un objeto genérico para mostrar en cards y su respectivo modal: listaWiki
      this.listaWiki = await this.recuperarDatosWiki(wiki);
      // guarda en localStorage datos de busqueda
      this.setLocalStorage();
    },

    async recuperarDatosWiki(wiki) {
      return this.fetchRyM(wiki.endpointAPI)
        .then((data) => {
          // borra cualquier posible mensaje de error
          this.msgError = "";
          this.dataAPI = data.results;
          return this.dataAPI.map((itemLista) => {
            if (wiki.nombre === "personajes")
              return this.setWikiItem(
                itemLista.id,
                itemLista.name,
                itemLista.image,
                itemLista.name,
                itemLista.species,
                itemLista.gender,
                itemLista.status,
                "species",
                "gender",
                "status"
              );
            if (wiki.nombre === "locaciones") {
              return this.setWikiItem(
                itemLista.id,
                itemLista.name,
                "",
                "",
                itemLista.type,
                itemLista.dimension,
                itemLista.created,
                "type",
                "dimension",
                "created"
              );
            }
            if (wiki.nombre === "episodios") {
              return this.setWikiItem(
                itemLista.id,
                itemLista.name,
                "",
                "",
                itemLista.episode,
                itemLista.air_date,
                itemLista.created,
                "episode",
                "air date",
                "created"
              );
            }
          });
        })
        .catch((err) => {
          this.msgError = err.message;
          return [];
        });
    },

    setDataItem(item) {
      this.listaWikiItem = item;
    },

    setWikiItem(
      id,
      name,
      image,
      alt,
      data1,
      data2,
      data3,
      data1Label,
      data2Label,
      data3Label
    ) {
      return {
        id,
        name,
        image,
        alt,
        data1,
        data2,
        data3,
        data1Label,
        data2Label,
        data3Label,
      };
    },

    async fetchRyM(recurso) {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api${recurso}`
        );
        const data = await response.json();
        return data;
      } catch (err) {
        throw new Error("Ocurrió un problema al recuperar los datos");
      }
    },

    setLocalStorage() {
      localStorage.setItem("wikiSelec", JSON.stringify(this.wikiSelec));
    },

    getLocalStorage() {
      this.wikiSelec = JSON.parse(localStorage.getItem("wikiSelec"));
    },
  },

  computed: {
    wikiNombre() {
      return this.wikiSelec.nombre?.toUpperCase();
    },

    wikiId() {
      return this.wikiSelec.id ?? 0;
    },

    listaWikiBusqueda() {
      return this.listaWiki.filter((item) =>
        item.name.toLowerCase().includes(this.busquedaWiki.toLowerCase())
      );
    },

    validaBusquedaWiki() {
      const regex = /^[a-zA-Z0-9()\-_ ]+$/;
      if (this.busquedaWiki === "") return true;
      else return regex.test(this.busquedaWiki);
    },
  },

  mounted: function () {
    this.getLocalStorage();
    this.botonClickeado(this.wikiSelec ? this.wikiSelec : this.wiki.personajes);
    this.wiki[this.wikiSelec.nombre].status = true;
  },
};
</script>
