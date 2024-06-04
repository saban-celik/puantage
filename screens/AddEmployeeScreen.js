import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import colors from '../constants/colors';

const AddEmployeeScreen = () => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [title, setTitle] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { handleAddEmployee } = route.params;

  const addEmployee = async () => {
    if (name && salary && title) {
      try {
        const newEmployee = {
          name,
          salary: parseFloat(salary),
          title,
        };
        const docRef = await addDoc(collection(db, "employees"), newEmployee);
        newEmployee.id = docRef.id;
        handleAddEmployee(newEmployee);
        Alert.alert('Başarılı', 'Çalışan eklendi.');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Hata', 'Çalışan eklenirken bir hata oluştu.');
      }
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
