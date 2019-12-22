# webpack
- webpack 是什么
- 我们为什么需要打包
- webpack有什么新特性
- 如何安装webpack
- webpack核心概念
- dev和pro模式打包
- 代码分割
- 写一个loader
- 写一个plugins

### webpack 是什么？
<img src="./images/webpack.png"> 
webpack is a module bundler。模块打包⼯具，可以识别出引⼊模块的语法

### 为什么我们需要打包？
前端开发越来越复杂，不可能将所有代码都写在同一个文件中，为了方便管理和组织，需要将代码划分到不同的模块或文件中，但是浏览器在加载代码时，不可能单独加载每个模块，这样加载的速度会很慢，这些代码需要被打包成一个或者几个文件，压缩代码提高加载的速度。希望使用ES6或者jsx等，也需要使用打包工具。
- 模块化
- 优化加载速度
- 使用新的开发模式

### webpack有什么新特性

>同时支持CommonJS 与 AMD<br>
>一切都可以打包<br>
>分模块打包

`webpack` VS `require.js`
- CommonJS & AMD
- NPM
- Community

`webpack` VS `browserify`
- CommonJS & AMD
- NPM
- Bundle
- File Type

### 安装webpack
推荐局部安装，即项目内安装
```
yarn add webpack webpack-cli -D

webpack -v // command not found 默认在全局环境中查找
npx webpack -v // 在项目node_modules中查找
```

### webpack 配置文件
- 默认配置文件：`webpack.config.js`
- 执行默认配置：`webpack`
- 不使用默认配置：`webpack --config webpackconfig.js`
- 修改package.json: `"scripts": {"bundle": "webpack"}`, `npm run bundle`


### webpack 核心概念

- *`entry`*：指定打包入口文件 
```javascript
entry: {
  main: './src/index.js'
}
entry: './src/index.js'
```

- *`output`*：打包后的文件位置 
```javascript
output: {
  publicPath: 'xxx', 
  filename: 'bundle.js', 
  path: path.resolve(__dirname, "dist")
}
```

- *`loader`*：除js模块以外的处理⽅式
```javascript
module: {
  rules: [{
    test: /\.(png|jpe?g|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        name: '[name]_[hash].[ext]',
        outputPath: 'images/',
        limit: 2048
      }
    }
  }]
}
```

当webpack处理到不认识的模块时，需要在webpack中的module处进⾏配置，当检测到是什么格式的模块，使⽤什么loader来处理。loader有顺序，**从右到左，从下到上**.

1. url-loader 把图⽚转换成base64格式字符串，并打包到js⾥
1. style-loader 会把css-loader⽣成的内容，以style挂载到⻚⾯的header部分
1. css-loader 分析css模块之间的关系，并合成⼀个css
1. postcss-loader 样式⾃动添加前缀
1. sass-load 把sass语法转换成css ，依赖node-sass模块

- *`plugins`* 在webpack运⾏到某个阶段的时候，帮你做⼀些事情
1. html-webpack-plugin 在打包结束后，⾃动⽣成⼀个html⽂件，并把打包⽣成的js模块引⼊到该html中
1. clean-webpack-plugin 

- *`sourceMap`* 源代码与打包后的代码的映射关系
```javascript
devtool: "none" // eval:速度最快, cheap:较快，不⽤管列的报错, Module：第三⽅模块

// 开发环境，推荐
devtool:"cheap-module-eval-source-map"
// 线上环境可以不开启：如果要看到⼀些错误信息，推荐
devtool:"cheap-module-source-map"
```
在dev模式中，默认开启，关闭的话 可以在配置⽂件⾥

- *`Hot Module Replacement`* (HMR:热模块替换)
```javascript
devServer: {
  contentBase: "./dist", 
  open: true, 
  hot:true, 
  //即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly 
  hotOnly:true 
},
plugins: [
  new CleanWebpackPlugin(), 
  new HtmlWebpackPlugin({ template: "src/index.html" }), 
  new webpack.HotModuleReplacementPlugin() 
],
```

- *`Babel`* 处理ES6
```
yarn add babel-loader @babel/core @babel/preset-env -D
// 全局
yarn add @babel/polyfill -S
// 局部
yarn add -D @babel/plugin-transform-runtime
yarn add -S @babel/runtime
```
1. babel-loader 是 webpack 与 babel 的通信桥梁。
1. @babel/preset-env 包含了es6转es5的转换规则，把es6转成es5。
1. @babel/polyﬁll，把es的新特性都装进来，弥补低版本浏览器中缺失的特性
1. @babel/plugin-transform-runtime 组件库，⼯具库场景下的新特性弥补，因为polyﬁll是注⼊到全局变量，会污染全局环境
```javascript
// Webpack.conﬁg.js
{
  test: /\.js$/, 
  exclude: /node_modules/, 
  loader: "babel-loader", 
  options: { 
    presets: ["@babel/preset-env"] 
  }
}

//index.js 顶部 
import "@babel/polyfill";

// 按需注入polyfill
// Webpack.conﬁg.js
options: {
  presets: [
    [ 
      "@babel/preset-env", 
      { 
        targets: {
          edge: "17", 
          firefox: "60", 
          chrome: "67", 
          safari: "11.1" 
        }, 
        useBuiltIns: "usage" //按需注⼊
      }
    ]
  ]
}

// 新建.babelrc⽂件，把options部分移⼊到该⽂件中
{
  "plugins": [ 
    [ 
      "@babel/plugin-transform-runtime", 
      { 
        "absoluteRuntime": false, 
        "corejs": 2, 
        "helpers": true, 
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

### development vs Production模式区分打包
```javascript
yarn add webpack-merge -D

