import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#efeeb4",
        secondary: "#dad873",
        accent: "#58b368",
        error: "#FF5252",
        info: "#454d66",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
});
