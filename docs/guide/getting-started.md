# Getting started

## Quick Start

To add **Vuntangle** library to a host app run the following command

```sh
yarn add git+https://github.com/dhadarau/vuntangle.git
```
As you note currently using directly the github repo.
Looking into turning this as a npm package hosted on [npmjs.org](https://npmjs.org)

## Usage

To use **Vuntangle** plugin, the library must be added to the host application entry point (**main.js**) like below:

```js{6-8,11-14}
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { i18n } from "./plugins/vue-i18n";

// Vuntangle specific imports, including styles
import Vuntangle from "vuntangle";
import "vuntangle/dist/vuntangle.css";

............
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
To function properly, host app must pass it's own **vuetify**, **i18n** to Vuntangle plugin.
:::