const merge = require("webpack-merge")
module.exports = merge(commonConfig,devConfig)

//package.js 
"scripts":{
  "dev":"webpack-dev-server --config ./build/webpack.dev.js",
  "build":"webpack --config ./build/webpack.prod.js" 
}



// 基于环境变量
//外部传入的全局变量 
module.exports = (env)=>{
  if(env && env.production){ 
    return merge(commonConfig,prodConfig) 
  }else{
    return merge(commonConfig,devConfig) 
  }
}

//外部传入变量 
scripts: " --env.production"
```

### 代码分割 code Splitting
将业务逻辑代码和第三方工具库代码分割开来。
- 基于[https://webpack.js.org/plugins/split-chunks-plugin/](https://webpack.js.org/plugins/split-chunks-plugin/)
```javascript
optimization:{ 
  //帮我们自动做代码分割 
  splitChunks:{ 
    chunks:"all",//默认是支持异步，我们使用all 
  } 
}
```

```javascript
//index.js

document.addEventListener("click", () => { 
  const element = document.createElement("div"); 
  element.innerHTML = "welcome to webpack4.x"; 
  document.body.appendChild(element); 
});

//index.js
document.addEventListener("click", () => {
  import("./click.js").then(({ default: func }) => { 
    //需要用到 npm install --save-dev @babel/plugin-syntax-dynamic-import
    func(); 
  }); 
});

//click.js 
function handleClick() {
  const element = document.createElement("div");
  element.innerHTML = "welcome to webpack4.x";
  document.body.appendChild(element); 
}
export default handleClick;
```


### 写⼀个Loader
- Loader是⼀个声明式函数。不能⽤箭头函数，因为要⽤到上下文this的数据，该函数接受⼀个参数，是源码
- 拿到源代码，作进⼀步的修饰处理，再返回处理后的源码就可以了
    - loader-utils: 处理loader,query的⼯具
    - this.callback: 返回多个信息
    - this.async：处理loader中的异步事情
- 配置webpack.config.js
    - resolveLoader.module 处理loader的路径问题
    - loader顺序，⾃下⽽上，⾃右到左

创建⼀个替换源码中字符串的loader
```javascript
// replace-loader.js
const loaderUtils = require("loader-utils"); //官⽅推荐处理loader,query的⼯具
module.exports = function(source) {
  console.log(source, this, this.query.name, loaderUtils.getOptions(this).name);
  const result = source.replace('abc','123') 
  // 1. 普通返回
  return result
  // 2. 返回多个 
  this.callback(null, result);
  // 3. 异步返回
  setTimeout(() => { 
    this.async()(null, result); 
  }, 3000);
};

// this.callback: 可以使⽤this.callback来处理返回多个信息
this.callback( 
  err: Error | null, 
  content: string | Buffer, 
  sourceMap?: SourceMap, 
  meta?: any 
);

// webpack.config.js
resolveLoader: { 
  modules: ["node_modules", "./loader"] // 处理loader的路径问题
},
module: {
  rules: [ 
    { 
      test: /\.js$/, 
      use: [ 
        "replaceLoader", 
        { loader: "replaceLoaderAsync", options: { name: "name" } }
      ]
      // use: path.resolve(__dirname, "./loader/replaceLoader.js") ,
      options: { 
        name: '[name]_[hash].[ext]'
      }
    } 
  ] 
},
```

### 写一个plugins
- Plugin: 开始打包，在某个时刻，帮助我们处理⼀些什么事情的机制
- plugin是⼀个类，⾥⾯包含⼀个apply函数，接受⼀个参数，compiler

```javascript
// copyright-webpack-plugin.js
class CopyrightWebpackPlugin { 
  constructor(options) { }

  //compiler：webpack实例 
  apply(compiler) {
    //hooks.emit 定义在某个时刻
    compiler.hooks.emit.tapAsync( "CopyrightWebpackPlugin", (compilation, cb) => {
      compilation.assets["copyright.txt"] = { 
        source: function() { return "hello copy"; }, 
        size: function() { return 20; } 
      }; 
      cb();
    });
    //同步的写法 
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", compilation => { 
      console.log("开始了"); 
    });
  }

} 
module.exports = CopyrightWebpackPlugin;


// webpack.config.js
const CopyrightWebpackPlugin = require("./plugin/copyright-webpack-plugin");
plugins: [new CopyrightWebpackPlugin({
  name: "name"
})]
```
