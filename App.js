import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import { Constants } from 'expo'
import { white, black, gray } from './utils/colors';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import QuizDeck from './components/QuizDeck'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar() {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar />
    </View >
  )
}

const RouteConfigs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    inactiveTintColor: gray,
    activeTintColor: black,
    style: {
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)

const MainNavigatorInner = createStackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  },
  QuizDeck: {
    screen: QuizDeck,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  }
})

const MainNavigator = createAppContainer(MainNavigatorInner)

const store = createStore(reducer)

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <UdaciStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
