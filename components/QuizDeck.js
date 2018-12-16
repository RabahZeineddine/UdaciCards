import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'
import { white, black } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class QuizDeck extends Component {

    state = {
        currentQuestion: 1,
        correctAnswers: 0
    }

    handleCorrectQuiz = () => {
        const { correctAnswers } = this.state

        this.setState({
            correctAnswers: correctAnswers + 1,
        })

        this.nextQuestion()
    }

    handleIncorrectQuiz = () => {
        this.nextQuestion()
    }

    nextQuestion = () => {
        this.setState((prevState) => ({ currentQuestion: prevState.currentQuestion + 1 }))
    }

    backToDeck = () => {
        this.props.navigation.goBack()
    }

    restartQuiz = () => {
        this.setState({
            currentQuestion: 1,
            correctAnswers: 0
        })
    }

    completedQuiz = () => {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    render() {
        const { deck } = this.props
        if (deck) {
            if (deck.questions.length == 0) {
                return (
                    <View style={styles.container} >
                        <Text style={styles.noQuestionsText}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
                    </View>
                )
            } else {
                if (this.state.currentQuestion <= deck.questions.length) {
                    return (
                        <View style={styles.container}>
                            <Text style={styles.quizStatus}>{`${this.state.currentQuestion} / ${deck.questions.length}`}</Text>
                            <QuestionCard quiz={deck.questions[this.state.currentQuestion - 1]} />
                            <View>
                                <TouchableOpacity style={styles.correctBtn} onPress={this.handleCorrectQuiz}>
                                    <Text style={styles.btnText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.incorrectBtn} onPress={this.handleIncorrectQuiz}>
                                    <Text style={styles.btnText}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                } else {
                    this.completedQuiz()
                    return (
                        <View style={styles.center}>
                            <Text style={styles.finish}>Quiz Finished!</Text>
                            <Text style={styles.perc}>{((this.state.correctAnswers * 100) / deck.questions.length).toFixed(2)} % Correct</Text>
                            <View style={{ marginTop: 40 }}>
                                <TouchableOpacity style={styles.btn} onPress={this.restartQuiz}>
                                    <Text style={{ color: black }}>Restart Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={this.backToDeck}>
                                    <Text style={{ color: black }}>Back to deck</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            }
        } else {
            return (
                <View>
                    <Text>An error occured</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    noQuestionsText: {
        marginLeft: 30,
        marginRight: 30,
        fontSize: 32,
        textAlign: 'center'
    },
    quizStatus: {
        alignSelf: 'flex-start',
        fontSize: 24
    },
    correctBtn: {
        backgroundColor: 'green',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 6,
    },
    incorrectBtn: {
        backgroundColor: '#e60000',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 6,
        marginTop: 10,
    },
    btnText: {
        color: white,
        fontSize: 18,
        textAlign: 'center'
    },
    finish: {
        fontSize: 24
    },
    perc: {
        fontSize: 32
    },
    btn: {
        marginTop: 20,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: black,
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
)(QuizDeck)
