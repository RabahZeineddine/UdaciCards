import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { black, gray } from '../utils/colors';

class DeckCover extends Component {

    render() {

        const { deck } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle} >{deck.title}</Text>
                <Text style={{color: gray}}>{deck.questions.length} cards</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: black,
        padding: 30
    },
    deckTitle: {
        fontSize: 28
    }
})

export default DeckCover