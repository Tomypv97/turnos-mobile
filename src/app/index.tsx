import { useCallback, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getHorariosDisponibles } from '../services/turnos';
import { Horario } from '../types/turno';

type Seccion = { fecha: string; data: Horario[] };

function agruparPorFecha(horarios: Horario[]): Seccion[] {
  const grupos: Record<string, Horario[]> = {};
  for (const h of horarios) {
    (grupos[h.fecha] ??= []).push(h);
  }
  return Object.entries(grupos).map(([fecha, data]) => ({ fecha, data }));
}

export default function Horarios() {
  const router = useRouter();
  const [secciones, setSecciones] = useState<Seccion[]>([]);

  useFocusEffect(
    useCallback(() => {
      getHorariosDisponibles().then((h) => setSecciones(agruparPorFecha(h)));
    }, [])
  );

  return (
    <SectionList
      sections={secciones}
      keyExtractor={(h) => h.id}
      contentContainerStyle={styles.lista}
      ListHeaderComponent={
        <Pressable onPress={() => router.push('/mis-turnos')}>
          <Text style={styles.link}>Ver mis turnos →</Text>
        </Pressable>
      }
      renderSectionHeader={({ section }) => (
        <Text style={styles.seccion}>{section.fecha}</Text>
      )}
      renderItem={({ item }) => (
        <Pressable
          style={styles.item}
          onPress={() => router.push({ pathname: '/confirmar', params: { id: item.id } })}
        >
          <Text style={styles.hora}>{item.hora}</Text>
        </Pressable>
      )}
      ListEmptyComponent={<Text style={styles.vacio}>No hay horarios disponibles</Text>}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: 16 },
  link: { color: '#2563eb', fontSize: 16, marginBottom: 12 },
  seccion: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginTop: 16,
    marginBottom: 8,
  },
  item: {
    backgroundColor: '#f1f5f9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  hora: { fontSize: 16, fontWeight: '600' },
  vacio: { textAlign: 'center', marginTop: 40, color: '#64748b' },
});