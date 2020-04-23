# Circle Statistics #

Test it https://stackblitz.com/edit/js-2m2bs7

New implementation of circliful, without any dependencies - dependencies are only used for development like webpack, jest, typescript, tslint and babel.

* show Infos as Circle Statistics, no images used
* based on SVG
* many options can be set
* fully responsive

## How to use circliful

Include circliful to your Site via script tag. If you want to use font-awesome icons you need to include the files separately.

Github clone / download

```
<link href="dist/main.css" rel="stylesheet" type="text/css" />

<div id="circle"></div>

<script src="dist/circliful.js"></script>
<script>
    circliful.newCircle({
        percent: 50,
        id: 'circle',
        type: 'simple',
    });
</script>
```

npm package

```
npm i js-plugin-circliful
```
   
```javascript
import 'node_modules/js-plugin-circliful/dist/main.css';
import {circliful} from 'node_modules/js-plugin-circliful/dist/circliful';

circliful.newCircle({
  percent: 50,
  id: 'circle',
  type: 'simple',
});
```

```html
<div id="circle"></div>
```

## Documentation

* [Api](./docs/api.md)
* [Create custom circle](./docs/create-new-circle.md)
* [Setup dev enviroment (with webpack)](./docs/dev-environment.md)
* [List of available options](./docs/options.md)
* [Style your cirles via css](./docs/style-elements.md)

If you feel there is something missing in the documentation or the library please open a issue.

Donation
--------
If you find this plugin useful or/and use it commercially feel free to donate me a cup of coffee :)

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D3F2MMNDHQ9KQ)
