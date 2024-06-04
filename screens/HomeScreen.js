import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import colors from '../constants/colors';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from '../components/Calendar'; 

const HomeScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const fetchedEmployees = [];
    querySnapshot.forEach((doc) => {
      fetchedEmployees.push({ ...doc.data(), id: doc.id });
    });
    setEmployees(fetchedEmployees);
  };

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

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteDoc(doc(db, "employees", employeeId));
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
      Alert.alert('Başarılı', 'Çalışan silindi.');
    } catch (error) {
      Alert.alert('Hata', 'Çalışan silinirken bir hata oluştu.');
    }
  };

  const formattedDate = format(new Date(selectedDate), 'dd MMMM yyyy EEEE', { locale: tr });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedDateText}>{formattedDate}</Text>
      </TouchableOpacity>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.employeeItemContainer}>
            <TouchableOpacity style={styles.employeeItem} onPress={() => handleEmployeePress(item)}>
              <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <Text style={styles.employeeTitle}>{item.title}</Text>
                <Text style={styles.employeeSalary}>{item.salary} TL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEmployee(item.id)}>
              <Icon name="trash" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
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
            <CustomCalendar onDayPress={handleDayPress} />
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
  employeeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  employeeItem: {
    flex: 1,
  },
  employeeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employeeName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
  },
  employeeTitle: {
    fontSize: 14,
    color: colors.gray,
  },
  employeeSalary: {
    fontSize: 14,
    color: colors.text,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: colors.danger,
    padding: 5,
    borderRadius: 5,
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
