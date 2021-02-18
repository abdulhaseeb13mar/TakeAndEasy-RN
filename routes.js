import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './Resuables/RefNavigation';
import Home from './Main/Home';
import SingleProduct from './Main/SingleProduct';
import MyCart from './Main/MyCart';
import PersonalInfoTakenEasy from './Main/PersonalInfoTakenEasy';
import SearchTakenEasy from './Main/SearchTakenEasy';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SingleProduct" component={SingleProduct} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen
          name="PersonalInfoTakenEasy"
          component={PersonalInfoTakenEasy}
        />
        <Stack.Screen name="SearchTakenEasy" component={SearchTakenEasy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
