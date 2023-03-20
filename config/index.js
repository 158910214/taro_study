import UnoCSS from '@unocss/webpack'

const config = {
  projectName: 'reat_app',
  date: '2023-3-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ["@tarojs/plugin-html"],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  // rules: [
  //   {
  //     test: /\.s[ac]ss$/i,
  //     use: [
  //       // Creates `style` nodes from JS strings
  //       "style-loader",
  //       // Translates CSS into CommonJS
  //       "css-loader",
  //       // Compiles Sass to CSS
  //       "sass-loader",
  //       {
  //         loader: 'webpack-sass-loader',
  //         options: {
  //           //默认值
  //           includePaths: ['./node_modules', '@nutui/nutui-react/dist/styles/variables.scss'],
  //           sourceMap: true,
  //           outputStyle: 'expanded',
  //           // data: `@import "@nutui/nutui-react/dist/styles/variables.scss";`,
  //         }
  //       },
  //     ]
  //   }
  // ],
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    // 合并webpack配置
    webpackChain(chain) {
      chain.plugin('unocss').use(UnoCSS())
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      chain.plugin('unocss').use(UnoCSS())
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    console.log(merge({}, config, require('./dev')).rules)
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
