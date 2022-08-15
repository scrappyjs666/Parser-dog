import { notification } from 'antd';

type NotificationType = 'success' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType, text: string) => {
  notification[type]({
    message: text,
    maxCount: 3,
  });
};

notification.config({
  duration: 3,
  maxCount: 3,
});

export const noteMessage = (typeNote: NotificationType, text: string) => openNotificationWithIcon(typeNote, text);
