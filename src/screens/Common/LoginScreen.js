import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, HelperText, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import FormInput from '../../components/FormInput';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { colors } = useTheme();

  const handleLogin = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Welcome Back!</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>Log in to your account</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <FormInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && !!errors.email}
              errorMessage={errors.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <FormInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && !!errors.password}
              errorMessage={errors.password}
              secureTextEntry
            />
            {error && <HelperText type="error" visible={!!error} style={styles.apiError}>{error}</HelperText>}
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.button}
            >
              Login
            </Button>
            <Button
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
              textColor={colors.primary}
            >
              Don't have an account? Sign Up
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
  apiError: {
    textAlign: 'center',
    fontSize: 14,
  }
});

export default LoginScreen;