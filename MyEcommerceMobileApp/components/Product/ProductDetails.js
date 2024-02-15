import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import Apis, { endpoints } from '../../configs/Apis';
import { Ionicons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import { Entypo } from '@expo/vector-icons';

const ProductDetails = ({ route, navigation }) => {
  const productId = route.params?.productId;
  const [product, setProduct] = React.useState(null);
  const windowDimensions = useWindowDimensions();

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await Apis.get(endpoints['product-details'](productId));
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [productId]);

  if (product === null) {
    return <ActivityIndicator style={styles.container} />;
  }

  const handleViewShop = () => {
    navigation.navigate('Store', { storeId: product.store.id });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const tagsStyles = {
    p: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    h1: {
      fontSize: 20,
    },
  };

  return (
    <ScrollView className="bg-slate-100" style={styles.container}>
      <View className="relative">
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity className="absolute z-20 top-8 left-4 border-2 border-transparent	rounded-full bg-gray-400" onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View className="bg-white p-4 mb-2" style={{ width: windowDimensions.width }}>
        <Text className="font-bold text-2xl mb-2 text-red-500" >₫{product.price}</Text>
        <Text className="font-bold text-2xl mb-4" numberOfLines={2} ellipsizeMode="tail">{product.name}</Text>
        <Text>
          <Entypo name="star" size={20} color="#e3ec13" /> 4.6/5 | Đã bán 250
        </Text>
      </View>

      <View className="bg-white p-4 flex-row justify-between	">
        <View className="flex-row">
          <Image
            source={{ uri: 'https://res.cloudinary.com/dy4p98hhs/image/upload/v1705723922/i01x5nw5i5ine1lvtwms.jpg' }}
            style={{
              width: 80,
              height: 80,
              resizeMode: 'cover',
            }}
          />
          <View className="ml-2">
            <Text className="font-medium text-xl">{product.store.name}</Text>
            <View className="flex-row items-center	">
              <Entypo name="location-pin" size={20} color="black" />
              <Text className="font-light	text-xl">{product.store.location}</Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity className="border-2	border-red-600 p-1 " style={styles.viewShopButton} onPress={handleViewShop}>
            <Text className="text-red-500	">Xem Shop </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white p-4 mt-2">
        <Text className="font-normal">Mô tả sản phẩm</Text>
        <RenderHTML tagsStyles={tagsStyles} source={{ html: product.description }} contentWidth={windowDimensions.width} />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  viewShopButton: {
    marginTop: 16,
  },
});

export default ProductDetails;