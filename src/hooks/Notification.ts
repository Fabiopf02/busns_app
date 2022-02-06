import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

interface Notif {
  title: string;
  message: string;
}

function notify(_notification: Notif) {
  return PushNotification.localNotification({
    channelId: 'default-channel-id',
    message: _notification.message,
    title: _notification.title,
    playSound: true,
    vibrate: true,
    allowWhileIdle: true,
  });
}

PushNotification.configure({
  onNotification: notification => {
    notify({
      title: notification.title,
      message: String(notification.message),
    });

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'Default channel',
    vibrate: true,
    importance: 4,
    playSound: true,
  },
  created => created,
);

export default PushNotification;
