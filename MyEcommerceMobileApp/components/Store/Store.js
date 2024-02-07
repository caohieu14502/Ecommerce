import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { Ionicons } from '@expo/vector-icons';

const Store = ({ route, navigation }) => {
  const storeId = route.params?.storeId;
  const [store, setStore] = React.useState(null);

  React.useEffect(() => {
    const loadStore = async () => {
      try {
        const res = await Apis.get(endpoints['store'](storeId));
        setStore(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadStore();
  }, [storeId])

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (

    <View>
      {store === null ? <ActivityIndicator /> :
        <ScrollView style={styles.container}>
          <View className="relative">
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
            {/* <Text style={styles.storeLocation}>Location: New York, USA</Text> */}
            {/* <Text style={styles.storeRating}>Rating: 4.5/5</Text> */}
          </View>
        </ScrollView>
      }
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