import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import colors from '../constants/colors';

const EmployeeDetailScreen = () => {
  const route = useRoute();
  const { employee, selectedDay } = route.params || {};
  const [markedDates, setMarkedDates] = useState({});
  const [selectedType, setSelectedType] = useState('work');
  const [totalSalary, setTotalSalary] = useState(0);

  if (!employee || !selectedDay) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Çalışan veya tarih bilgisi eksik!</Text>
      </View>
    );
  }

  const handleDayPress = (day) => {
    let newDates = { ...markedDates };
    const date = day.dateString;

    if (newDates[date] && newDates[date].selectedType === selectedType) {
      delete newDates[date];
    } else {
      newDates[date] = { 
        selected: true, 
        selectedColor: selectedType === 'holiday' ? colors.holiday : selectedType === 'overtime' ? colors.overtime : colors.primary,
        selectedType: selectedType
      };
    }

    setMarkedDates(newDates);
  };

  const calculateSalary = () => {
    const currentMonth = new Date(selectedDay.dateString).getMonth();
    const currentYear = new Date(selectedDay.dateString).getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const workDaysInMonth = Object.keys(markedDates).filter(date => markedDates[date].selectedType === 'work').length;
    const holidayDays = Object.keys(markedDates).filter(date => markedDates[date].selectedType === 'holiday').length;
    const overtimeDays = Object.keys(markedDates).filter(date => markedDates[date].selectedType === 'overtime').length;

    const effectiveWorkDays = daysInMonth - holidayDays;
    const dailyRate = employee.salary / effectiveWorkDays;
    const overtimeRate = dailyRate * 1.5;
    const totalSalary = (workDaysInMonth * dailyRate) + (overtimeDays * overtimeRate);

    setTotalSalary(totalSalary);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.detail}>İsim: {employee.name}</Text>
      <Text style={styles.detail}>Ünvan: {employee.title}</Text>
      <Text style={styles.detail}>Maaş: {employee.salary} TL</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setSelectedType('work')}>
          <Text style={selectedType === 'work' ? styles.selectedButton : styles.button}>Normal Gün</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedType('holiday')}>
          <Text style={selectedType === 'holiday' ? styles.selectedButtonHoliday : styles.buttonHoliday}>Tatil Günü</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedType('overtime')}>
          <Text style={selectedType === 'overtime' ? styles.selectedButtonOvertime : styles.buttonOvertime}>Mesai Günü</Text>
        </TouchableOpacity>
      </View>
      <Button title="Maaşı Hesapla" onPress={calculateSalary} color={colors.primary} />
      <Text style={styles.detail}>Toplam Maaş: {totalSalary.toFixed(2)} TL</Text>
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
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.text,
  },
  error: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.error,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    fontSize: 16,
    color: colors.primary,
  },
  selectedButton: {
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonHoliday: {
    fontSize: 16,
    color: colors.holiday,
  },
  selectedButtonHoliday: {
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.holiday,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonOvertime: {
    fontSize: 16,
    color: colors.overtime,
  },
  selectedButtonOvertime: {
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.overtime,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default EmployeeDetailScreen;
