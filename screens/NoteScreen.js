import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { db } from '../firebaseConfig';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

const NoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { note, setNotes } = route.params;

  const [text, setText] = useState(note ? note.text : '');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: note ? 'Notu Düzenle' : 'Yeni Not Ekle',
    });
  }, [navigation, note]);

  const handleSave = async () => {
    const timestamp = format(new Date(), 'dd MMM yyyy, HH:mm', { locale: tr });
    try {
      if (note) {
        // Notu güncelle
        await updateDoc(doc(db, "notes", note.id), {
          text,
          timestamp
        });
        setNotes(prevNotes =>
          prevNotes.map(n =>
            n.id === note.id ? { ...n, text, timestamp } : n
          )
        );
      } else {
        // Yeni not ekle
        const newNote = {
          id: Date.now().toString(),
          text,
          timestamp,
        };
        await setDoc(doc(db, "notes", newNote.id), newNote);
        setNotes(prevNotes => [...prevNotes, newNote]);
      }
      Alert.alert('Başarılı', 'Not kaydedildi.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Hata', 'Not kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        onChangeText={setText}
        value={text}
        placeholder="Not ekle..."
        placeholderTextColor={colors.text}
      />
      <Button title="Kaydet" onPress={handleSave} color={colors.primary} />
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
    height: 200,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    color: colors.text,
    marginBottom: 10,
  },
});

export default NoteScreen;
