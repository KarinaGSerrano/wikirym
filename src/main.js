import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/style.css";

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })
    .then((registration) => {
      console.log(
        "Service Worker registrado con el ámbito:",
        registration.scope
      );
    })
    .catch((error) => {
      console.error("Falló el registro del Service Worker:", error);
    });
}

// Instancia Vue
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
