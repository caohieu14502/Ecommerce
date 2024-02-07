import { View, Text, TextInput, TouchableOpacity } from "react-native"
import MyStyles from "../../styles/MyStyles"
import { useContext, useState } from "react"
import MyContext from "../../configs/MyContext"
import Apis, { authApi, endpoints } from "../../configs/Apis"

const Login = ({navigation}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(MyContext)

    const login = async () => {
        let reqData = {
            "username": username,
            "password": password,
            "client_id": "0GO8rhubZGnijL7lkTotNAZrd9atmSEwoleQjElS",
            "client_secret": "4PdBtWJS6MspG889cAbXGPhABMVhYyPFU01lx3Wasr6XTY5Y1k41jD4wKM2NQYW0U1rMyQXzeNcewkZoMcciuffxJSI5xnv3i3xzS5wWwbcokNzEXKMDXSFHUtRUO9Tq",
            "grant_type": "password",
            "withCredentials": "true"
        }
        data = Object.keys(reqData).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])
        }).join('&')

        try {
            let res = await Apis.post(endpoints["login"], data);
            let user = await authApi(res.data.access_token).get(endpoints["current-user"])
            dispatch({
                "type": "login",
                "payload": user.data
            });

            console.log(user.data)

            navigation.navigate("Home")
        } catch (ex) {
            console.error(ex)
        }

    }


    return(
        <View style={MyStyles.container}>
            <Text>Login</Text>
            <TextInput value={username} onChangeText={t => setUsername(t)} placeholder="Username"/>
            <TextInput value={password} onChangeText={t => setPassword(t)} secureTextEntry={true} placeholder="Password"/>
            <TouchableOpacity onPress={login}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login