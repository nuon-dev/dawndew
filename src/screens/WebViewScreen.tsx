import { useRef } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

const WEB_URL = "https://nuon.iubns.net";

const INJECT_GET_TOKEN = `
  (function() {
    var token = localStorage.getItem('token');
    if (token) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'AUTH_TOKEN', token: token }));
    }
  })();
  true;
`;

type Props = {
  onBack: () => void;
  onAuthToken?: (token: string) => void;
};

export default function WebViewScreen({ onBack, onAuthToken }: Props) {
  const webviewRef = useRef<WebView>(null);

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "AUTH_TOKEN" && data.token) {
        onAuthToken?.(data.token);
      }
    } catch {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← 홈</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>새벽이슬</Text>
        <View style={styles.backBtn} />
      </View>
      <WebView
        ref={webviewRef}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        injectedJavaScript={INJECT_GET_TOKEN}
        onMessage={handleMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#42C7F1",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 60,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  webview: {
    flex: 1,
  },
});
