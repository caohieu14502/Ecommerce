import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { useSafeAreaInsets, } from 'react-native-safe-area-context';


const Cate = ({ navigation }) => {
    const [categories, setCategories] = React.useState(null);
    const insets = useSafeAreaInsets();

    React.useEffect(() => {
        const loadCategories = async () => {
            let url = endpoints["categories"];

            try {
                let res = await Apis.get(url);
                setCategories(res.data);
            } catch (ex) {
                console.error(ex);
            }
        };

        loadCategories();
    }, []);
    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}>
                <Text>Đến trang demo</Text>
            </TouchableOpacity>

            {categories === null ? (
                <ActivityIndicator />
            ) : (
                <View>
                    {categories.map((category) => (
                        <View key={category.id}>
                            <Text>{category.name}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    )
}

export default Cate