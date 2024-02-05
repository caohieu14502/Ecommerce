import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Apis, { endpoints } from '../../configs/Apis';

const ProductDetails = ({ route, navigation }) => {
  const productId = route.params?.productId;
  const [product, setProduct] = React.useState(null);

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
    // Xử lý chuyển hướng đến trang xem shop tương ứng
    navigation.navigate('Store', { storeId: product.store.id });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity style={styles.viewShopButton} onPress={handleViewShop}>
          <Text style={styles.viewShopButtonText}>Xem shop {product.store.id}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  viewShopButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  viewShopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetails;