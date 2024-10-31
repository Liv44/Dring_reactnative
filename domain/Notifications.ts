import { AndroidImportance, getExpoPushTokenAsync, getPermissionsAsync, requestPermissionsAsync, scheduleNotificationAsync, setNotificationChannelAsync, setNotificationHandler } from "expo-notifications";
import Constants from 'expo-constants';
import { NUMBER_OF_POMODORIS } from "../utils";


export class NotificationService {
    private _notificationToken: string | null = null;
    private _platformOs: "ios" | "android" | "windows" | "macos" | "web";


    constructor(platformOs: "ios" | "android" | "windows" | "macos" | "web") {
        this._platformOs = platformOs;

        setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        this.registerForPushNotificationsAsync().then((token) => {
            if (token) {
                this._notificationToken = token;
            } else {
                console.log('Failed to get push token for push notification!');
            }
        });

    }

    private async registerForPushNotificationsAsync() {
        let token;
        if (this._platformOs === 'android') {
            await setNotificationChannelAsync('default', {
                name: 'default',
                importance: AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        const { status: existingStatus } = await getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }

            token = (
                await getExpoPushTokenAsync({
                    projectId,
                })
            ).data;

        } catch (e) {
            token = `${e}`;
        }

        return token;
    }

    private async schedulePushNotification({ title, body }: { title: string, body: string }) {
        await scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: 'default',
            },
            trigger: null,
        });
    }

    public async sendEndSessionNotification({
        counterOfPomodoris,
        timerMode
    }: {
        counterOfPomodoris: number,
        timerMode: 'Focus' | 'Break'
    }) {
        let pomodoroOrderText;
        switch (counterOfPomodoris) {
            case 1:
                pomodoroOrderText = "premier";
                break;
            case 2:
                pomodoroOrderText = "deuxième";
                break;
            case 3:
                pomodoroOrderText = "troisième";
                break;
            case 4:
                pomodoroOrderText = "quatrième";
                break;
        }

        let body = "";

        if (timerMode === 'Focus' && counterOfPomodoris < NUMBER_OF_POMODORIS) {
            body = `Votre ${pomodoroOrderText} pomodori est terminé, prenez une pause de 5 minutes`
        } else if (timerMode === 'Break' && counterOfPomodoris < NUMBER_OF_POMODORIS) {
            body = 'Votre pause est terminé, c\'est reparti pour un nouveau pomodori';
        } else if (timerMode === 'Focus' && counterOfPomodoris === NUMBER_OF_POMODORIS) {
            body = 'Votre cycle de Pomodoro est terminé. Vous pouvez prnedre une grande pause.';
        }
        this.schedulePushNotification({
            title: 'DRRRIIIINNGGGG',
            body,
        });
    }
}