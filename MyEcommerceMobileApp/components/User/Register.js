import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import MyStyles from "../../styles/MyStyles"
import * as ImagePicker from 'expo-image-picker'
import Apis, { authApi, endpoints } from "../../configs/Apis"
import { useState } from "react"

const Register = () => {
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "avatar": "",
    })
    
    const register = () => {

    }

    const picker = async () => {
        let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted')
            alert("Permission Denied!!!")
        else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                change('avatar', res.assets[0])
            }
        }
    }

    const change = (field, value) => {
        setUser(current => {
            return {...current, [field]:value}
        })
    }

    return(
        <View style={MyStyles.container}>
            <Text>Register</Text>

            <TextInput placeholder="Firstname" value={user.first_name} onChange={t=>change("first_name", t)}/>
            <TextInput placeholder="Lastname" value={user.last_name} onChange={t=>change("last_name", t)}/>
            <TextInput placeholder="Username" value={user.username} onChange={t=>change("username", t)}/>
            <TextInput secureTextEntry={true} placeholder="Password" value={user.password} onChange={t=>change("password", t)}/>
            <TextInput secureTextEntry={true} placeholder="Confirm Password"/>
            <TouchableOpacity onPress={picker}>
                <Text>Avatar</Text>
            </TouchableOpacity>
            {user.avatar?<Image style={{width: 100, height: 100}} source={{uri: user.avatar.uri}}/>:""}
            <TouchableOpacity onPress={register}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register