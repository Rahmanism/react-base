import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  // base: './',
  // root: 'src',
  resolve: {
    alias: [
      { find: 'App', replacement: '/src/App' },
      { find: 'context', replacement: '/src/context' },
      { find: 'routes', replacement: '/src/routes' },
      { find: 'routes', replacement: '/src/routes' },
      { find: 'common', replacement: '/src/common' },
      { find: 'common', replacement: '/src/common' },
      { find: 'layouts', replacement: '/src/layouts' },
      { find: 'layouts', replacement: '/src/layouts' },
      { find: 'components', replacement: '/src/components' },
      { find: 'components', replacement: '/src/components' },
      { find: 'api', replacement: '/src/api' },
      { find: 'complex-components', replacement: '/src/complex-components' },
      { find: 'assets', replacement: '/src/assets' },
      { find: '*', replacement: '/src/**' },
    ],
  },

  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          // include: /\.[jt]sx?$/,
          include: /src\/.*\.jsx?$/,
          jsx: 'automatic',
        })
      },
    },
    react(),
  ],

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  server: {
    host: '127.0.0.1',
    port: 3000,
    // https: {
      // key: './rahmanism.ir-privateKey.pem',
      // cert: './rahmanism.ir-cert.crt',
    // },
  },
})
