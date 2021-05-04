import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import WalkScreen from "./src/screens/WalkScreen";
import PoemScreen from "./src/screens/PoemScreen";
import MapScreen from "./src/screens/MapScreen";
import BrowseScreen from "./src/screens/BrowseScreen";

const navigator = createStackNavigator (
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        animationEnabled: false,
        headerShown: false
      }
    },
    Walk: {
      screen: WalkScreen,
      navigationOptions: {
        animationEnabled: false,
        title: "Active walk"
      }
    },
    Poem: {
      screen: PoemScreen,
      navigationOptions: {
        animationEnabled: false,
        title: "Poem"
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        animationEnabled: false,
        title: "Map"
      }
    },
    Browse: {
      screen: BrowseScreen,
      navigationOptions: {
        animationEnabled: false,
        title: "Browse poems"
      }
    }
  },
  { initialRouteName: "Home" }
);

export default createAppContainer(navigator);