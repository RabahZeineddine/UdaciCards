import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { black, white } from '../utils/colors';
import { saveDeckTitle, getDecks } from '../utils/helpers'


class NewDeck extends Component {

    state = {
        title: ''
    }

    handleTitleChange = (title) => {
        this.setState({ title })
    }

    handleSubmit = () => {
        const { title } = this.state
        if (title != '') {
            saveDeckTitle(title)
                .then(getDecks)
                .then(JSON.parse)
                .then((decks) => this.props.receiveDecks(decks))
                .then(() => {
                    this.props.navigation.navigate(
                        `DeckDetail`,
                        { deckTitle: title }
                    )
                })

        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title} >What is the title of your new deck?</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.titleInput}
                        value={this.state.title}
                        onChangeText={this.handleTitleChange}
                        placeholder="Deck title"
                    />
                </View>
                <View style={styles.submitView} >
                    <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
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
    title: {
        marginTop: 40,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 45,
        textAlign: 'center'
    },
    titleInput: {
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
        receiveDecks: (decks) => dispatch(receiveDecks(decks))
    }
}

export default connect(null, mapDispatchToProps)(NewDeck)