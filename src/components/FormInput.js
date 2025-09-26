import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const FormInput = ({ label, value, onChangeText, onBlur, error, errorMessage, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={error}
        {...props}
      />
      <HelperText type="error" visible={error}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    }
});

export default FormInput;