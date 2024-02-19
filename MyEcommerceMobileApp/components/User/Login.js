import { View, Text, TextInput, TouchableOpacity } from "react-native"
import MyStyles from "../../styles/MyStyles"
import { useContext, useState } from "react"
import MyContext from "../../configs/MyContext"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({ navigation }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);

    const login = async () => {
        setLoading(true);

        try {
            let res = await Apis.post(endpoints['login'], {
                "username": username,
                "password": password,
                "client_id": "Gz8MgPSlyWzCHrXn1BZaow4qddpzab3i0QWNmSJz",
                "client_secret": "2r7CGvoBBFuCmqqM6fbThAPtYOoykchi8z85djQ2IQwgpvbjNCjn4SGbX2xLkcB1wvaZRDizuSLa9Oo22UGPRgKwmFMIn0MY6t10bIanZ11aEH97TRDJoTRLJXMCVUN0",
                "grant_type": "password"
            });
            await AsyncStorage.setItem('access-token', res.data.access_token )
            let user = await authApi(res.data.access_token).get(endpoints['current-user']);
            dispatch({
                type: "login",
                payload: user.data
            });
            navigation.navigate("Home");
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={MyStyles.container}>
            <Text>Login</Text>
            <TextInput value={username} onChangeText={t => setUsername(t)} placeholder="Username" />
            <TextInput value={password} onChangeText={t => setPassword(t)} secureTextEntry={true} placeholder="Password" />
            <TouchableOpacity onPress={login}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login