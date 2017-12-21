# style-variables-loader

在Sass, Less, Stylus编译之前, 向样式文件中注入变量。

## 安装
```shell
    npm i style-variables-loader --save-dev 
    //or
    yarn add style-variables-loader --dev
```

## 基础用法
```js
    //webpack.config.js
    module.exports = {
        module: {
            rules: [{
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', {
                    loader: 'style-variables-loader',
                    options: {
                        variables: {
                            var1: 'red',
                            var2: 'navy'
                        }
                    }
                }]
            }]
        }
    }
```

```scss
    //假设你的scss文件
    body{
        background: $var1;
        color: $var2;
    }
    //编译后
    body{
        background: red;
        color: navy;
    }
```

## 外部文件
支持js和json两种配置文件格式
```js
    //文件位置 /theme/theme.json
    module.exports = {
        var1: 'red',
        var2: 'blue'
    }
```
```json
    // /theme/theme.json
    {
        "var1": "red",
        "var2": "blue"
    }
```
```js
    //webpack.config.js
    module.exports = {
        module: {
            rules: [{
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', {
                    loader: 'style-variables-loader',
                    options: {
                        files: './theme/*.*'
                    }
                }]
            }]
        }
    }
```

## 其他类型
支持```scss```, ```sass```, ```less```, ```stylus```四种预编译语言变量注入。
```js
    //注入less变量
    module.exports = {
        module: {
            rules: [{
                test: /\.less$/,
                use: ['style-loader', 'less-loader', 'sass-loader', {
                    loader: 'style-variables-loader',
                    options: {
                        files: './theme/*.*',
                        style: 'less'
                    }
                }]
            }]
        }
    }
```

## Options
* files: ```String|Array```

    定义变量的js或json文件匹配符或路径。
    
* variables: ```Object```

    行内变量, 它的优先级最高。

* style: ```'scss'|'sass'|'less'|'stylus'```

    注入变量的类型。默认```'scss'```。

* hot: ```Boolean```

    是否支持热替换。默认```true```。

* cwd: ```String```

    当前工作目录。默认```process.cwd()```。