import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Logout from "./Logout";
import { useContext } from "react";
import MyContext from "../../configs/MyContext";
import Store from "../Store/Store";

const Profiles = ({navigation}) =>{
  const [user, dispatch] = useContext(MyContext)

      //                                      //
    // 1. chưa đăng kí
    // 2. Đăng kí rồi
    //    2.1 chưa duyệt
    //    2.2 đã duyệt
    //    2.3 hủy
    // Check xem đã có chưa(đang là user hay store trong role) 
    // -> chưa(user) thì vào trang đăng kí
    // -> rồi(pending) thì báo đang chờ/đã hủy, có link đăng kí

    
  const isRegistered = () => {
    if(user.user_role === "user") {
      if (user.status === "Pending") {
        <Text>Yêu cầu về cửa hàng của bạn đang được duyệt, vui lòng chờ!!!</Text>
      } else if(user.status === "") {// rỗng tức là chưa đăng kí
        <TouchableOpacity onPress={() => navigation.navigate('RegisterStore')}>
              <Text>Đăng kí Store</Text>
        </TouchableOpacity>
      }
    } else if(user.user_role === "store"){
      <TouchableOpacity onPress={() => navigation.navigate('Store')}>
            <Text>Store của tui</Text>
      </TouchableOpacity>
      return <Store storeId={user.pk}/> 
    }
  }

    return(<>
        <View style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.navigate('RegisterStore')}>
            <Text>Đến trang RegisterStore</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
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