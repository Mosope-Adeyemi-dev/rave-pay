export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Rave Pay',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/tooltip.client.js', '@/plugins/aos.client.js', '@/plugins/vueselect.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://bu-paywallet.herokuapp.com/api/v1/',
    // baseURL: 'http://localhost:4000/api/v1/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'Rave Payment Wallet',
      author: 'mosope.dev'
    },
    manifest: {
      name: 'Rave Payment Wallet',
      short_name: 'Rave Pay',
      description: 'Fast & Secure payment wallet you can trust. Zero transfer fees! and no hidden charges!',
      lang: 'en'
    },
    icon: {
      fileName: 'icon.png',
      sizes: [64, 120, 144, 152]
    }
  },

  toast: {
    position: 'top-right',
    register: [], // Register custom toasts,
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
    fullWidth: false,
    closeOnSwipe: true,
    duration: 5000,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
