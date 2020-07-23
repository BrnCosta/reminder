import { Notifications } from 'expo';

async function createNotification(notification, schedule) {
    const response = await Notifications.scheduleLocalNotificationAsync(notification, schedule);
    return response;
}

export const ScheduleService = {
    scheduleTask: (task) => {
        const notification = {
            title: task.title,
            body: task.description,
            categoryId: 'reminder_category',
            android: {
                icon: '../../assets/icon1024x.png',
                color: '#1891E9',
                channelId: 'reminders',
            }
        };

        const schedule = {
            time: new Date(task.date+'T'+task.time+':00-03:00'),
        };

        return createNotification(notification, schedule);
    },

    rescheduleTask: (task, date, time) => {
        const notification = {
            title: task.title,
            body: task.description,
            categoryId: 'reminder_category',
            android: {
                icon: '../../assets/icon1024x.png',
                color: '#1891E9',
                channelId: 'reminders',
            }
        };

        const schedule = {
            time: new Date(date+'T'+time+':00-03:00'),
        };

        return createNotification(notification, schedule);
    },

    deleteSchedule: (id) => {

        return Notifications.cancelScheduledNotificationAsync(id);
    },
}