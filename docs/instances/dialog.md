# $ut.dialog

This is used to show a modal window requiring user interaction.
The most common usage is showing it when a user click a button or link (click events).

## Usage

When the dialog is shown for the first time, an *UDialog* component is mounted in the root #app element.
This component will remain available all the time and will be reused when other dialogs will be shown.
This means that app uses a single UDialog instance for all dialogs.

```html
<!-- inside template -->
<u-btn @click="onShowDialog">Show Dialog</u-btn>
```
```js
// inside component methods
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
    // UDialog emits 'close' event if needed in particular situations
    .$on('close', () => {
      // e.g. show a toast
      this.$ut.toast.show('some message')
    })
},
```

::: warning Important!
The inner content component dynamically loaded inside UDialog must:
- implement `async submit()` method triggered when clicking the action button (OK)
- also the inner component must emit the `close` event

```js
// code inside inner loaded component
methods: {
  async submit() {
    await // implement whatever await
    this.$emit('close')
  }
}
```
Inner component emits the `close` event because:
- it might invalidate some form elements (if it's the case)
- some server response returns an error
- other possible cases
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
emitted when the dialog is closed

```js
this.$ut.dialog.show({
  ... options
}).$on('close', () => {
  ... code to be executed on close
})
```
