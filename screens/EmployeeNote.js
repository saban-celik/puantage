import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';

const EmployeeNote = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  const handleNewNote = () => {
    navigation.navigate('Note', { note: null, setNotes });
  };

  const handleNotePress = (note) => {
    navigation.navigate('Note', { note, setNotes });
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const getPreviewText = (text) => {
    const words = text.split(' ');
    return words.slice(0, 2).join(' ') + (words.length > 2 ? '...' : '');
  };

  const renderNote = ({ item }) => (
    <View style={styles.noteItemContainer}>
      <TouchableOpacity onPress={() => handleNotePress(item)} style={styles.noteItem}>
        <Text style={styles.noteText}>{getPreviewText(item.text)}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNote(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleNewNote}>
        <Ionicons name="add" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  noteItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  noteItem: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.rowBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderRadius: 5,
  },
  noteText: {
    color: colors.text,
    fontSize: 16,
  },
  timestamp: {
    color: colors.white,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  deleteButton: {
    padding: 10,
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
    elevation: 5,
  },
});

export default EmployeeNote;
