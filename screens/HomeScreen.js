import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import colors from '../constants/colors';

const initialEmployees = [
  { id: '1', name: 'Şaban', salary: 60000, title: 'Mühendis' },
  { id: '2', name: 'Süleyman', salary: 60000, title: 'Alçı Ustası' },
  { id: '3', name: 'Eflatun :)', salary: 30000, title: 'Mimar' },
  { id: '4', name: 'Enes', salary: 20000, title: 'Amele' },
  { id: '5', name: 'Hasan', salary: 10000, title: 'Bekçi' },
];

const HomeScreen = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedDate, setSelectedDate] = useState('2024-05-28');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(false);
  };

  const handleEmployeePress = (employee) => {
    navigation.navigate('EmployeeDetail', { employee, selectedDay: { dateString: selectedDate } });
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const formattedDate = format(new Date(selectedDate), 'dd MMMM yyyy EEEE');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedDateText}>{formattedDate}</Text>
      </TouchableOpacity>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEmployeePress(item)}>
            <View style={styles.employeeItem}>
              <Text>{item.name} - {item.title}</Text>
              <Text>{item.salary} TL</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddEmployee', { handleAddEmployee })}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              current={selectedDate}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: colors.primary },
              }}
            />
            <Button title="Kapat" onPress={() => setModalVisible(false)} color={colors.primary} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: colors.rowBackground,
    color: colors.text,
    borderRadius: 5,
  },
  employeeItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
  },
});

export default HomeScreen;
