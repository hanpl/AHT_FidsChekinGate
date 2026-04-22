// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },
  css: [
    "~/assets/css/bootstrap/bootstrap.min.css",
    "~/assets/css/fontawesome/fontawesome-all.min.css",
    "~/assets/css/fontawesome/all.min.css",
    "~/assets/css/flaticon/flaticon.css",
    "~/assets/css/default.css",
    "~/assets/css/style.css",
    "~/assets/css/responsive.css"
  ],
  runtimeConfig: {
    urlHub: 'http://localhost:7248/dashboardHub',
    urlCheckDevice: 'https://localhost:7079/api/FidsLocation',
    urlDep: 'https://localhost:7079/api/FidsSpare',
    urlCountries: 'https://localhost:7079/api/Countries',
    urlArr: 'https://localhost:7079/api/Arrivals',
    urlFlight: 'https://localhost:7079/api/CheckinCounter',
    urlGate: 'https://localhost:7079/api/Gate',
    urlCheckinCounter: 'https://localhost:7079/api/CheckinCounter',
    numberfload: 3,
    timefresh: 65,
    timefloop: 25,
    numberfloadArr: 2,
    timefloopArr: 25,
    numberfloadDep2: 2,
    timefloopDep2: 25,
    timeCheckFlight: 50,
    timeLoadFlight: 60,
  }
})
