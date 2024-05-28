import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../constants/colors'; 

const initialEmployees = [
  { id: '1', name: 'Ali', salary: 3000 },
  { id: '2', name: 'Veli', salary: 3200 },
  { id: '3', name: 'Ayşe', salary: 3100 },
];

const EmployeeListScreen = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeSalary, setNewEmployeeSalary] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDay } = route.params;

  const handleEmployeePress = (employee) => {
    const workedDays = 15; 
    navigation.navigate('EmployeeDetail', { employee, selectedDay: { ...selectedDay, workedDays } });
  };

  const addEmployee = () => {
    if (newEmployeeName && newEmployeeSalary) {
      const newEmployee = {
        id: (employees.length + 1).toString(),
        name: newEmployeeName,
        salary: parseFloat(newEmployeeSalary),
      };
      setEmployees([...employees, newEmployee]);
      setNewEmployeeName('');
      setNewEmployeeSalary('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Çalışan Listesi - {selectedDay.dateString}</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEmployeePress(item)}>
            <Text style={styles.employeeItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.addEmployeeContainer}>
        <TextInput
          style={styles.input}
          placeholder="Çalışan İsmi"
          value={newEmployeeName}
          onChangeText={setNewEmployeeName}
          placeholderTextColor={colors.text}
        />
        <TextInput
          style={styles.input}
          placeholder="Maaş"
          value={newEmployeeSalary}
          onChangeText={setNewEmployeeSalary}
          keyboardType="numeric"
          placeholderTextColor={colors.text}
        />
        <Button title="Ekle" onPress={addEmployee} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  employeeItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    color: colors.text,
  },
  addEmployeeContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.text,
  },
});

export default EmployeeListScreen;
