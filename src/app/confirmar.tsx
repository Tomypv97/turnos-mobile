import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getHorarioPorId, reservarTurno } from '../services/turnos';

export default function Confirmar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const horario = getHorarioPorId(id);

  if (!horario) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>No se encontró el horario</Text>
      </View>
    );
  }

  async function confirmar() {
    await reservarTurno(horario!);
    Alert.alert('Listo', 'Tu turno quedó reservado');
    router.replace('/mis-turnos');
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>¿Confirmás este turno?</Text>
      <Text style={styles.dato}>Fecha: {horario.fecha}</Text>
      <Text style={styles.dato}>Hora: {horario.hora}</Text>

      <Pressable style={styles.boton} onPress={confirmar}>
        <Text style={styles.botonTexto}>Confirmar reserva</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.volver}>Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 24, gap: 12 },
  titulo: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  dato: { fontSize: 18 },
  boton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  volver: { color: '#2563eb', textAlign: 'center', fontSize: 16, marginTop: 8 },
});