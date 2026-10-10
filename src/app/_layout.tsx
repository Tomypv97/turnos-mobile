import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Horarios disponibles' }} />
      <Stack.Screen name="confirmar" options={{ title: 'Confirmar reserva' }} />
      <Stack.Screen name="mis-turnos" options={{ title: 'Mis turnos' }} />
    </Stack>
  );
}