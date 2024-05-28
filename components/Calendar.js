import React from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../constants/colors';

const CustomCalendar = ({ onDayPress }) => {
  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={{
        '2024-05-22': { selected: true, marked: true, selectedColor: colors.primary },
      }}
    />
  );
};

export default CustomCalendar;
