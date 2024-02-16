import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets, } from 'react-native-safe-area-context';
import Logout from "./Logout";

const Profiles = ({navigation}) =>{
    return(<>
        <View style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Home')}>
            <Text>Đến trang Home</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
        <TouchableOpacity
                //                                      //
                // 1. chưa đăng kí
                // 2. Đăng kí rồi
                //    2.1 chưa duyệt
                //    2.2 đã duyệt
                //    2.3 hủy
                // Check xem đã có chưa(đang là user hay store trong role) 
                // -> chưa(user) thì vào trang đăng kí
                // -> rồi(pending) thì báo đang chờ/đã hủy, có link đăng kí
                onPress={() => navigation.navigate('Store')}>
                <Text>Đến trang Store</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.container}>
        <Logout/>
        </View>
    </>)
}

export default Profiles

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      width: '100%'
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
  });