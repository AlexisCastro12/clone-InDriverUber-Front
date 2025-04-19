import 'dotenv/config';

export default () => ({
  expo: {
    name: "InDriverEjemplo",
    slug: "InDriverEjemplo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Esta app utiliza tu ubicación para mostrarte tu posición en el mapa.",
      },
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      },
      package: "com.anonymous.InDriverEjemplo"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      googleApiKey: process.env.GOOGLE_MAPS_API_KEY,
      backendApiUrl: process.env.BACKEND_API_URL,
    }
  }
});
