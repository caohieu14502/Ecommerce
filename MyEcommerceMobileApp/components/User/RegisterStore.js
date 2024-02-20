import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Apis, { authApi, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from "../../configs/MyContext"
import { useContext } from "react"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const RegisterStore = ({ navigation }) => {
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [name, setName] = React.useState("");
  const [user, dispatch] = useContext(MyContext);
  const insets = useSafeAreaInsets();

  const createStore = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token")

      const res = await authApi(accessToken).post(endpoints["register-store"], {
        "description": description,
        "location": location,
        "name": name,
        "user": user
      });

    }
    catch (error) {
      console.error(error);
    }
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
          <FontAwesome5 name="store" size={24} color="black" />
          <TextInput value={name} onChangeText={(t) => setName(t)}
            className="ml-4"
            placeholder="Nhập tên cửa hàng">
          </TextInput>
        </View>
        <View className="flex-row border-b-2 border-inherit px-24 py-2">
          <Entypo name="location" size={24} color="black" />
          <TextInput value={location} onChangeText={(t) => setLocation(t)}
            className="ml-4"
            placeholder="Nhập vị trí cửa hàng" >
          </TextInput>
        </View>
        <View className="flex-row border-b-2 border-inherit px-24 py-2">
          <MaterialIcons name="description" size={24} color="black" />
          <TextInput value={description} onChangeText={(t) => setDescription(t)}
            className="ml-4"
            placeholder="Nhập văn bản setDescription">
          </TextInput>
        </View>
        <View className="mt-6 items-center">
          <TouchableOpacity className="items-center	bg-orange-400 p-4 w-36 h-14" onPress={createStore}>
            <Text>Tạo cửa hàng</Text>
          </TouchableOpacity>
        </View>
      </View>






    </View>
  )
}

export default RegisterStore