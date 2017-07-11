import babel from 'rollup-plugin-babel'
import commonJs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const config = {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'SVGPoints',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    commonJs(),
    nodeResolve()
  ],
  sourceMap: true
}

if (process.env.NODE_ENV === 'production') {
  config.dest = 'dist/svg-points.min.js'
  config.plugins.push(uglify())
} else {
  config.dest = 'dist/svg-points.js'
}

export default config
