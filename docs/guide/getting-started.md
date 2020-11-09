# Getting started

## Quick Start

To add **VUntangle** library to a project run the following command

```sh
yarn add git+https://github.com/dhadarau/vuntangle.git
```

## Usage

To use the library components **VUntangle** it must be added to the application entry point like below:

```js
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { i18n } from "./plugins/vue-i18n";

............

// Vuntangle specific imports, including styles
import Vuntangle from "vuntangle";
import "vuntangle/dist/vuntangle.css";
// Vuntangle library integration
Vue.use(Vuntangle, {
  vuetify,
  i18n
});

............

// the host app initialization
new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");

```

::: tip IMPORTANT
To function properly Vuntangle plugin requires host app "vuetify" to be passes as optional param.
:::
