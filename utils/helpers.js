import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECKS_KEY = 'UdaciCards:decks'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_KEY)
}

export function getDeck(id) {
    return new Promise((resolve, reject) => {
        getDecks()
            .then(JSON.parse)
            .then((decks) => {
                // return decks[id] || null
                resolve(decks[id] || null)
            })
            .catch((err) => {
                alert(err)
            })
    })

}

export function saveDeckTitle(title) {
    const deck = {
        title,
        questions: []
    }
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({ [title]: deck }))
}

export function addCardToDeck(title, card) {
    return new Promise((resolve, reject) => {
        getDeck(title)
            .then((deck) => {
                const newDeck = { [title]: { ...deck, questions: [...deck.questions, card] } }
                AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(newDeck))
                resolve()
            })
    })
}

function createNotification() {
    return {
        title: 'Finish a quiz!',
        body: "Don't forget to finish at least a quiz!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data == null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(14)
                            tomorrow.setMinutes(30)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

                        }
                    })
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}