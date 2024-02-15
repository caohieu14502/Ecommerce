import React, { useReducer } from "react";
import Home from './components/Home/Home'
import Cate from './components/Share/Category';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductDetails from "./components/Product/ProductDetails";
import CardItem from "./components/Share/CardItem";
import Store from "./components/Store/Store";
import Login from './components/User/Login';
import MyUserReducer from './reducers/MyUserReducer';
import MyContext from './configs/MyContext';
import Logout from './components/User/Logout';
import User from './components/User/User';
import Register from './components/User/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Product from "./components/Store/Product";


const Tab = createBottomTabNavigator();

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, null)
    return (
        <SafeAreaProvider>
            <MyContext.Provider value={[user, dispatch]}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName={Home}
                        screenOptions={{ headerShown: false }} backBehavior={"history"}
                    >
                        <Tab.Screen name="Home" component={Home} options={{
                            tabBarIcon: () => (     
                                <Feather name="home" size={24} color="black" />
                            ),
                        }} />
                        {user === null ? <>
                            <Tab.Screen name='Login' component={Login} options={{ title: "Login" }} />
                            <Tab.Screen name='Res' component={Register} options={{ title: "Register" }} />
                        </> : <>
                            <Tab.Screen name="User" component={User} options={{ title: user.username }} />
                            <Tab.Screen name="Logout" component={Logout} />
                        </>}

                        <Tab.Screen name="Cate" component={Cate} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="CardItem" component={CardItem} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="ProductDetails" component={ProductDetails} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Store" component={Store} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Product" component={Product} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                    </Tab.Navigator>
                </NavigationContainer>
            </MyContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;
