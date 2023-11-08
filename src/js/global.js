import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

if (Capacitor.getPlatform() === "android") {
    
    StatusBar.setOverlaysWebView({ overlay: true });
}
