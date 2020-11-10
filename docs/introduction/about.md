# About

VUntangle library contains components and plugins intended to be used in Untangle application and products.

As a convention, an application using Vuntangle will be called further **host application** or **host app**.

The VUntangle components are based or extending the widely used [vuetify](https://vuetifyjs.com) UI library.
Even so, the library does not includes the vuetify lib that will cause a large bundle,
however it includes the [agGrid](https://www.ag-grid.com/) package used by UGrid for data grids listings.

:::tip Good to know
Currently the host app have to include vuetify plugin so it contains all the vuetify components by default.

```js
import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify);
export default new Vuetify({});
```

Ideally is to be able to use tree shaking in the host app so the vuetify components are imported async when used.
In such case the vuetify plugin would turn into

```js
import Vue from "vue"
import Vuetify from "vuetify/lib" // note the vuetify/lib change

Vue.use(Vuetify);
export default new Vuetify({});
```

Also this change requires the **vuetify-loader** package as dev dependency in the host app.

This is not a major issue but if possible will try to find the webpack solution to this problem.
:::
