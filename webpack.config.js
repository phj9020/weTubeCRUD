const path = require('path');
const ExtractCSS = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const MODE = process.env.WEBPACK_ENV;

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config  = {
    entry: ENTRY_FILE,
    mode: MODE,
    module: {                             //  module을 발견할때 마다
        rules: [                          // 다음과 같은 rules을 따라라
            {
                test: /\.(scss)$/,        // 조건을 test해라 styles.scss파일을 만나게 되면, use extract-text-webpack-plugin
                use: ExtractCSS.extract([        // plugin내부에서 또 plugin 사용하고 있다 SCSS 파일을 일반적인 CSS로통역
                    {                        //4. 잘 호환되는 CSS가 불러와지면 그부분만 텍스트를 추출( ExtractCSS.extract)해서 보냄 
                        loader: 'css-loader'   //3. css-loader를 이용해 webpack이 CSS를 이해할 수 있게 된다. 
                    }, 
                    {
                        loader: 'postcss-loader',  //2. postcss-loader는 CSS를 받아서, 우리가 주는 plugin을 가지고 CSS를 변환(호환성)
                        options: {
                            postcssOptions: {
                                plugin() {
                                    return [autoprefixer({ browsers: "cover 99.5%" })];
                                }
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'  // 1. 밑에서 위로 sass-loader는 Sass or SCSS를 받아서 일반 CSS로 바꿈
                    }
                ])                               
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins:[new ExtractCSS("styles.css")]
};

module.exports = config;