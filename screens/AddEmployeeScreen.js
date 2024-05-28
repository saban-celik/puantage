import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../constants/colors';

const AddEmployeeScreen = () => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [title, setTitle] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { handleAddEmployee } = route.params;

  const addEmployee = () => {
    if (name && salary && title) {
      const newEmployee = {
        id: Date.now().toString(),
        name,
        salary: parseFloat(salary),
        title,
      };
      handleAddEmployee(newEmployee);
      Alert.alert('Başarılı', 'Çalışan eklendi.');
      navigation.goBack();
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Çalışan İsmi"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ünvan"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Maaş"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <Button title="Ekle" onPress={addEmployee} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AddEmployeeScreen;
