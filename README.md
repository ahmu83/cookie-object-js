# JavaScript cookieObject

A JavaScript factory function for storing key:value object data in a cookie

- No dependency
- Supports ES modules

## Installation

### NPM

Cookie Object JS supports [npm](https://www.npmjs.com/package/js-cookie) under the name `cookie-object-js`.

```bash
npm i cookie-object-js
```

### Examples

```html
<script type="module">
  import { cookieObject } from './cookie-object.esm.js';
  // OR import { cookieObject } from 'cookie-object-js';

  var data = cookieObject('my_cookie_name');

  data.set({
    'Full Name': 'Cookie Object JS'
  });

  data.set('script_type', 'Factory function');

  console.log(data.get());
</script>
```

```html
<script type="module" src="./cookie-object.esm.js"></script>
<script nomodule defer src="./cookie-object.js"></script>
```

Here we're loading the nomodule script in a deferred fashion, because ES modules are deferred by default. This may not be strictly necessary depending on how you're using the library.

## Basic Usage

Create a cookie that is valid across the entire site and transform it to a JSON object:

```javascript
cookieObject('my_cookie_name').set('Name', 'The Name...!')
```

Create a cookie that expires 7 days from now, valid across the entire site:

```javascript
cookieObject('my_cookie_name', 7).set('Name', 'The Name...!')
```

Create an expiring cookie, valid to the path of the /page-url/ path:

```javascript
cookieObject('my_cookie_name', 7, '/page-url/').set('Name', 'The Name...!')
```

Get cookie object data:

```javascript
cookieObject('my_cookie_name').get()
cookieObject('my_cookie_name').get('Name')
```

Remove an item from cookie object:

```javascript
cookieObject('my_cookie_name').remove('Name')
```

Reset cookie object to {}:

```javascript
cookieObject('my_cookie_name').reset()
```

Reset cookie object to a default object:

```javascript
cookieObject('my_cookie_name').reset(defaultObject)
```