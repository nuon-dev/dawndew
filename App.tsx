import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotifications } from "./src/notifications";
import HomeScreen from "./src/screens/HomeScreen";
import WebViewScreen from "./src/screens/WebViewScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";

type Screen = "home" | "webview" | "notifications";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  useEffect(() => {
    registerForPushNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      () => {
        setScreen("notifications");
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={screen === "home" ? "dark" : "light"} />
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}
      {screen === "webview" && (
        <WebViewScreen onBack={() => setScreen("home")} />
      )}
      {screen === "notifications" && (
        <NotificationsScreen onBack={() => setScreen("home")} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
