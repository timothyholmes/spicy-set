# Spicy Set 🔥

Creates `Set` methods for interacting with objects based on content instead of reference.

## Usage

```javascript

const SpicySet = require('spicy-set');

const vanillaSet = new Set();
const spicySet = new SpicySet();

vanillaSet.add({ hello: 'world' });
spicySet.add({ hello: 'world' });

vanillaSet.has({ hello: 'world' }); // output: false
spicySet.has({ hello: 'world' }); // output: true

vanillaSet.add({ hello: 'world' }); // Adds object, Set is { {hello: 'world'}, {hello: 'world'} }
spicySet.add({ hello: 'world' }); // Doesn't add object, Set is { {hello: 'world'} }
```

## Scripts

- unit tests: `npm test`

## Help

Why? [JavaScript evaluates objects by reference and not value.](https://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value)
