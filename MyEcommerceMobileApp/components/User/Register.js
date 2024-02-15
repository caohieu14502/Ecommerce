import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import MyStyles from "../../styles/MyStyles"
import * as ImagePicker from 'expo-image-picker'
import Apis, { authApi, endpoints } from "../../configs/Apis"
import { useState } from "react"

const Register = ({navigation}) => {
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "avatar": "",
    })
    
    const register = async () => {
        let form = new FormData()
        for (let key in user) {
            if(key === "avatar") 
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].fileName,
                    type: user[key].uri.type
                })
            else {
                form.append(key, user[key])
            }
        }

        try {
            let res = await Apis.post(endpoints['register'], form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            
            navigation.navigate("Login")
        } catch (ex) {
            console.error(ex)
        }
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