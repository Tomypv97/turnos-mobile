import AsyncStorage from '@react-native-async-storage/async-storage';
import { Horario, Turno } from '../types/turno';

const CLAVE = 'turnos';
const HORAS = ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'];

function formatearFecha(d: Date): string {
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// Genera horarios de ejemplo para los próximos 5 días
function generarHorarios(): Horario[] {
  const horarios: Horario[] = [];
  for (let i = 1; i <= 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const fecha = formatearFecha(d);
    for (const hora of HORAS) {
      horarios.push({ id: `${fecha}_${hora}`, fecha, hora });
    }
  }
  return horarios;
}

export async function getMisTurnos(): Promise<Turno[]> {
  const guardado = await AsyncStorage.getItem(CLAVE);
  return guardado ? JSON.parse(guardado) : [];
}

export async function getHorariosDisponibles(): Promise<Horario[]> {
  const ocupados = (await getMisTurnos()).map((t) => t.id);
  return generarHorarios().filter((h) => !ocupados.includes(h.id));
}

export async function reservarTurno(horario: Horario): Promise<Turno> {
  const turnos = await getMisTurnos();
  const nuevo: Turno = { ...horario, creadoEn: new Date().toISOString() };
  await AsyncStorage.setItem(CLAVE, JSON.stringify([...turnos, nuevo]));
  return nuevo;
}

export async function cancelarTurno(id: string): Promise<void> {
  const turnos = await getMisTurnos();
  await AsyncStorage.setItem(CLAVE, JSON.stringify(turnos.filter((t) => t.id !== id)));
}

export function getHorarioPorId(id: string): Horario | undefined {
  return generarHorarios().find((h) => h.id === id);
}