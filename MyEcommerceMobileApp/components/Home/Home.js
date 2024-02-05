import { ActivityIndicator, ScrollView, View, Text } from 'react-native'
import React from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import CardItem from '../Share/CardItem';
import SearchComponent from '../Share/Search';
import { useSafeAreaInsets, } from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  const [products, setProducts] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    const loadProducts = async () => {
      let url = endpoints["products"];

      if (searchQuery !== '') {
        url += `?q=${(searchQuery)}`;
      }

      try {
        let res = await Apis.get(url);
        setProducts(res.data.results);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadProducts();
  }, [searchQuery]);

  const handleSearch = (searchText) => {
    setSearchQuery(searchText);
  };

  return (
    <View style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      <SearchComponent onSearch={handleSearch} />

      <ScrollView contentContainerStyle={{
        justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, backgroundColor: '#E6E6E6', width: '100%'
      }}>
        {products === null ? (
          <ActivityIndicator />
        ) : (
          products.length === 0 ? (
            <Text>không có sản phẩm</Text>
          ) : (
            products.map((data) => (
              <View key={data.id}>
                <CardItem navigation={navigation} data={data} />
              </View>
            ))
          )
        )}
      </ScrollView>
    </View>
  )
}

export default Home;