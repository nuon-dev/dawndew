import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";

type Props = {
  onBack: () => void;
};

export default function NotificationsScreen({ onBack }: Props) {
  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "새벽이슬 테스트",
        body: "푸시 알림이 정상 작동합니다!",
        data: {},
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← 홈</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>알림</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.content}>
        <Text style={styles.empty}>아직 알림이 없습니다</Text>

        <TouchableOpacity style={styles.testBtn} onPress={sendTestNotification}>
          <Text style={styles.testBtnText}>테스트 알림 보내기 (3초 뒤)</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  empty: {
    fontSize: 16,
    color: "#999",
    marginBottom: 24,
  },
  testBtn: {
    backgroundColor: "#42C7F1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  testBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
