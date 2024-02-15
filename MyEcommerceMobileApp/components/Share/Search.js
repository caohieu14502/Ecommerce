import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchComponent = ({ navigation, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
    navigation.setParams({ sort_by: '', order: '' });
  };

  return (
    <View className="flex-row	items-center">
      <TextInput className="border-2 border-red-400	py-2 px-3 "
        style={styles.input}
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 8,
    marginLeft: 4,
    marginHorizontal: 10,
  },
});

export default SearchComponent;