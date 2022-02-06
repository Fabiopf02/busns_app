import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './pages/Register';
import Logon from './pages/Logon';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Company from './pages/Company';
import AddProduct from './pages/AddProduct';
import Agenda from './pages/Agenda';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

import Camera from './components/Camera';
import Products from './components/Products';
import Services from './components/Services';
import NewService from './components/NewService';
import ToSchedule from './components/ToSchedule';
import AgendaDetails from './components/AgendaDetails';

import { ParamList } from './Types/types';

export type RouteProps<RouteName extends keyof ParamList> = RouteProp<
  ParamList,
  RouteName
>;

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.3, 0.7, 1],
              }),
            },
          }),
        }}
        initialRouteName="Register"
        detachInactiveScreens={true}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Logon" component={Logon} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Company" component={Company} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="NewService" component={NewService} />
        <Stack.Screen name="ToSchedule" component={ToSchedule} />
        <Stack.Screen name="Agenda" component={Agenda} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AgendaDetails" component={AgendaDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
