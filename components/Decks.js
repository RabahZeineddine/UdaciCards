import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/helpers'
import DeckCover from './DeckCover';
import { connect } from 'react-redux'

class Decks extends Component {

    state = {
        decks: []
    }

    componentDidMount() {
        getDecks()
            .then(JSON.parse)
            .then((decks) => {
                this.props.receiveDecks(decks)
            })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate(
            `DeckDetail`,
            { deckTitle: item.title }
        )}>
            <DeckCover deck={item} />
        </TouchableOpacity>
    )

    render() {

        const { decks } = this.props
        return (
            <View>
                <FlatList
                    data={decks}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = (decks) => {
    return {
        decks: Object.keys(decks).reduce((acc, curr) => {
            const deck = {
                ...decks[curr],
                key: curr
            }
            acc.push(deck)
            return acc
        }, [])
    }
}

const mapDispatchToProps = dispatch => () => {
    return {
        receiveDecks: (decks) => dispatch(receiveDecks(decks))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Decks)