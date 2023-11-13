import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Capacitor } from "@capacitor/core";
import rgbHex from "rgb-hex";

let bgColor = localStorage.getItem("bgcolor");
console.log(bgColor);

const startIndex = bgColor.indexOf("rgb(");
const endIndex = bgColor.indexOf(")");
const statusBarColor = bgColor.substring(startIndex, endIndex + 1);
console.log(statusBarColor);
console.log(rgbHex(statusBarColor));

StatusBar.setBackgroundColor({ color: "#ffffff" });
StatusBar.setStyle({ style: Style.Light });

window.addEventListener("DOMContentLoaded", () => {
  if (Capacitor.isNativePlatform()) {
    // StatusBar.setBackgroundColor({ color: rgbHex(statusBarColor) });
    // StatusBar.setBackgroundColor({ color: "#ffffff" });
    // StatusBar.setStyle({ style: Style.Light });

    setTimeout(() => {
      SplashScreen.hide({
        fadeOutDuration: 250,
      });
    }, 500);
  }
});
