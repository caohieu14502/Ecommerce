import React from "react";
import Home from './components/Home/Home'
import Cate from './components/Share/Cate';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProductDetails from "./components/Product/ProductDetails";
import CardItem from "./components/Share/CardItem";
import Store from "./components/Store/Store";
import Login from './components/User/Login';
import MyUserReducer from './reducers/MyUserReducer';
import MyContext from './configs/MyContext';
import Logout from './components/User/Logout';
import User from './components/User/User';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, null)
    return (
        <SafeAreaProvider>
            <MyContext.Provider value={[user, dispatch]}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName={Home}
                    shifting={true}
                    screenOptions={{ headerShown: false }}
                    activeColor="#f0edf6"
                    inactiveColor="#3e2465"
                    barStyle={{ backgroundColor: '#694fad' }}
                >
                    {user===null?<>
                        <Tab.Screen name='Login' component={Login} options={{title: "Login"}}/>
                        
                    </>:<>
                        {/* Profile */}
                        <Tab.Screen name="User" component={User} options={{title: user.username}}/>
                        <Tab.Screen name="Logout" component={Logout} />
                        {/* options={{drawerItemStyle: {display: "none"}}} */}
                    </>}

                    <Tab.Screen name="Home" component={Home} options={{
                        // tabBarIcon: () => {
                        //     <Image source={require('./assets/icon.png')} />
                        // }
                    }} />
                    <Tab.Screen name="Cate" component={Cate} />
                    {/* <Stack.Screen name="Home">
                        {() => (
                            <Tab.Navigator>
                                <Tab.Screen name="Cate" component={Cate} />
                                <Tab.Screen name="Home" component={Home} />
                            </Tab.Navigator>
                        )}
                    </Stack.Screen> */}
                    <Tab.Screen name="CardItem" component={CardItem} options={{ title: "Chi tiết bài học", drawerItemStyle: { display: "none" } }} />
                    <Tab.Screen name="ProductDetails" component={ProductDetails} options={{ title: "Chi tiết bài học", tabBarVisible: false, }} />
                    <Tab.Screen name="Store" component={Store} options={{ title: "Chi tiết bài học", tabBarVisible: false, }} />
                    
                </Tab.Navigator>
            </NavigationContainer>
            </MyContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;