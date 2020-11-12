# About

**Vuntangle library consists of components and plugins intended to be used in Untangle applications.**

:::tip Info
As convention, an application using Vuntangle will be called further **host application** or **host app**.
:::

The Vuntangle components are based or are extending the widely used [Vuetify](https://vuetifyjs.com) UI library.
Even so, Vuntangle does not includes the vuetify lib to avoid generating a large bundle.
However it includes the [agGrid](https://www.ag-grid.com/) package used by UGrid for data grids listings.

:::tip Host app vuetify plugin
The host app must include/use Vuetify lib in a manner that it loads all it's components upon initialization.

Below it's the **plugin.js** file used by the host app to include Vuetify

```js{2,3}
import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify);
export default new Vuetify({});
```

Ideally is to be able to use *treeshaking* so the vuetify components are imported async when used.
In such case the vuetify **plugin.js** would turn into

```js{2}
import Vue from "vue"
import Vuetify from "vuetify/lib" // note the vuetify/lib change

Vue.use(Vuetify);
export default new Vuetify({});
```

Also this change requires the **vuetify-loader** package as dev dependency in the host app.

This is not a major issue but if possible will try to find the webpack solution to this problem.
:::
