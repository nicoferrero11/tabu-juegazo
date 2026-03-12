# 🃏 Tabú Argentum

> El juego de las palabras prohibidas — edición argentina

**[🎮 Jugar ahora](https://nicoferrero11.github.io/tabu-juegazo)**

---

## ¿Qué es Tabú Argentum?

Tabú Argentum es una versión digital del clásico juego de mesa Tabú, pensada para jugar en grupo con amigos o familia. El objetivo es que un jugador haga adivinar una palabra a su equipo **sin pronunciar las palabras prohibidas** (tabú) asociadas a ella.

Está construido como una **PWA (Progressive Web App)**: funciona desde el navegador, se puede instalar en el celular como una app nativa y también funciona **sin conexión a internet**.

Las más de **1.300 cartas** están orientadas al contexto rioplatense: cultura argentina, gastronomía local, personajes, geografía, deportes, historia y mucho más.

---

## 🎯 Reglas del juego

1. Se forman **dos equipos** y se define quién empieza.
2. Al comenzar un turno, aparece una cuenta regresiva de 3 segundos con el nombre del jugador que da las pistas.
3. El jugador describe la **palabra principal** a su equipo sin decir ninguna de las 4 **palabras tabú** que aparecen debajo.
4. El equipo tiene que adivinar la palabra antes de que se acabe el tiempo.
5. Al final de cada turno se revisan las palabras jugadas y se confirman los puntos.

### Puntaje
| Acción | Puntos |
|--------|--------|
| ✓ Correcto | +1 |
| ⏭ Pasar | 0 |
| 🚫 Tabú (dijo una palabra prohibida) | -1 |

### La Bomba 💣
En algún momento aleatorio del turno aparece una **bomba**. Si el jugador la activa, el equipo pierde 1 punto y el turno termina inmediatamente. Si logra dar la palabra correcta antes de activarla, la bomba desaparece.

---

## ⚙️ Configuración

Todas las opciones se acceden desde el ícono ⚙️ en la pantalla principal.

| Opción | Valores disponibles |
|--------|---------------------|
| ⏱ Tiempo por turno | 30s / 45s / 60s / 90s / 120s |
| 🔄 Cantidad de rondas | 2 / 3 / 4 / 5 |
| 🎨 Tema visual | 8 opciones (ver abajo) |

### 🎨 Temas visuales
| # | Nombre | Descripción |
|---|--------|-------------|
| 🌸 | Rosa crema | El clásico, fondo cálido rosado |
| 🔮 | Noche violeta | Oscuro con acentos violetas |
| 🌿 | Verde esmeralda | Fondo oscuro con tonos verdes |
| 🌊 | Azul océano | Fondo oscuro azul profundo |
| 🌅 | Sunset naranja | Tonos naranjas y rojos cálidos |
| 🇦🇷 | Celeste Argentina | Fondo claro con azules argentinos |
| 🌌 | Aurora boreal | Gradiente oscuro con cyan y violeta |
| 🏜️ | Tierra cálida | Tonos arena y marrón |

---

## 👥 Jugadores

Cada equipo puede tener entre **1 y 5 jugadores**. Se editan desde la pantalla principal tocando el botón **👥 X jugadores** en cada score card.

- El juego **rota automáticamente** quién da las pistas cada turno.
- La pantalla de cuenta regresiva muestra el nombre del jugador que le toca.
- Ambos equipos deben tener la **misma cantidad de jugadores** para empezar (validación automática).

---

## 📱 Instalación como app (PWA)

### iPhone / iPad
1. Abrir el link en **Safari**
2. Tocar el ícono de compartir (⎙)
3. Seleccionar **"Agregar a pantalla de inicio"**

### Android
1. Abrir el link en **Chrome**
2. Tocar los tres puntos (⋮)
3. Seleccionar **"Instalar app"** o **"Agregar a pantalla de inicio"**

Una vez instalada, la app funciona **sin internet** gracias al service worker.

---

## 🃏 Cartas

El juego incluye más de **1.300 cartas únicas** distribuidas en categorías:

- 🇦🇷 Cultura y jerga argentina
- 🍖 Gastronomía local y mundial
- ⚽ Deportes (fútbol, tenis, atletismo, deportes olímpicos...)
- 🌍 Geografía argentina y mundial
- 🎬 Cine, música y entretenimiento
- 🔬 Ciencia y tecnología
- 📚 Historia y cultura general
- 🌿 Naturaleza y biología
- 🏛️ Política y sociedad

---

## 🛠️ Stack técnico

- **HTML / CSS / JS vanilla** — sin frameworks ni dependencias
- **PWA** con service worker para uso offline
- **Web Audio API** — música cumbia villera generada proceduralmente + efectos de sonido
- Compatible con **iOS Safari** y **Android Chrome**

---

## 📁 Archivos

```
/
├── index.html          # El juego completo (autocontenido)
├── manifest.json       # Configuración PWA
├── sw.js               # Service worker (cache offline)
├── icon-192.png        # Ícono para Android
├── icon-512.png        # Ícono splash screen
└── apple-touch-icon.png # Ícono para iPhone
```

---

## 📝 Versionado

La versión se muestra en la esquina inferior izquierda del juego y se sincroniza con el cache del service worker para garantizar actualizaciones automáticas.

---

*Hecho con ❤️ por **Nicof** — Montevideo, Uruguay*
