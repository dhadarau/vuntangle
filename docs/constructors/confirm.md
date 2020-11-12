# $ut.confirm

This is used to show a simple confirm message modal.
It's similar to $ut.dialog but simpler.

## Usage

When the confirm is shown for the first time, an *UConfirm* component is mounted in the root #app element.
This component will remain available all the time and will be reused when other dialogs will be shown.
This means that app uses a single UConfirm instance for all confirm messages.

Flow:
* the confirm dialog is shown
* on `No` (`Cancel`) - the confirm is closed
* on `Yes`
  * the confirm emits a `confirm` event with a Promise resolve arg
  * it shows a progress indicator expecting that resolve call
  * after `resolve` is called the confirm dialog is closed

```html
<!-- inside template -->
<u-btn @click="onShowConfirm">Show Confirm</u-btn>
```
```js
// inside component methods
onShowConfirm() {
  this.$ut.confirm
    .show({
      title: 'localized.title',
      message: 'localized.message'
    })
    // the confirm action resolving promise
    .$on('confirm', async (resolve: Function) => {
      ... await code to be executed on confirm
      resolve()
    })
    // UConfirm emits 'close' event if needed in particular situations
    .$on('close', () => {
      // e.g. show a toast
      this.$ut.toast.show('some message')
    })
},
```

## Methods

### `show`

* `show(options: Object)`

**options** - represent actually the *UConfirm* props

* `title: String` - the localized key for confirm window title
* `message: String` - the localized key for confirm message
* `confirmLabel: String` - the localized key for confirm button label (default: `button.yes`)
* `cancelLabel: String` - the localized key for cancel button label (default: `button.no`)
* `width: Number` - the confirm dialog width in pixels (default: `600`)


## Events

### `confirm [async (resolve: Function)]`
emitted when *action* button is clicked and waiting for the `resolve()` Promise

```js
this.$ut.confirm
  .show({
    ... options
  })
  .$on('confirm', async (resolve: Function) => {
    ... await code to be executed on confirm
    resolve()
  })
```

### `close`
emitted when the confirm is closed

```js
this.$ut.confirm
  .show({
    ... options
  })
  .$on('close', () => {
    ... code to be executed on close
  })
```

