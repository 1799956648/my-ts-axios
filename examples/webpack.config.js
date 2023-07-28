const fs = require('fs');//引用node的文件系统
const path = require('path');//引入路径模块
const webpack = require('webpack');//引入webpack
module.exports = {
    mode: 'development',
    /**
    * 我们会在 examples 目录下建多个子目录
    * 我们会把不同章节的 demo 放到不同的子目录中
    * 每个子目录的下会创建一个 app.ts
    * app.ts 作为 webpack 构建的入口文件
    * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
    * entries 是一个对象，key 为目录名
    */
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        //readdir方法用于读取目录，返回一个所包含的文件和子目录的数组。
        const fullDir = path.join(__dirname, dir);
        //path.join方法用于连接路径。该方法的主要用途在于
        //会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“。
        const entry = path.join(fullDir, 'app.ts');
        //链接所有的子目录下的app.ts入口文件
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            //判断文件路径及app.ts是否存在
            entries[dir] = ['webpack-hot-middleware/client', entry];
        }
        return entries;
    }, {}),
    /**
    * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
    */
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}