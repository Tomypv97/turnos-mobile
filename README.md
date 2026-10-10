# Turnos Mobile

App móvil de reserva de turnos hecha con React Native y Expo.
Versión móvil del sistema de turnos online [link a tu web si está online].

> Los datos son locales (lista de horarios de ejemplo y reservas guardadas con
> AsyncStorage). No está conectada al backend.

## Funcionalidades
- Ver horarios disponibles agrupados por día
- Confirmar una reserva
- Ver y cancelar mis turnos
- Persistencia local de las reservas

## Tecnologías
React Native · Expo · Expo Router · TypeScript · AsyncStorage

## Estructura
- `src/app/`: pantallas y navegación (Expo Router)
- `src/services/turnos.ts`: acceso a datos. Está aislado para poder reemplazarlo
  por llamadas a la API real sin tocar las pantallas
- `src/types/`: tipos de TypeScript

## Cómo correrla
    npm install
    npx expo start

Escaneá el QR con la app Expo Go.

## Capturas
![Horarios](screenshots/horarios.png)
![Confirmar](screenshots/confirmar.png)
![Mis turnos](screenshots/mis-turnos.png)

## Próximos pasos
Conectar `services/turnos.ts` con la API del sistema de turnos (NestJS + Supabase).