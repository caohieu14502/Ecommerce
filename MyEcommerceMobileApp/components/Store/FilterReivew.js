import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FilterReview = () => {
    const [activeButton, setActiveButton] = useState('Tất cả');
    const data = ['Tất cả', '1', '2', '3', '4', '5'];
    const navigation = useNavigation();

    const clickFilterStar = (value) => {
        setActiveButton(value);
        if (value > 0)
            navigation.setParams({ star: value });
        else
        navigation.setParams({ star: '' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => clickFilterStar(item)}
                        style={[
                            styles.button,
                            activeButton === item ? styles.activeButton : null,
                        ]}
                    >
                        <Text style={styles.buttonText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: 'lightgray',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    activeButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default FilterReview;