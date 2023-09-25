export default defineNuxtConfig({
  app: {
    head: {
      title: 'Газпром-Медиа Холдинг - официальный сайт',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{
        name: 'yandex-verification', content: 'a955478906fac20b',
        name: 'description', content: 'Газпром-Медиа Холдинг - официальный сайт',
      }]
    }
  },
  
  css: ['~/assets/scss/app.scss'],

  modules: [
    [
      '@nuxtjs/i18n',
      {
        baseUrl: 'https://test.com',
        compilation: {
          strictMessage: false,
          escapeHtml: false,
        },
        locales: [
          {
            code: 'ru',
            name: 'Рус',
            dir: 'rtl',
            iso: 'ru-Ru',
            files: ['ru/common.json'],
          },
          {
            code: 'en',
            name: 'Eng',
            dir: 'ltr',
            iso: 'en-US',
            files: ['en/common.json'],
          },
        ],
        strategy: 'prefix',
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'ru',
      },
    ],
  ],
});
