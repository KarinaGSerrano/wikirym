<template>
  <div class="bg-portada min-vh-100">
    <div class="container w-25 p-login">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Usuario</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            v-model="input.usuario"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Contraseña</label
          >
          <input
            v-model="input.contrasenia"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <div class="d-flex justify-content-around">
          <button
            type="submit"
            class="btn btn-log-form"
            @click="loguearUsuarioFirebase"
          >
            Login
          </button>
          <button
            type="submit"
            class="btn btn-style"
            @click="crearUsuarioFirebase"
          >
            Crear Usuario
          </button>
        </div>
      </form>
      <span
        :class="
          ({ 'd-none': !msje.show },
          { alertOk: msje.status, alertErr: !msje.status })
        "
        >{{ msje.msjeTxt }}</span
      >
    </div>
  </div>
</template>

<script>
// importa Firebase
import appFB from "../firebase.js";
// importa Firebase Auth
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(appFB);

auth;
getAuth;
signOut;
createUserWithEmailAndPassword;
signInWithEmailAndPassword;

export default {
  name: "LogInView",
  data: function () {
    return {
      input: {
        usuario: "",
        contrasenia: "",
      },
      msje: {
        show: false,
        status: true,
        msjeTxt: "",
      },
      userLogged: "",
    };
  },
  methods: {
    crearUsuarioFirebase() {
      createUserWithEmailAndPassword(
        auth,
        this.input.usuario,
        this.input.contrasenia
      )
        .then((userCredential) => {
          // Signed in
          this.userLogged = userCredential.user.email;
          this.msje.status = true;
          this.msje.msjeTxt = `Ha creado exitosamente el usuario: ${this.userLogged}`;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          this.msje.status = false;
          this.msje.msjeTxt = `No se ha podido crear usuario - Motivo: ${errorCode}`;
          // ..
        })
        .finally(() => {
          this.msje.show = true;
        });
    },
    loguearUsuarioFirebase() {
      signInWithEmailAndPassword(
        auth,
        this.input.usuario,
        this.input.contrasenia
      )
        .then((userCredential) => {
          // Signed in
          this.userLogged = userCredential.user.email;
          this.msje.status = true;
          this.msje.msjeTxt = `${this.userLogged}, se ha logueado exitosamente!`;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          this.msje.status = false;
          this.msje.msjeTxt = `No se ha podido loguear usuario - Motivo: ${errorCode}`;
          // ..
        })
        .finally(() => {
          this.msje.show = true;
        });
    },
  },
};
</script>

<style scope>
.alertOk {
  color: green;
}

.alertErr {
  color: red;
}
</style>
