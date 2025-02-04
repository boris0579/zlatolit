const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const fs = require('fs') // Для работы с файловой системой

// Путь к папке со страницами
const pagesDir = path.resolve(__dirname, 'src/pages')

// Получаем массив всех HTML-файлов в папке pages
const pageFiles = fs
    .readdirSync(pagesDir)
    .filter(file => file.endsWith('.html'))

// Создаем массив HtmlWebpackPlugin для каждой страницы
const htmlPagesPlugins = pageFiles.map(file => {
    return new HtmlWebpackPlugin({
        template: path.join(pagesDir, file), // путь к исходному HTML
        filename: `pages/${file}` // путь в папке dist
    })
})

module.exports = {
    entry: './src/js/main.js', // основной файл JS
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]'
    },
    mode: 'development', // или 'production'
    devServer: {
        static: [
            path.join(__dirname, 'dist'), // Сборка
            path.join(__dirname, 'src/pages') // Для работы с исходниками страниц без сборки
        ],
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader' // для импорта HTML
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource' // для загрузки изображений
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource' // для загрузки шрифтов
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // трансформация JS для совместимости
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html', // шаблон HTML
            filename: 'index.html'
        }),
        ...htmlPagesPlugins, // Подключаем автоматически созданные плагины для страниц
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
