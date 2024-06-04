import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../constants/colors'; // Import the colors
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icons

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: 'https://img.lovepik.com/photo/20230421/medium/lovepik-a-workman-with-a-clipboard-photo-image_352254965.jpg' }} style={styles.image} />
        <Text style={styles.title}>Kayıt Ol</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Handle Email Signup */}}>
          <Icon name="mail-outline" size={20} color={colors.white} style={styles.icon} />
          <Text style={styles.buttonText}>Email ile Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Handle Facebook Signup */}}>
          <Icon name="logo-facebook" size={20} color={colors.white} style={styles.icon} />
          <Text style={styles.buttonText}>Facebook ile Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Zaten bir hesabınız var mı? Giriş Yapın</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  innerContainer: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 30,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  link: {
    color: colors.primary,
    marginTop: 20,
  },
});

export default SignupScreen;
