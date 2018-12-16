import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, black, white } from '../utils/colors';

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
        return {
            'title': deckTitle
        }
    }

    handleNewCard = () => {
        this.props.navigation.navigate(
            `AddCard`,
            { deckTitle: this.props.navigation.state.params.deckTitle }
        )
    }

    handleQuizDeck = () => {
        this.props.navigation.navigate(
            `QuizDeck`,
            { deckTitle: this.props.navigation.state.params.deckTitle }
        )
    }

    render() {

        const { deck } = this.props

        if (deck) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={{ color: gray }}>{deck.questions.length} cards</Text>
                    <View style={styles.btnsView}>
                        <TouchableOpacity style={styles.addBtn} onPress={this.handleNewCard}>
                            <Text style={{ color: black }}>Add Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.startBtn} onPress={this.handleQuizDeck}>
                            <Text style={{ color: white }} >Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 40,
        fontSize: 34,
    },
    btnsView: {
        marginTop: 60
    },
    addBtn: {
        borderWidth: 1,
        borderColor: black,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 6
    },
    startBtn: {
        marginTop: 10,
        backgroundColor: black,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 6
    }
})

const mapStateToProps = (decks, { navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
        deck: decks[deckTitle] || null
    }
}


export default connect(
    mapStateToProps
)(DeckDetail)