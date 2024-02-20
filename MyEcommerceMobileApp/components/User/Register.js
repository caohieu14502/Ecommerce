import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import MyStyles from "../../styles/MyStyles"
import * as ImagePicker from 'expo-image-picker'
import Apis, { authApi, endpoints } from "../../configs/Apis"
import { useState } from "react"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Register = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "avatar": "",
        "confirmPass": ""
    })

    const register = async () => {
        let form = new FormData()
        for (let key in user) {
            if (key === "avatar") {
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].fileName,
                    type: "image/jpeg"
                })
            }
            else if (key !== "confirmPass") {
                form.append(key, user[key])
            }
        }

        try {
            let res = await Apis.post(endpoints['register'], form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            console.error(res.data)
            navigation.navigate("Login")
        } catch (ex) {
            console.error(ex)
        }
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
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
            return { ...current, [field]: value }
        })
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            flex: 1
        }} className="bg-slate-100">
            <View className="flex-row items-center bg-white">
                <TouchableOpacity className=" w-10 h-10 ml-3 mt-3 border-2 border-transparent " onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="orange" />
                </TouchableOpacity>
                <Text className="text-xl">Create Store</Text>
            </View>

            <View className="justify-center	mt-20 ">
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput value={user.first_name} onChangeText={(t) => change("first_name", t)}
                        className="ml-4"
                        placeholder="Nhập First Name">
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput value={user.last_name} onChangeText={(t) => change("last_name", t)}
                        className="ml-4"
                        placeholder="Nhập Last Name" >
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput value={user.username} onChangeText={(t) => change("username", t)}
                        className="ml-4"
                        placeholder="Nhập tên đăng nhập">
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput secureTextEntry={true} value={user.password} onChangeText={(t) => change("password", t)}
                        className="ml-4"
                        placeholder="Mật khẩu">
                    </TextInput>
                </View>

                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput secureTextEntry={true} onChangeText={(t) => change("confirmPass", t)}
                        className="ml-4"
                        placeholder="Xác nhận mật khẩu">
                    </TextInput>
                </View>
                <View className="">
                    <TouchableOpacity style={{
                        backgroundColor: '#F8F8F8',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 5,
                    }}
                        onPress={picker}>
                        <Text>Chọn ảnh đại diện...</Text>
                    </TouchableOpacity>
                </View>
                {user.avatar ? <Image style={{ width: 100, height: 100 }} source={{ uri: user.avatar.uri }} /> : ""}

                <View className="mt-6 items-center">
                    <TouchableOpacity className="items-center bg-orange-400 p-4 w-36 h-14" onPress={register}>
                        <Text>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register