import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { cancelarTurno, getMisTurnos } from '../services/turnos';
import { Turno } from '../types/turno';

export default function MisTurnos() {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useFocusEffect(
    useCallback(() => {
      getMisTurnos().then(setTurnos);
    }, [])
  );

  function pedirCancelacion(turno: Turno) {
    Alert.alert('Cancelar turno', `¿Cancelar el turno del ${turno.fecha} a las ${turno.hora}?`, [
      { text: 'No', style: 'cancel' },
      {
        text: 'Sí, cancelar',
        style: 'destructive',
        onPress: async () => {
          await cancelarTurno(turno.id);
          setTurnos(await getMisTurnos());
        },
      },
    ]);
  }

  return (
    <FlatList
      data={turnos}
      keyExtractor={(t) => t.id}
      contentContainerStyle={styles.lista}
      ListEmptyComponent={<Text style={styles.vacio}>Todavía no tenés turnos reservados</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View>
            <Text style={styles.fecha}>{item.fecha}</Text>
            <Text style={styles.hora}>{item.hora}</Text>
          </View>
          <Pressable onPress={() => pedirCancelacion(item)}>
            <Text style={styles.cancelar}>Cancelar</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: 16, gap: 10 },
  vacio: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#64748b' },
  item: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fecha: { fontSize: 16 },
  hora: { fontSize: 16, fontWeight: '600' },
  cancelar: { color: '#dc2626', fontSize: 16, fontWeight: '600' },
});