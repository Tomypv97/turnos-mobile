export type Horario = {
  id: string;
  fecha: string; // formato YYYY-MM-DD
  hora: string;  // formato HH:MM
};

export type Turno = {
  id: string;
  fecha: string;
  hora: string;
  creadoEn: string;
};