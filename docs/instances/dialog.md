# $ut.dialog

This is used to show a modal window requiring user interaction.

:::tip INFO
When the dialog is shown for the first time, the *UDialog* component is mounted in the root #app element.
This component will remain available all the time and will be reused for all dialog content.
This means that app uses a single UDialog instance for all "visible" dialogs.
:::


UDialog consists of:
- a title
- inner component imported when showing the dialog
- 2 action buttons: *Cancel* and *OK*

The closing of the dialog is done using **Cancel** button, [ X ] button from title bar or when hitting Esc key
The main action is trigger when using **OK** button or hitting Enter key


## Usage

The most common usage is showing it when a user click a button or link (click events).

```html
<!-- inside page/component template -->
<u-btn @click="onShowDialog">Show Dialog</u-btn>
```
```js
// inside page/component methods
onShowDialog() {
  // async require the component that will be rendered inside the dialog
  const component = () => import('@/<dialog_content_component>.vue')
  this.$ut.dialog
    .show({
      // dialog title
      title: 'localized.title',
      // the component rendered inside dialog
      component,
      // the component props if required
      componentProps: {
        prop: this.someValue,
      },
    })
},
```

::: warning Important!
The inner content component, dynamically loaded inside UDialog,
controls the progress and closing of the dialog when action button [ OK ] is clicked.

So the inner component must:
- implement `action()` method (usually async) triggered when clicking the action button
- controls the dialog progress indicator or closing by emitting
  - `progress-show` - to show progress during an async call
  - `progress-hide` - to hide progress
  - `close` - to close the dialog

```js
// code inside inner loaded component
methods: {
  async action() {
    this.$emit('progress-show')
    await // some api call
    this.$emit('progress-hide') // not needed if emitting 'close'
    this.$emit('close')
  }
}
```
Inner component controls the dialog behavior because:
- it might invalidate some form elements (so shouldn't to be closed)
- some server response returns an error (progress-show/progress-hide)
- has to fetch some initial data
- other possible cases

Also when emitting `close`, the `progress-hide` does not have to be emitted.
:::

![An image](/UDialog.png)


## Methods

### `show`

* `show(options: Object)`

**options** - represent actually the UDialog props

* `title: String` - the localized key for dialog window title
* `component: Component` - the component to render inside dialog
* `componentProps: Object` - the component props to be passes to it
* `actionLabel: String` - the localized key for action button label (default: `button.ok`)
* `cancelLabel: String` - the localized key for cancel button label (default: `button.cancel`)
* `width: Number` - the dialog width in pixels (default: `600`)

## Events

### `close`
Is emitted when the dialog is closing regardless which action triggered that.
Do not confuse this `close` event with the ones emitted by the contained component described above.

```js
this.$ut.dialog.show({
  ... options
}).$on('close', () => {
  ... code to be executed on close
})
```
