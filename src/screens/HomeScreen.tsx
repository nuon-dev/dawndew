import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

type Props = {
  onNavigate: (screen: "webview" | "notifications") => void;
};

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title}>새벽이슬</Text>
      <Text style={styles.subtitle}>수원제일교회 청년부</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onNavigate("webview")}
        >
          <Text style={styles.buttonIcon}>🌐</Text>
          <Text style={styles.buttonText}>새벽이슬</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onNavigate("notifications")}
        >
          <Text style={styles.buttonIcon}>🔔</Text>
          <Text style={styles.buttonText}>알림</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 48,
  },
  buttons: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    backgroundColor: "#42C7F1",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: "center",
    minWidth: 140,
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
