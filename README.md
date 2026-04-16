# 새벽이슬 (dawndew)

수원제일교회 청년부 앱

## 시작하기

### 1. 설치

```bash
npm install
```

### 2. 실행

```bash
npx expo start
```

### 3. 테스트

QR코드가 나오면:

- **iPhone** — Expo Go 앱 설치 → 카메라로 QR 스캔
- **Android** — Expo Go 앱 설치 → 앱에서 QR 스캔
- **iOS 시뮬레이터** — `i` 키
- **Android 에뮬레이터** — `a` 키

### 4. 빌드 (배포용)

```bash
# EAS CLI 설치
npm install -g eas-cli

# 로그인
eas login

# Android APK
eas build --profile development --platform android

# iOS
eas build --profile development --platform ios
```

## 기술 스택

- Expo SDK 54
- React Native + TypeScript
- react-native-webview
- expo-notifications
