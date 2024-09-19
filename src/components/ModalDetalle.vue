<template>
  <div class="hello">
    <div
      class="modal fade"
      id="modalDetalle"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="modalDetalleLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content p-2">
          <div class="modal-header">
            <h2 class="modal-title fs-5" id="modalDetalleLabel">
              {{ item.name }}
            </h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <img
                :src="item.image"
                class="card-img-top pb-5 modal-img"
                :alt="item.alt"
              />
            </div>
            <div class="row">
              <p class="col-3">
                <strong>{{ label1 }}: </strong>
              </p>
              <p class="col-9 modal-dato1">{{ item.data1 }}</p>
            </div>
            <hr />
            <div class="row">
              <p class="col-3">
                <strong>{{ label2 }}: </strong>
              </p>
              <p class="col-9 modal-dato2">{{ item.data2 }}</p>
            </div>
            <hr />
            <div class="row">
              <p class="col-3">
                <strong>{{ label3 }}: </strong>
              </p>
              <p class="col-9 modal-dato3">{{ item.data3 }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-style" data-bs-dismiss="modal">
              Ok!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDetalle",
  props: {
    item: {},
  },
  computed: {
    // se computan los labels recibidos por props para mostrarlos en letra capital
    label1() {
      return this.item.data1Label?.toUpperCase() ?? "";
    },
    label2() {
      return this.item.data2Label?.toUpperCase() ?? "";
    },
    label3() {
      return this.item.data3Label?.toUpperCase() ?? "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
