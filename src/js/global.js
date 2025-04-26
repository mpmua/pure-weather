import { SplashScreen } from "@capacitor/splash-screen";
import { Capacitor } from "@capacitor/core";

window.addEventListener("DOMContentLoaded", () => {
  if (Capacitor.isNativePlatform()) {
    setTimeout(() => {
      SplashScreen.hide({
        fadeOutDuration: 250,
      });
    }, 500);
  }
});
