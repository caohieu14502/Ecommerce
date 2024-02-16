import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {  useContext, useReducer } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { Ionicons } from '@expo/vector-icons';
import MyContext from '../../configs/MyContext';
import MyUserReducer from '../../reducers/MyUserReducer';

const Store = ({ route, navigation }) => {
  const storeId = route.params?.storeId;
  const [store, setStore] = React.useState(null);
  const [user, dispatch] = useContext(MyContext)

  // let views;

  React.useEffect(() => {
    const loadStore = async () => {
      try {
        const res = await Apis.get(endpoints['store'](user.store));
        let user = await authApi(res.data.access_token).get(endpoints["current-user"])
        setStore(res.data);
        console.error(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadStore();
  }, [storeId])

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  if(user.user_role !== 2 ) {
    views = user.status === "Rejected"?
    <Text>Bạn bị từ chối luôn rồi :V </Text>:
    <Text>Cửa hàng của bạn đang trong trạng thái chờ duyệt!</Text>
  }  else {
  
    views = store === null ? <ActivityIndicator /> :
    <ScrollView style={styles.container}>
      {/* <View className="relative">
        <Image
          source={require('../../img/anh.jpg')}
          style={styles.storeImage}
          resizeMode="cover"
          blurRadius={2}
        />
        <TouchableOpacity className="absolute z-20 top-8 left-4 border-2 border-transparent	rounded-full bg-gray-400" onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeName}>{store.id}</Text>
        <Text style={styles.storeDescription}>This is my awesome store.</Text>
      </View> */}
      <Text>Cửa hàng của bạn đây nè :3</Text>
    </ScrollView>
  }

  return (
    <View>
      {/* {user.status === "Approved"? :<Text>Chưa có nè bạn ơi</Text>} */}
      <Text>Ccửa Hàng của bạn nè</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    backgroundColor: 'red',
  },
  storeImage: {
    width: '100%',
    height: 250,
  },
  storeInfoContainer: {
    padding: 16,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storeDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  storeLocation: {
    fontSize: 16,
    marginBottom: 8,
  },
  storeRating: {
    fontSize: 16,
  },
});
export default Store