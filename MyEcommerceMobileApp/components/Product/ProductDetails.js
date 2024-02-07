import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import Apis, { endpoints } from '../../configs/Apis';
import { Ionicons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ProductDetails = ({ route, navigation }) => {
  const productId = route.params?.productId;
  const [product, setProduct] = React.useState(null);
  const windowDimensions = useWindowDimensions();
  const imageWidth = windowDimensions.width;

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
    <ScrollView className="bg-slate-100	" style={styles.container}>
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

      <View className="bg-white p-4 mb-2">
        <RenderHTML tagsStyles={tagsStyles} source={{ html: product.description }} contentWidth={windowDimensions.width} />
      </View>

      <View className="bg-white p-4 flex-row justify-center	">
      <TouchableOpacity>
        <Image
          source={require('../../img/anh.jpg')}
          style={{
            width: '100%',
            height: '50%',
            resizeMode: 'cover',
            borderRadius: 50
          }}
        /></TouchableOpacity>
        <Text style={styles.viewShopButtonText}>{product.store.name} {product.store.user.username}</Text>
        <TouchableOpacity style={styles.viewShopButton} onPress={handleViewShop}><Text>Xem shop </Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  viewShopButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  viewShopButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetails;