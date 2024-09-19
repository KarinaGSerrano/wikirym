const frasesRick = [
  "No busco juicio ?????, solo un sí o no. ¿Puedes asimilar a una jirafa?",
  "A veces, la ciencia es más arte que ciencia, ?????. Mucha gente no lo entiende.",
  "No aceptas conseguir un nuevo corazón, ????? y después hacerlo a medias con un sistema nervioso.",
  "No soy un héroe, ?????. Nunca lo fui. Nunca lo seré. Y lo entiendo. Pero estoy vivo, y tengo razón Y estoy feliz. Estoy feliz de que estés vivo.",
  "La existencia es dolor para un Meeseeks, ?????. Y haremos cualquier cosa para aliviar ese dolor.",
  "No te lo vas a creer ?????, porque usualmente nunca pasa, pero cometí un error",
  "A veces, tu genialidad es tu propia perdición ?????.",
];

const randomFraseRick = function (nombre) {
  const viejoString = "?????";
  const nuevoString = nombre;
  const frasesRickConNombre = frasesRick.map((frase) =>
    frase.replace(viejoString, nuevoString)
  );

  const randomNum =
    Math.floor(Math.random() * (frasesRickConNombre.length - 1)) + 1;

  return frasesRickConNombre[randomNum];
};

// ------------------------------------------------------------------------------------------------------------- //

const frasesPersuasivas = [
  "¡Te estábamos esperando en el juego, pero parece que la suerte no está de nuestro lado hoy!",
  "No quisiste participar, ¡pero te perdiste la diversión! La próxima vez será.",
  "Creímos que eras el MVP del juego, ¡pero parece que te quedaste en el banquillo esta vez!",
  "¿No quieres jugar? ¡Estamos seguros de que con tus habilidades, podrías haberlo hecho épico!",
  "Pensamos que eras el héroe de la historia, pero parece que decidiste quedarte en casa.",
];

const randomFrasePersuasiva = function () {
  const randomNum =
    Math.floor(Math.random() * (frasesPersuasivas.length - 1)) + 1;

  return frasesPersuasivas[randomNum];
};

// ------------------------------------------------------------------------------------------------------------- //

module.exports = {
  randomFraseRick,
  randomFrasePersuasiva,
};

// ------------------------------------------------------------------------------------------------------------- //
