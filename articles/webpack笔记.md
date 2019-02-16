v4.29.3

## Concepts

core concepts:
- Entry
- Output
- Plugins
- Loaders
- Mode
- Brower Compatibility

### Entry
An **entry point** indicates which module webpack should use to begin building out its internal *dependency graph*

By default its value is `./src/index.js`, but you can specify a different by configuring the entry property in the webpack configuration.

```js
// webpack.config.js
module.exports = {
  entry: './path/to/mty/entry/file.js'
}
```

### Output
The output property tells webpack where to emit the *bundles* it creates and how to name these files.

it defualts to `./dist/main.js` for the main output file and to `./dist` folder for any other generated file.

```js
// webpack.config.js
const path = require('path')
module.exports = {
  entry: './path/to/mty/entry/file.js'，
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
}
```

### Loaders
Webpack only understands JavaScript and JSON files. **Loaders** allow webpack to process other type of files and convert them into a valid modules that can be consumed by your application and added to the dependency graph.

```js
// webpack.config.js
module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      test: /\.txt$/,
      user: 'raw-loader'
    ]
  }
}
```

### Plugins
Plugins can be leveraged to preform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

```js
const HtmlWebpackPlugin = require('html-webapck-plugin)
const webpack =  require('webpack)
// webpack.config.js
module.exports = {
  module: {
    rules: [
      test: /\.txt$/,
      user: 'raw-loader'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html})
  ]
}
```

### Mode
By setting `mode` parameter to either `development`, `production` or `none`,  you can enable webpack's built-in optimizations that correspond to each environment.

### Browser Compatibility
webpack supports all browsers that are ES5-compliant(IE8 and below are not supported). webpack needs `Promise` for `import()` and `require.ensure()`. 


## Entry Points