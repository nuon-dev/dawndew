/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Linking,
} from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const allowList = ['nuon.iubns.net', 'kauth.kakao.com', 'talk-apps.kakao.com'];

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const webviewRef = useRef<null | WebView>(null);
  const safeAreaInsets = useSafeAreaInsets();

  const uri = 'https://nuon.iubns.net/';

  async function onMessage(event: WebViewMessageEvent) {
    const tokenData = event.nativeEvent.data;
    await AsyncStorage.setItem('token', tokenData);
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        },
      ]}
    >
      <WebView
        ref={webviewRef}
        geolocationEnabled={true}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        source={{ uri }}
        onContentProcessDidTerminate={() => {
          webviewRef.current?.reload();
        }}
        onMessage={onMessage}
        onShouldStartLoadWithRequest={event => {
          if (allowList.some(allow => event.url.includes(allow))) {
            return true;
          }
          Linking.openURL(event.url);
          return false;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
