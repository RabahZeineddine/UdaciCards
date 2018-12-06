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
    style: {
      height: 56,
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
  }
})

const MainNavigator = createAppContainer(MainNavigatorInner)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UdaciStatusBar />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
