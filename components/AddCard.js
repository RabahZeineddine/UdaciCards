import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { black, white } from '../utils/colors';
import { addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import { addCard } from '../actions'

class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    handleQuestionChange = (question) => {
        this.setState({ question })
    }
    handleAnswerChange = (answer) => {
        this.setState({ answer })
    }

    handleSubmit = () => {
        const { question, answer } = this.state
        if (question != '' && answer != '') {
            const { deckTitle } = this.props.navigation.state.params
            const card = { question, answer }
            addCardToDeck(deckTitle, card)
                .then(() => {
                    this.props.addCard(deckTitle, card)
                    this.props.navigation.goBack()
                })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        value={this.state.question}
                        onChangeText={this.handleQuestionChange}
                        placeholder="Add your question"

                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        value={this.state.answer}
                        onChangeText={this.handleAnswerChange}
                        placeholder="Add the answer"

                    />
                </View>

                <View style={styles.submitView}>
                    <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    inputView: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        padding: 5,
        paddingTop: 0,
        marginTop: 40
    },
    input: {
        height: 52,
        borderBottomColor: black,
        borderBottomWidth: 1
    },
    submitView: {
        alignItems: 'center'
    },
    btn: {
        backgroundColor: black,
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 6,
        marginTop: 30
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

const mapDispatchToProps = dispatch => () => {
    return {
        addCard: (title, card) => dispatch(addCard(title, card))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AddCard)