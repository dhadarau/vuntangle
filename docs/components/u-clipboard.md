# UClipboard

This is used to ease copying a piece of information by adding a clickable icon adjacent to a text/string.

## Usage

```html
<u-clipboard copy="string to be copied">
  string to be copied
</u-clipboard>
```

```html
<u-clipboard copy="string to be copied">
  <span style="">Prefix: </span> string to be copied
</u-clipboard>
```

```html
<u-clipboard :copy="data-bind-string">
  <span style="">Prefix: </span> {{ data-bind-string }}
</u-clipboard>
```

## Props

* **copy** (String) - the string to be copied to clipboard
