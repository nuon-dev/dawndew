import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

const API_BASE = "https://nuon.iubns.net:8000";

// 앱이 포그라운드일 때도 알림 표시
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/** Expo Push Token 발급 */
export async function registerForPushNotifications(): Promise<string | null> {
  // 실기기에서만 동작
  if (!Device.isDevice) {
    console.log("푸시 알림은 실기기에서만 동작합니다.");
    return null;
  }

  // 권한 요청
  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("푸시 알림 권한이 거부되었습니다.");
    return null;
  }

  // Android 채널 설정
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "기본 알림",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  // 토큰 발급
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  const token = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  return token.data;
}

/** 푸시 토큰을 기존 백엔드에 등록 */
export async function sendPushTokenToServer(
  pushToken: string,
  authToken: string
) {
  try {
    await fetch(`${API_BASE}/push-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
      body: JSON.stringify({ pushToken, platform: Platform.OS }),
    });
  } catch (e) {
    console.log("푸시 토큰 서버 전송 실패:", e);
  }
}
