# $ut instance

On application bootstrap a `$ut` prototype is attached to Vue instance.

This means that `$ut` is available across entire application by accessing `this.$ut`

The `$ut` contains constructors for some specific global components used across app:

* [$ut.dialog](../instances/dialog) - for showing modal dialogs
* [$ut.confirm](../instances/confirm) - for showing a confirm message
* [$ut.toast](../instances/toast) - for showing toast messages
