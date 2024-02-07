import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const SearchComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput className="border-2 border-red-400	py-2 px-3 "
        style={styles.input}
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.messageButton} onPress={handleSearch}>
        <AntDesign name="message1" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    marginHorizontal: 10,
  },
  messageButton:{
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 8,
    // marginLeft: 10,
    marginRight: 10,
  }
});

export default SearchComponent;