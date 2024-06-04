import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../constants/colors';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const CustomCalendar = ({ onDayPress }) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    onDayPress(day);
  };

  return (
    <Calendar
      onDayPress={handleDayPress}
      current={selectedDate}
      markedDates={{
        [selectedDate]: { selected: true, marked: true, selectedColor: colors.primary },
      }}
    />
  );
};

export default CustomCalendar;
