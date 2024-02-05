import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Apis, { endpoints } from '../../configs/Apis';

const Store = ({ route }) => {
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

    return (
        <View>
            {store === null ? <ActivityIndicator/> :
                <View>
                    <Text>{store.id} - {store.name}</Text>
                </View>
            }
        </View>
    )
}

export default Store