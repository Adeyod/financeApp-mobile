import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { SearchProp } from '@/constants/types';

const Search = ({
  searchValue,
  setSearchValue,
  handleKeyPress,
}: SearchProp) => {
  return (
    <View style={styles.textInputContainerStyle}>
      <TextInput
        style={styles.TextInputStyle}
        placeholder="Search.."
        value={searchValue}
        onKeyPress={handleKeyPress}
        onChangeText={(value) => setSearchValue(value)}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  textInputContainerStyle: {},
  TextInputStyle: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 10,
  },
});
