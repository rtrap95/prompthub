// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  i18n: {
    locales: [{
      code: 'it',
      name: 'Italiano',
      file: 'it.json'
    },
    {
      code: 'en',
      name: 'English',
      file: 'en.json'
    },
    {
      code: 'fr',
      name: 'Français',
      file: 'fr.json'
    },
    {
      code: 'de',
      name: 'Deutsch',
      file: 'de.json'
    }],

    defaultLocale: 'it',
    langDir: '../locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'it',
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/icon']
})