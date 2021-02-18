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
import PersonalInfo from './Main/personalInfo';
import SearchStones from './Main/SearchStones';
import Favourite from './Main/MyFavourites';
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
        {/* <Stack.Screen name="PersonalInfo" component={PersonalInfo} /> */}
        {/* <Stack.Screen name="SearchStones" component={SearchStones} /> */}
        {/* <Stack.Screen name="Favourite" component={Favourite} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
