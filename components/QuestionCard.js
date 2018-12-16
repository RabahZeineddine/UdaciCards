import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class QuestionCard extends Component {

    state = {
        current: 'question'
    }

    quizToggle = () => {
        this.setState((prevState) => ({
            current: prevState.current === 'question' ? 'answer' : 'question'
        }))
    }

    render() {
        const { quiz } = this.props
        const { current } = this.state

        return (
            <View style={styles.card}>
                <Text style={styles.quizText}>{current === 'question' ? quiz.question : quiz.answer}</Text>
                <TouchableOpacity onPress={this.quizToggle} >
                    <Text style={styles.quizToggleText}>{this.state.current === 'question' ? 'Answer' : 'Question'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        paddingTop: 0,
        alignItems: 'center'
    },
    quizText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 45,
        textAlign: 'center'
    },
    quizToggleText: {
        fontSize: 22,
        color: 'red',
        marginTop: 10
    }
})

export default QuestionCard