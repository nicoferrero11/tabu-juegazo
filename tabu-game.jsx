import { useState, useEffect, useRef, useCallback } from "react";

const TEAM_NAMES = ["Equipo Rojo", "Equipo Azul"];
const TURN_DURATION = 60;

const CARDS = [
  // --- TARJETAS ORIGINALES (150) ---
  { palabra: "ELEFANTE", tabu: ["TROMPA", "GRANDE", "AFRICA", "ANIMAL"] },
  { palabra: "PIZZA", tabu: ["ITALIA", "QUESO", "MASA", "HORNO"] },
  { palabra: "GUITARRA", tabu: ["MUSICA", "CUERDAS", "INSTRUMENTO", "TOCAR"] },
  { palabra: "AVION", tabu: ["VOLAR", "CIELO", "VIAJE", "ALAS"] },
  { palabra: "MEDICO", tabu: ["HOSPITAL", "ENFERMO", "SALUD", "DOCTOR"] },
  { palabra: "PLAYA", tabu: ["MAR", "ARENA", "SOL", "VERANO"] },
  { palabra: "BIBLIOTECA", tabu: ["LIBROS", "LEER", "SILENCIO", "ESTANTES"] },
  { palabra: "FUTBOL", tabu: ["PELOTA", "GOL", "CANCHA", "DEPORTE"] },
  { palabra: "MARIPOSA", tabu: ["ALAS", "VOLAR", "INSECTO", "FLOR"] },
  { palabra: "HELADERA", tabu: ["FRIO", "COMIDA", "COCINA", "CONGELAR"] },
  { palabra: "JIRAFA", tabu: ["CUELLO", "ALTO", "AFRICA", "ANIMAL"] },
  { palabra: "TREN", tabu: ["VIAS", "LOCOMOTORA", "VIAJE", "ESTACION"] },
  { palabra: "CASTILLO", tabu: ["REY", "MEDIEVAL", "TORRE", "PIEDRA"] },
  { palabra: "VOLCAN", tabu: ["LAVA", "ERUPCION", "FUEGO", "MONTANA"] },
  { palabra: "DELFIN", tabu: ["MAR", "INTELIGENTE", "NADAR", "MAMIFERO"] },
  { palabra: "COMPUTADORA", tabu: ["PANTALLA", "TECLADO", "INTERNET", "MOUSE"] },
  { palabra: "COCINERO", tabu: ["COCINA", "COMIDA", "CHEF", "RESTAURANTE"] },
  { palabra: "PIRAMIDE", tabu: ["EGIPTO", "FARAON", "ARENA", "TRIANGULO"] },
  { palabra: "PERIODICO", tabu: ["NOTICIAS", "LEER", "PAPEL", "DIARIO"] },
  { palabra: "SUBMARINO", tabu: ["MAR", "PROFUNDO", "NAVE", "AGUA"] },
  { palabra: "CIRCO", tabu: ["PAYASO", "ACROBATA", "CARPA", "ANIMALES"] },
  { palabra: "ESPEJO", tabu: ["REFLEJO", "VIDRIO", "VERSE", "IMAGEN"] },
  { palabra: "TIBURON", tabu: ["DIENTES", "MAR", "PELIGROSO", "ALETA"] },
  { palabra: "PANADERIA", tabu: ["PAN", "HORNO", "HARINA", "DULCE"] },
  { palabra: "ASTRONAUTA", tabu: ["ESPACIO", "LUNA", "NAVE", "COHETE"] },
  { palabra: "PARAGUAS", tabu: ["LLUVIA", "MOJARSE", "ABRIR", "AGUA"] },
  { palabra: "CANGREJO", tabu: ["PINZAS", "MAR", "CAMINAR", "ROJO"] },
  { palabra: "ZAPATO", tabu: ["PIE", "CAMINAR", "CUERO", "SUELA"] },
  { palabra: "TORNADO", tabu: ["VIENTO", "DESTRUIR", "GIRAR", "TORMENTA"] },
  { palabra: "MURCIELAGO", tabu: ["NOCHE", "VOLAR", "CUEVA", "VAMPIRO"] },
  { palabra: "SEMAFORO", tabu: ["ROJO", "VERDE", "TRAFICO", "CALLE"] },
  { palabra: "HELADO", tabu: ["FRIO", "DULCE", "VERANO", "SABORES"] },
  { palabra: "CACTUS", tabu: ["ESPINAS", "DESIERTO", "PLANTA", "SECO"] },
  { palabra: "BOMBERO", tabu: ["FUEGO", "MANGUERA", "CAMION", "RESCATE"] },
  { palabra: "PINGUINO", tabu: ["FRIO", "ANTARTICA", "NEGRO", "NADAR"] },
  { palabra: "DENTISTA", tabu: ["DIENTES", "DOLOR", "MUELA", "CONSULTORIO"] },
  { palabra: "TELESCOPIO", tabu: ["ESTRELLAS", "VER", "ESPACIO", "LENTE"] },
  { palabra: "CAIMAN", tabu: ["REPTIL", "DIENTES", "RIO", "VERDE"] },
  { palabra: "MOCHILA", tabu: ["ESCUELA", "CARGAR", "ESPALDA", "VIAJE"] },
  { palabra: "GLOBO", tabu: ["AIRE", "FLOTAR", "COLORIDO", "FIESTA"] },
  { palabra: "ARAÑA", tabu: ["TELA", "VENENO", "INSECTO", "PATAS"] },
  { palabra: "FARMACIA", tabu: ["MEDICAMENTO", "ENFERMO", "PASTILLA", "RECETA"] },
  { palabra: "LORO", tabu: ["HABLAR", "PLUMAS", "COLORIDO", "JAULA"] },
  { palabra: "ESCALERA", tabu: ["SUBIR", "BAJAR", "PELDANO", "ALTURA"] },
  { palabra: "NAUFRAGIO", tabu: ["BARCO", "AGUA", "HUNDIRSE", "MAR"] },
  { palabra: "CAMELLO", tabu: ["JOROBA", "DESIERTO", "ARENA", "ANIMAL"] },
  { palabra: "BUFANDA", tabu: ["FRIO", "CUELLO", "LANA", "INVIERNO"] },
  { palabra: "TERREMOTO", tabu: ["SUELO", "TEMBLAR", "DERRUMBE", "SEISMO"] },
  { palabra: "MONEDA", tabu: ["DINERO", "METAL", "CARA", "COMPRAR"] },
  { palabra: "TIGRE", tabu: ["RAYAS", "SELVA", "FELINO", "PELIGROSO"] },
  { palabra: "BRUJULA", tabu: ["NORTE", "NAVEGAR", "ORIENTAR", "AGUJA"] },
  { palabra: "SUSHI", tabu: ["JAPON", "ARROZ", "PESCADO", "ALGA"] },
  { palabra: "CANCHA", tabu: ["DEPORTE", "JUGAR", "PASTO", "FUTBOL"] },
  { palabra: "PULPO", tabu: ["TENTACULOS", "MAR", "TINTA", "OCHO"] },
  { palabra: "ALFOMBRA", tabu: ["PISO", "SUELO", "LANA", "CUBRIR"] },
  { palabra: "COHETE", tabu: ["ESPACIO", "LANZAR", "FUEGO", "NASA"] },
  { palabra: "CARNICERIA", tabu: ["CARNE", "VACA", "CORTE", "KILO"] },
  { palabra: "FANTASMA", tabu: ["MIEDO", "BLANCO", "ESPIRITU", "HAUNTED"] },
  { palabra: "MICROSCOPIO", tabu: ["PEQUENO", "VER", "CIENCIA", "LABORATORIO"] },
  { palabra: "BALLENA", tabu: ["MAR", "GRANDE", "MAMIFERO", "AZUL"] },
  { palabra: "CANDELABRO", tabu: ["VELA", "LUZ", "METAL", "MESA"] },
  { palabra: "MARATON", tabu: ["CORRER", "KILOMETROS", "ATLETISMO", "RESISTENCIA"] },
  { palabra: "NIEVE", tabu: ["FRIO", "BLANCO", "INVIERNO", "MONTAÑA"] },
  { palabra: "MERCADO", tabu: ["COMPRAR", "VERDURA", "VENDER", "PUESTO"] },
  { palabra: "PULPERIA", tabu: ["ALMACEN", "CAMPO", "GAUCHO", "BEBIDA"] },
  { palabra: "TANGO", tabu: ["BAILE", "ARGENTINA", "PAREJA", "MUSICA"] },
  { palabra: "MATE", tabu: ["YERBA", "CALIENTE", "TOMAR", "BOMBILLA"] },
  { palabra: "ASADO", tabu: ["CARNE", "PARRILLA", "FUEGO", "BRASA"] },
  { palabra: "ESTANCIA", tabu: ["CAMPO", "GAUCHO", "VACA", "RURAL"] },
  { palabra: "PAYADOR", tabu: ["CANTAR", "GUITARRA", "GAUCHO", "IMPROVISAR"] },
  { palabra: "CANDOMBE", tabu: ["TAMBOR", "AFRICA", "CARNAVAL", "RITMO"] },
  { palabra: "TABLETA", tabu: ["PANTALLA", "TECNOLOGIA", "TOCAR", "DIGITAL"] },
  { palabra: "VELERO", tabu: ["VELA", "MAR", "VIENTO", "NAVEGAR"] },
  { palabra: "QUESO", tabu: ["LECHE", "VACA", "AMARILLO", "RALLADO"] },
  { palabra: "LABORATORIO", tabu: ["CIENCIA", "EXPERIMENTO", "QUIMICA", "TUBO"] },
  { palabra: "CARACOL", tabu: ["CONCHA", "LENTO", "CUERNOS", "TIERRA"] },
  { palabra: "LADRILLO", tabu: ["PARED", "CONSTRUCCION", "ROJO", "BARRO"] },
  { palabra: "DETECTIVE", tabu: ["INVESTIGAR", "CRIMEN", "PISTOLA", "CASO"] },
  { palabra: "CASCADA", tabu: ["AGUA", "CAER", "RIO", "NATURAL"] },
  { palabra: "MARIONETA", tabu: ["HILO", "TITERE", "TEATRO", "MUÑECA"] },
  { palabra: "FERRETERIA", tabu: ["TORNILLO", "HERRAMIENTA", "CLAVO", "HIERRO"] },
  { palabra: "CANGURO", tabu: ["AUSTRALIA", "BOLSA", "SALTAR", "MARSUPIAL"] },
  { palabra: "ACORDEON", tabu: ["MUSICA", "FUELLE", "TECLAS", "INSTRUMENTO"] },
  { palabra: "SUPERMERCADO", tabu: ["COMPRAR", "CARRITO", "CAJA", "COMIDA"] },
  { palabra: "HURACAN", tabu: ["VIENTO", "TORMENTA", "DESTRUIR", "LLUVIA"] },
  { palabra: "CERRADURA", tabu: ["LLAVE", "PUERTA", "ABRIR", "SEGURIDAD"] },
  { palabra: "DINOSAURIO", tabu: ["EXTINCION", "FOSIL", "GRANDE", "PREHISTORICO"] },
  { palabra: "CARRUSEL", tabu: ["GIRAR", "CABALLO", "PARQUE", "NIÑOS"] },
  { palabra: "GUANTE", tabu: ["MANO", "FRIO", "BEISBOL", "DEDOS"] },
  { palabra: "CEBRA", tabu: ["RAYAS", "AFRICA", "CABALLO", "BLANCO"] },
  { palabra: "ACUARIO", tabu: ["PEZ", "AGUA", "VIDRIO", "ALGAS"] },
  { palabra: "NIDO", tabu: ["PAJARO", "HUEVO", "ARBOL", "CONSTRUIR"] },
  { palabra: "VOLEIBOL", tabu: ["RED", "PELOTA", "PLAYA", "SALTAR"] },
  { palabra: "MAQUILLAJE", tabu: ["CARA", "PINTURA", "MUJER", "BELLEZA"] },
  { palabra: "ESTATUA", tabu: ["PIEDRA", "ESCULTURA", "PLAZA", "FIGURA"] },
  { palabra: "GRUA", tabu: ["CONSTRUCCION", "LEVANTAR", "CABLE", "OBRA"] },
  { palabra: "LIMON", tabu: ["AGRIO", "AMARILLO", "JUGO", "FRUTA"] },
  { palabra: "LUPA", tabu: ["VER", "AUMENTAR", "DETECTIVE", "REDONDA"] },
  { palabra: "ABANICO", tabu: ["AIRE", "CALOR", "JAPON", "ABRIR"] },
  { palabra: "LINTERNA", tabu: ["LUZ", "OSCURIDAD", "PILA", "ILUMINAR"] },
  { palabra: "CARNAVAL", tabu: ["FIESTA", "DISFRAZ", "MUSICA", "BAILE"] },
  { palabra: "LAGARTIJA", tabu: ["REPTIL", "COLA", "PARED", "PEQUENA"] },
  { palabra: "FARO", tabu: ["MAR", "LUZ", "BARCO", "COSTA"] },
  { palabra: "CUERNO", tabu: ["ANIMAL", "VACA", "TORO", "SONIDO"] },
  { palabra: "REMO", tabu: ["BOTE", "AGUA", "REMAR", "MADERA"] },
  { palabra: "TRIDENTE", tabu: ["POSEIDON", "TRES", "PUNTAS", "DIOS"] },
  { palabra: "RESORTE", tabu: ["SALTAR", "METAL", "ESPIRAL", "ELASTICO"] },
  { palabra: "CALABAZA", tabu: ["HALLOWEEN", "NARANJA", "TALLADO", "SEMILLAS"] },
  { palabra: "PERGAMINO", tabu: ["PAPEL", "ANTIGUO", "ESCRIBIR", "ROLLO"] },
  { palabra: "CATARATA", tabu: ["AGUA", "CAER", "RIO", "IGUAZU"] },
  { palabra: "ABISMO", tabu: ["PROFUNDO", "VACIO", "OSCURO", "CAER"] },
  { palabra: "BRINDIS", tabu: ["COPA", "CHAMPAGNE", "CELEBRAR", "BEBER"] },
  { palabra: "NEVERA", tabu: ["FRIO", "COMIDA", "HIELO", "COCINA"] },
  { palabra: "BALCON", tabu: ["EDIFICIO", "AFUERA", "FLORES", "ALTURA"] },

  // --- 300 TARJETAS NUEVAS ---
  // Animales
  { palabra: "GORILA", tabu: ["MONO", "SELVA", "GRANDE", "AFRICA"] },
  { palabra: "FLAMENCO", tabu: ["ROSA", "PATA", "AFRICA", "PAJARO"] },
  { palabra: "HIPOPOTAMO", tabu: ["GRANDE", "AFRICA", "RIO", "BOCA"] },
  { palabra: "RINOCERONTE", tabu: ["CUERNO", "AFRICA", "GRANDE", "GRIS"] },
  { palabra: "COCODRILO", tabu: ["DIENTES", "RIO", "REPTIL", "VERDE"] },
  { palabra: "LEON", tabu: ["MELENA", "AFRICA", "RUGIR", "REY"] },
  { palabra: "LEOPARDO", tabu: ["MANCHAS", "AFRICA", "FELINO", "RAPIDO"] },
  { palabra: "AVESTRUZ", tabu: ["GRANDE", "CORRER", "PLUMAS", "AFRICA"] },
  { palabra: "TORTUGA", tabu: ["CAPARAZON", "LENTA", "REPTIL", "MAR"] },
  { palabra: "AGUILA", tabu: ["VOLAR", "GARRA", "PICO", "RAPAZ"] },
  { palabra: "LOBO", tabu: ["AULLAR", "MANADA", "BOSQUE", "PERRO"] },
  { palabra: "RANA", tabu: ["SALTAR", "VERDE", "AGUA", "SAPO"] },
  { palabra: "SERPIENTE", tabu: ["VENENO", "REPTIL", "ESCAMAS", "MORDER"] },
  { palabra: "COLIBRI", tabu: ["PEQUENO", "FLORES", "VOLAR", "RAPIDO"] },
  { palabra: "ESCARABAJO", tabu: ["INSECTO", "CAPARAZON", "EGIPTO", "DURO"] },
  { palabra: "PAVO REAL", tabu: ["PLUMAS", "COLORIDO", "COLA", "PAJARO"] },
  { palabra: "BUHO", tabu: ["NOCHE", "OJOS", "SABIO", "BOSQUE"] },
  { palabra: "FOCA", tabu: ["MAR", "FRIO", "PELOTA", "NADAR"] },
  { palabra: "PANDA", tabu: ["CHINA", "BAMBU", "BLANCO", "NEGRO"] },
  { palabra: "MAPACHE", tabu: ["OJERAS", "BASURA", "NOCTURNO", "NORTEAMERICA"] },
  { palabra: "CASTOR", tabu: ["DIENTES", "REPRESA", "RIO", "MADERA"] },
  { palabra: "HIENA", tabu: ["REIR", "AFRICA", "CARROÑA", "MANADA"] },
  { palabra: "CIERVO", tabu: ["CUERNOS", "BOSQUE", "CORRER", "VENADO"] },
  { palabra: "NUTRIA", tabu: ["RIO", "NADAR", "PELO", "MANOS"] },
  { palabra: "LECHUZA", tabu: ["NOCHE", "PAJARO", "SILENCIO", "BOSQUE"] },
  { palabra: "MEDUSA", tabu: ["MAR", "TRANSPARENTE", "PICAR", "TENTACULOS"] },
  { palabra: "CABALLO", tabu: ["MONTAR", "CORRER", "CRIN", "CAMPO"] },
  { palabra: "BURRO", tabu: ["OREJAS", "ANIMAL", "TONTO", "CARGA"] },
  { palabra: "OVEJA", tabu: ["LANA", "BLANCA", "BALIDO", "CAMPO"] },
  { palabra: "CHANCHO", tabu: ["SUCIO", "GRANJA", "GRUÑIR", "GRASA"] },
  { palabra: "GALLINA", tabu: ["HUEVO", "GRANJA", "CLOQUEAR", "COBARDE"] },
  { palabra: "PATO", tabu: ["CUAK", "AGUA", "PICO", "PLUMAS"] },
  { palabra: "CONEJO", tabu: ["OREJAS", "ZANAHORIA", "SALTAR", "PELO"] },
  { palabra: "HAMSTER", tabu: ["RUEDA", "BOLSILLOS", "PEQUENO", "MASCOTA"] },
  { palabra: "CANARIO", tabu: ["CANTAR", "AMARILLO", "JAULA", "PAJARO"] },
  { palabra: "GOLONDRINA", tabu: ["VOLAR", "PRIMAVERA", "NIDO", "PAJARO"] },
  { palabra: "PIRANÃ", tabu: ["DIENTES", "RIO", "AMAZON", "PELIGROSO"] },
  { palabra: "LANGOSTA", tabu: ["MAR", "PINZAS", "ROJO", "MARISCO"] },
  { palabra: "ALMEJA", tabu: ["MAR", "CONCHA", "BIVALVO", "PLAYA"] },
  { palabra: "ESTRELLA DE MAR", tabu: ["CINCO", "PUNTAS", "MAR", "PLAYA"] },
  { palabra: "PALOMA", tabu: ["VOLAR", "BLANCA", "PAZ", "CIUDAD"] },
  { palabra: "HORMIGA", tabu: ["PEQUENA", "COLONIA", "TRABAJO", "INSECTO"] },
  { palabra: "CIERVO", tabu: ["CUERNOS", "BOSQUE", "CORRER", "VENADO"] },
  { palabra: "JAGUAR", tabu: ["MANCHAS", "SELVA", "FELINO", "AMERICA"] },
  { palabra: "COLIFLOR", tabu: ["VERDURA", "BLANCA", "ARBOL", "COCINAR"] },

  // Comida y bebida
  { palabra: "EMPANADA", tabu: ["MASA", "RELLENA", "HORNO", "ARGENTINA"] },
  { palabra: "MILANESA", tabu: ["CARNE", "APANADA", "FRITA", "ARGENTINA"] },
  { palabra: "ALFAJOR", tabu: ["DULCE", "CHOCOLATE", "GALLETA", "ARGENTINA"] },
  { palabra: "MEDIALUНА", tabu: ["PANADERIA", "DULCE", "CAFE", "DESAYUNO"] },
  { palabra: "CHURRASCO", tabu: ["CARNE", "PARRILLA", "BRASA", "ASADO"] },
  { palabra: "MORCILLA", tabu: ["SANGRE", "ASADO", "INTESTINO", "NEGRA"] },
  { palabra: "CHORIZO", tabu: ["EMBUTIDO", "ASADO", "CARNE", "PARRILLA"] },
  { palabra: "LOCRO", tabu: ["GUISO", "INVIERNO", "MAIZ", "ARGENTINA"] },
  { palabra: "DULCE DE LECHE", tabu: ["LECHE", "DULCE", "UNTAR", "ARGENTINA"] },
  { palabra: "FLAN", tabu: ["POSTRE", "DULCE", "HUEVO", "CARAMELO"] },
  { palabra: "TORTA", tabu: ["DULCE", "CUMPLEAÑOS", "CREMA", "HORNO"] },
  { palabra: "MERMELADA", tabu: ["DULCE", "FRUTA", "UNTAR", "FRASCO"] },
  { palabra: "MANTECA", tabu: ["GRASA", "LECHE", "UNTAR", "AMARILLA"] },
  { palabra: "MAYONESA", tabu: ["SALSA", "HUEVO", "BLANCA", "UNTAR"] },
  { palabra: "KETCHUP", tabu: ["TOMATE", "SALSA", "ROJO", "CONDIMENTO"] },
  { palabra: "MOSTAZA", tabu: ["AMARILLA", "SALSA", "CONDIMENTO", "PICANTE"] },
  { palabra: "VINAGRE", tabu: ["ACIDO", "ENSALADA", "BOTELLA", "AGRIO"] },
  { palabra: "ACEITE", tabu: ["OLIVA", "FREIR", "GRASA", "LIQUIDO"] },
  { palabra: "HARINA", tabu: ["PAN", "BLANCA", "MASA", "MOLER"] },
  { palabra: "AZUCAR", tabu: ["DULCE", "BLANCA", "CAFE", "CALORIAS"] },
  { palabra: "SAL", tabu: ["CONDIMENTO", "BLANCA", "SABOR", "MAR"] },
  { palabra: "PIMIENTA", tabu: ["PICANTE", "NEGRA", "CONDIMENTO", "MOLINO"] },
  { palabra: "AJO", tabu: ["OLOR", "BLANCO", "CONDIMENTO", "VAMPIRO"] },
  { palabra: "CEBOLLA", tabu: ["LLORAR", "REDONDA", "CONDIMENTO", "CAPAS"] },
  { palabra: "ZANAHORIA", tabu: ["NARANJA", "CONEJO", "VERDURA", "LARGA"] },
  { palabra: "LECHUGA", tabu: ["VERDE", "ENSALADA", "HOJA", "FRESCA"] },
  { palabra: "TOMATE", tabu: ["ROJO", "ENSALADA", "REDONDO", "SALSA"] },
  { palabra: "PEPINO", tabu: ["VERDE", "LARGO", "FRESCO", "ENSALADA"] },
  { palabra: "ZAPALLO", tabu: ["NARANJA", "GUISO", "REDONDO", "SEMILLAS"] },
  { palabra: "BERENJENA", tabu: ["MORADA", "VERDURA", "LARGA", "GRILLA"] },
  { palabra: "PIMIENTO", tabu: ["ROJO", "VERDE", "AMARILLO", "RELLENO"] },
  { palabra: "PAPA", tabu: ["FRITA", "PURE", "TUBER", "PLANTA"] },
  { palabra: "BATATA", tabu: ["DULCE", "NARANJA", "TUBER", "POSTRE"] },
  { palabra: "ARVEJA", tabu: ["VERDE", "REDONDA", "LEGUMBRE", "LATA"] },
  { palabra: "LENTEJA", tabu: ["SOPA", "LEGUMBRE", "MARRON", "HIERRO"] },
  { palabra: "GARBANZO", tabu: ["REDONDO", "LEGUMBRE", "HUMMUS", "GUISO"] },
  { palabra: "MANZANA", tabu: ["ROJA", "FRUTA", "ARBOL", "EVA"] },
  { palabra: "PERA", tabu: ["DULCE", "VERDE", "FRUTA", "ARBOL"] },
  { palabra: "NARANJA", tabu: ["JUGO", "VITAMINA", "FRUTA", "COLOR"] },
  { palabra: "MANDARINA", tabu: ["NARANJA", "PEQUENA", "CITRICA", "FRUTA"] },
  { palabra: "DURAZNO", tabu: ["PELUDO", "VERANO", "FRUTA", "AMARILLO"] },
  { palabra: "CIRUELA", tabu: ["MORADA", "FRUTA", "DULCE", "PASA"] },
  { palabra: "FRUTILLA", tabu: ["ROJA", "FRUTA", "DULCE", "CREMA"] },
  { palabra: "BANANA", tabu: ["AMARILLA", "CURVA", "FRUTA", "MONO"] },
  { palabra: "UVA", tabu: ["VINO", "RACIMO", "DULCE", "FRUTA"] },
  { palabra: "SANDIA", tabu: ["ROJA", "VERDE", "VERANO", "SEMILLAS"] },
  { palabra: "MELON", tabu: ["NARANJA", "DULCE", "VERANO", "FRUTA"] },
  { palabra: "ANANA", tabu: ["TROPICAL", "AMARILLA", "CORONA", "FRUTA"] },
  { palabra: "KIWI", tabu: ["VERDE", "PEQUENO", "NUEVA ZELANDA", "FRUTA"] },
  { palabra: "MANGO", tabu: ["TROPICAL", "AMARILLO", "DULCE", "INDIA"] },

  // Lugares y geografía
  { palabra: "DESIERTO", tabu: ["CALOR", "ARENA", "SECO", "CAMELLO"] },
  { palabra: "SELVA", tabu: ["ARBOLES", "HUMEDA", "ANIMALES", "AMAZON"] },
  { palabra: "PRADERA", tabu: ["PASTO", "CAMPO", "VERDE", "VACA"] },
  { palabra: "GLACIAR", tabu: ["HIELO", "FRIO", "ANTARTIDA", "AGUA"] },
  { palabra: "ACANTILADO", tabu: ["PIEDRA", "MAR", "ALTO", "CAER"] },
  { palabra: "ARRECIFE", tabu: ["CORAL", "MAR", "PECES", "COLORIDO"] },
  { palabra: "BAHIA", tabu: ["MAR", "COSTA", "BOTE", "ENTRADA"] },
  { palabra: "PANTANO", tabu: ["HUMEDO", "LODO", "RANA", "VERDE"] },
  { palabra: "MESETA", tabu: ["PLANA", "ALTA", "VIENTO", "SECA"] },
  { palabra: "PENINSULA", tabu: ["MAR", "TIERRA", "RODEADA", "ESPAÑA"] },
  { palabra: "ESTRECHO", tabu: ["MAR", "ANGOSTO", "PASO", "AGUA"] },
  { palabra: "ARCHIPIELAGO", tabu: ["ISLAS", "MAR", "GRUPO", "GRECIA"] },
  { palabra: "LAGUNA", tabu: ["AGUA", "PEQUENA", "LAGO", "PAZ"] },
  { palabra: "MANANTIAL", tabu: ["AGUA", "NATURAL", "SURGIR", "PURO"] },
  { palabra: "CUEVA", tabu: ["OSCURA", "PIEDRA", "MURCIELAGO", "INTERIOR"] },
  { palabra: "CANON", tabu: ["PROFUNDO", "RIO", "ROCA", "ARIZONA"] },
  { palabra: "OASIS", tabu: ["DESIERTO", "AGUA", "PALMA", "REFUGIO"] },
  { palabra: "TUNDRA", tabu: ["FRIO", "PLANA", "RUSIA", "HELADA"] },
  { palabra: "PAMPAS", tabu: ["ARGENTINA", "GAUCHO", "LLANURA", "VACA"] },
  { palabra: "CORDILLERA", tabu: ["MONTANA", "ANDES", "NIEVE", "ALTA"] },
  { palabra: "LLANURA", tabu: ["PLANA", "PASTO", "CAMPO", "HORIZONTE"] },
  { palabra: "DELTA", tabu: ["RIO", "AGUA", "DESEMBOCADURA", "ISLA"] },

  // Profesiones y oficios
  { palabra: "ABOGADO", tabu: ["JUICIO", "LEY", "TRIBUNAL", "CLIENTE"] },
  { palabra: "ARQUITECTO", tabu: ["EDIFICIO", "DISEÑO", "PLANO", "CONSTRUIR"] },
  { palabra: "INGENIERO", tabu: ["MAQUINA", "CONSTRUIR", "CIENCIAS", "TECNICO"] },
  { palabra: "ENFERMERO", tabu: ["HOSPITAL", "CUIDAR", "JERINGA", "SALUD"] },
  { palabra: "MAESTRO", tabu: ["ESCUELA", "ENSENAR", "NINOS", "PIZARRON"] },
  { palabra: "CONTADOR", tabu: ["NUMEROS", "DINERO", "IMPUESTO", "PLANILLA"] },
  { palabra: "PLOMERO", tabu: ["CANO", "AGUA", "GRIFO", "REPARAR"] },
  { palabra: "ELECTRICISTA", tabu: ["LUZ", "CABLE", "CORRIENTE", "ENCHUFE"] },
  { palabra: "PINTOR", tabu: ["BROCHA", "PARED", "COLOR", "PINTURA"] },
  { palabra: "FOTOGRAFO", tabu: ["CAMARA", "FOTO", "LENTE", "IMAGEN"] },
  { palabra: "PERIODISTA", tabu: ["NOTICIAS", "MICROFONO", "ENTREVISTAR", "PRENSA"] },
  { palabra: "PILOTO", tabu: ["AVION", "VOLAR", "CABINA", "COMANDAR"] },
  { palabra: "VETERINARIO", tabu: ["ANIMAL", "CUIDAR", "CLINICA", "MASCOTA"] },
  { palabra: "PSICOLOGO", tabu: ["MENTE", "TERAPIA", "SILLON", "HABLAR"] },
  { palabra: "JUEZ", tabu: ["TRIBUNAL", "LEY", "SENTENCIA", "TOGA"] },
  { palabra: "POLICIA", tabu: ["UNIFORME", "PATRULLA", "CRIMEN", "ORDEN"] },
  { palabra: "CHOFER", tabu: ["MANEJAR", "AUTO", "VOLANTE", "TRANSPORTE"] },
  { palabra: "MECANICO", tabu: ["AUTO", "MOTOR", "REPARAR", "TALLER"] },
  { palabra: "SOLDADO", tabu: ["EJERCITO", "GUERRA", "ARMA", "UNIFORME"] },
  { palabra: "MARINERO", tabu: ["BARCO", "MAR", "UNIFORME", "NAVEGAR"] },
  { palabra: "ASTRONOMO", tabu: ["ESTRELLAS", "TELESCOPIO", "ESPACIO", "CIENCIA"] },
  { palabra: "BIOLOGO", tabu: ["VIDA", "CIENCIA", "PLANTAS", "ANIMALES"] },
  { palabra: "QUIMICO", tabu: ["LABORATORIO", "FORMULA", "ELEMENTO", "REACCION"] },
  { palabra: "HISTORIADOR", tabu: ["PASADO", "HISTORIA", "FECHAS", "INVESTIGAR"] },
  { palabra: "FILOSOFO", tabu: ["PENSAR", "SABIDURIA", "GRECIA", "IDEAS"] },
  { palabra: "ESCULTOR", tabu: ["PIEDRA", "CINCEL", "FIGURA", "ARTE"] },
  { palabra: "BAILARIN", tabu: ["DANZA", "MUSICA", "ESCENA", "MOVIMIENTO"] },
  { palabra: "ACTOR", tabu: ["PELICULA", "TEATRO", "PAPEL", "ACTUAR"] },
  { palabra: "ESCRITOR", tabu: ["LIBRO", "NOVELA", "PLUMA", "HISTORIA"] },
  { palabra: "POETA", tabu: ["VERSO", "RIMA", "SENTIMIENTO", "ESCRIBIR"] },
  { palabra: "MUSICO", tabu: ["INSTRUMENTO", "TOCAR", "MELODIA", "NOTA"] },
  { palabra: "DIRECTOR", tabu: ["PELICULA", "CAMARA", "ACCION", "CINE"] },
  { palabra: "DISEÑADOR", tabu: ["GRAFICA", "CREAR", "ARTE", "COMPUTADORA"] },
  { palabra: "MODISTA", tabu: ["ROPA", "COSER", "TELA", "MODA"] },
  { palabra: "JOYERO", tabu: ["ORO", "DIAMANTE", "ANILLO", "TIENDA"] },
  { palabra: "ZAPATERO", tabu: ["ZAPATO", "COSER", "CUERO", "ARREGLAR"] },

  // Objetos cotidianos
  { palabra: "TIJERA", tabu: ["CORTAR", "AFILAR", "TELA", "PUNTAS"] },
  { palabra: "AGUJA", tabu: ["COSER", "HILO", "PUNTA", "FINA"] },
  { palabra: "HILO", tabu: ["COSER", "DELGADO", "TEJER", "ENROLLAR"] },
  { palabra: "BOTON", tabu: ["ROPA", "COSER", "REDONDO", "CAMISA"] },
  { palabra: "CREMALLERA", tabu: ["CERRAR", "ROPA", "DIENTES", "SUBIR"] },
  { palabra: "PERCHA", tabu: ["ROPA", "COLGAR", "ARMARIO", "PLASTICO"] },
  { palabra: "PLANCHA", tabu: ["ROPA", "CALOR", "VAPOR", "ARRUGAS"] },
  { palabra: "DETERGENTE", tabu: ["LAVAR", "ESPUMA", "PLATOS", "LIMPIO"] },
  { palabra: "ESPONJA", tabu: ["LAVAR", "SUAVE", "ABSORBER", "PLATOS"] },
  { palabra: "ESCOBA", tabu: ["BARRER", "PISO", "BRUJA", "MANGO"] },
  { palabra: "TRAPO", tabu: ["LIMPIAR", "TELA", "PISO", "VIEJO"] },
  { palabra: "BALDE", tabu: ["AGUA", "PLASTICO", "REDONDO", "LAVAR"] },
  { palabra: "DUCHA", tabu: ["AGUA", "BANO", "BANARSE", "CALIENTE"] },
  { palabra: "GRIFO", tabu: ["AGUA", "ABRIR", "BANO", "LLAVE"] },
  { palabra: "ENCHUFE", tabu: ["LUZ", "ELECTRICIDAD", "PARED", "CONECTAR"] },
  { palabra: "INTERRUPTOR", tabu: ["LUZ", "PRENDER", "APAGAR", "PARED"] },
  { palabra: "FOCO", tabu: ["LUZ", "VIDRIO", "LAMPARA", "ILUMINAR"] },
  { palabra: "VELADOR", tabu: ["LUZ", "MESA", "NOCHE", "LAMPARA"] },
  { palabra: "CORTINA", tabu: ["VENTANA", "TELA", "COLGAR", "SOL"] },
  { palabra: "PERSIANA", tabu: ["VENTANA", "MADERA", "BAJAR", "LUZ"] },
  { palabra: "CERROJO", tabu: ["PUERTA", "CERRAR", "METAL", "SEGURIDAD"] },
  { palabra: "CLAVO", tabu: ["MARTILLO", "METAL", "PUNTA", "PARED"] },
  { palabra: "TORNILLO", tabu: ["DESTORNILLADOR", "METAL", "ROSCA", "ATORNILLAR"] },
  { palabra: "LLAVE", tabu: ["PUERTA", "ABRIR", "METAL", "CERRADURA"] },
  { palabra: "MARTILLO", tabu: ["GOLPEAR", "METAL", "CLAVO", "HERRAMIENTA"] },
  { palabra: "SIERRA", tabu: ["CORTAR", "MADERA", "DIENTES", "HERRAMIENTA"] },
  { palabra: "TALADRO", tabu: ["PERFORAR", "PARED", "RUIDO", "HERRAMIENTA"] },
  { palabra: "PINZA", tabu: ["AGARRAR", "METAL", "HERRAMIENTA", "PRESION"] },
  { palabra: "REGLA", tabu: ["MEDIR", "RECTA", "PLASTICO", "ESCUELA"] },
  { palabra: "CALCULADORA", tabu: ["NUMEROS", "SUMAR", "RESTAR", "TECLAS"] },
  { palabra: "IMPRESORA", tabu: ["PAPEL", "TINTA", "IMPRIMIR", "COMPUTADORA"] },
  { palabra: "PENDRIVE", tabu: ["DATOS", "USB", "GUARDAR", "PEQUENO"] },
  { palabra: "AURICULARES", tabu: ["MUSICA", "OIDO", "ESCUCHAR", "CABLE"] },

  // Deportes y juegos
  { palabra: "TENIS", tabu: ["RAQUETA", "PELOTA", "RED", "CANCHA"] },
  { palabra: "BASQUET", tabu: ["ARO", "PELOTA", "CANASTA", "EQUIPO"] },
  { palabra: "RUGBY", tabu: ["OVAL", "MELE", "EMPUJAR", "TACKLEAR"] },
  { palabra: "NATACION", tabu: ["PISCINA", "NADAR", "ESTILO", "AGUA"] },
  { palabra: "ATLETISMO", tabu: ["CORRER", "SALTAR", "PISTA", "VELOCIDAD"] },
  { palabra: "BOXEO", tabu: ["GOLPE", "GUANTE", "RING", "PELEAR"] },
  { palabra: "ESGRIMA", tabu: ["ESPADA", "DUELO", "MASCARA", "DEPORTE"] },
  { palabra: "JUDO", tabu: ["JAPON", "TIRAR", "CINTURON", "LUCHA"] },
  { palabra: "KARATE", tabu: ["GOLPE", "JAPON", "CINTURON", "PATADA"] },
  { palabra: "CICLISMO", tabu: ["BICICLETA", "PEDALEAR", "TOUR", "RUEDA"] },
  { palabra: "ESQUI", tabu: ["NIEVE", "DESLIZAR", "MONTANA", "BASTONES"] },
  { palabra: "SURF", tabu: ["OLA", "TABLA", "MAR", "PLAYA"] },
  { palabra: "GOLF", tabu: ["PALO", "HOYO", "PELOTA", "CAMPO"] },
  { palabra: "POLO", tabu: ["CABALLO", "PALO", "PELOTA", "CAMPO"] },
  { palabra: "ESCALADA", tabu: ["ROCA", "SUBIR", "CUERDA", "MONTANA"] },
  { palabra: "PARACAIDAS", tabu: ["SALTAR", "AVION", "CAER", "CIELO"] },
  { palabra: "AJEDREZ", tabu: ["REY", "TABLERO", "PIEZA", "JAQUE"] },
  { palabra: "DOMINÓ", tabu: ["FICHA", "PUNTOS", "COLOCAR", "JUEGO"] },
  { palabra: "RULETA", tabu: ["CASINO", "GIRAR", "NUMEROS", "APOSTAR"] },
  { palabra: "DADOS", tabu: ["TIRAR", "NUMEROS", "SEIS", "CUADRADO"] },
  { palabra: "BARAJA", tabu: ["CARTAS", "JUEGO", "PALO", "MAZO"] },
  { palabra: "TRUCO", tabu: ["CARTAS", "ARGENTINA", "ENVITE", "MAZO"] },

  // Naturaleza y fenómenos
  { palabra: "RAYO", tabu: ["TORMENTA", "LUZ", "TRUENO", "CAER"] },
  { palabra: "TRUENO", tabu: ["TORMENTA", "RUIDO", "RAYO", "NUBE"] },
  { palabra: "GRANIZO", tabu: ["LLUVIA", "HIELO", "CAER", "TORMENTA"] },
  { palabra: "NIEBLA", tabu: ["NUBE", "BAJA", "VISIBILIDAD", "HUMEDAD"] },
  { palabra: "ARCO IRIS", tabu: ["COLOR", "LLUVIA", "SOL", "CURVA"] },
  { palabra: "MAREA", tabu: ["MAR", "LUNA", "SUBIR", "BAJAR"] },
  { palabra: "BRISA", tabu: ["VIENTO", "SUAVE", "MAR", "FRESCO"] },
  { palabra: "SEQUIA", tabu: ["SECO", "AGUA", "CALOR", "PLANTAS"] },
  { palabra: "INUNDACION", tabu: ["AGUA", "LLUVIA", "DESBORDE", "RIO"] },
  { palabra: "AURORA BOREAL", tabu: ["LUCES", "NORTE", "CIELO", "COLORES"] },
  { palabra: "ECLIPSE", tabu: ["SOL", "LUNA", "SOMBRA", "CUBRIR"] },
  { palabra: "AVALANCHA", tabu: ["NIEVE", "MONTANA", "CAER", "PELIGRO"] },

  // Cultura, arte y entretenimiento
  { palabra: "PELICULA", tabu: ["CINE", "ACTORES", "PANTALLA", "VER"] },
  { palabra: "SERIE", tabu: ["TV", "EPISODIO", "TEMPORADA", "VER"] },
  { palabra: "NOVELA", tabu: ["LIBRO", "FICCION", "PERSONAJE", "LEER"] },
  { palabra: "POEMA", tabu: ["VERSO", "RIMA", "SENTIMIENTO", "ESCRIBIR"] },
  { palabra: "CUENTO", tabu: ["HISTORIA", "CORTA", "PERSONAJE", "NINOS"] },
  { palabra: "MITO", tabu: ["GRECIA", "DIOSES", "HISTORIA", "FANTASIA"] },
  { palabra: "LEYENDA", tabu: ["HISTORIA", "ANTIGUA", "PUEBLO", "FANTASIA"] },
  { palabra: "TEATRO", tabu: ["OBRA", "ACTORES", "ESCENARIO", "PUBLICO"] },
  { palabra: "OPERA", tabu: ["CANTAR", "MUSICA", "TEATRO", "CLASICO"] },
  { palabra: "BALLET", tabu: ["DANZA", "TUTU", "MUSICA", "CLASICO"] },
  { palabra: "PINTURA", tabu: ["COLOR", "PINCEL", "ARTE", "CUADRO"] },
  { palabra: "MURAL", tabu: ["PARED", "PINTURA", "GRANDE", "PUBLICO"] },
  { palabra: "CONCIERTO", tabu: ["MUSICA", "ESCENARIO", "BANDA", "PUBLICO"] },
  { palabra: "FESTIVAL", tabu: ["MUSICA", "FIESTA", "MULTITUD", "CAMPO"] },
  { palabra: "FERIA", tabu: ["VENTA", "ARTESANIAS", "PUBLICO", "PUESTO"] },
  { palabra: "MUSEO", tabu: ["ARTE", "HISTORIA", "VISITAR", "OBRA"] },
  { palabra: "GALERIA", tabu: ["ARTE", "PINTURA", "EXPOSICION", "CUADROS"] },

  // Ciencia y tecnología
  { palabra: "GRAVEDAD", tabu: ["CAER", "NEWTON", "TIERRA", "FUERZA"] },
  { palabra: "MAGNETISMO", tabu: ["IMAN", "ATRAER", "POLO", "METAL"] },
  { palabra: "ATOMO", tabu: ["PEQUENO", "ELEMENTO", "NUCLEO", "QUIMICA"] },
  { palabra: "CELULA", tabu: ["VIDA", "MICROSCOPIO", "ORGANISMO", "NUCLEO"] },
  { palabra: "EVOLUCION", tabu: ["DARWIN", "ESPECIES", "CAMBIO", "TIEMPO"] },
  { palabra: "FOTOSINTESIS", tabu: ["PLANTA", "SOL", "OXIGENO", "VERDE"] },
  { palabra: "VACUNA", tabu: ["ENFERMEDAD", "INYECCION", "PREVENIR", "INMUNIDAD"] },
  { palabra: "LASER", tabu: ["LUZ", "CONCENTRADA", "CORTAR", "RAYO"] },
  { palabra: "SATELITE", tabu: ["ORBITA", "ESPACIO", "SENAL", "COMUNICACION"] },
  { palabra: "ROBOT", tabu: ["MAQUINA", "PROGRAMAR", "ARTIFICIAL", "METALICO"] },
  { palabra: "INTERNET", tabu: ["RED", "CONECTAR", "WEB", "COMPUTADORA"] },
  { palabra: "ALGORITMO", tabu: ["PASOS", "COMPUTADORA", "MATEMATICAS", "SECUENCIA"] },

  // Historia y sociedad
  { palabra: "DEMOCRACIA", tabu: ["VOTAR", "GOBIERNO", "PUEBLO", "LIBERTAD"] },
  { palabra: "MONARQUIA", tabu: ["REY", "CORONA", "REINO", "HERENCIA"] },
  { palabra: "REPUBLICA", tabu: ["PRESIDENTE", "GOBIERNO", "ESTADO", "CIUDADANO"] },
  { palabra: "CONSTITUCION", tabu: ["LEY", "FUNDAMENTAL", "ESTADO", "DERECHOS"] },
  { palabra: "FRONTERA", tabu: ["PAIS", "LIMITE", "PASAR", "ADUANA"] },
  { palabra: "INDEPENDENCIA", tabu: ["LIBERTAD", "PAIS", "SEPARARSE", "BANDERA"] },
  { palabra: "MIGRACION", tabu: ["MUDARSE", "PAIS", "VIAJAR", "EXTRANJERO"] },
  { palabra: "FEUDALISMO", tabu: ["SENOR", "CAMPESINO", "TIERRA", "MEDIEVAL"] },
  { palabra: "RENACIMIENTO", tabu: ["ARTE", "EUROPA", "ITALIA", "CULTURA"] },
  { palabra: "CAPITALISMO", tabu: ["MERCADO", "DINERO", "EMPRESA", "ECONOMIA"] },
  { palabra: "GLOBALIZACION", tabu: ["MUNDO", "COMERCIO", "CONECTAR", "ECONOMIA"] },

  // Ropa y accesorios
  { palabra: "SACO", tabu: ["ABRIGO", "FRIO", "MANGA", "ROPA"] },
  { palabra: "CAMPERA", tabu: ["FRIO", "ABRIGO", "CIERRE", "ROPA"] },
  { palabra: "PANTALON", tabu: ["ROPA", "PIERNAS", "TELA", "JEAN"] },
  { palabra: "POLLERA", tabu: ["MUJER", "ROPA", "FALDA", "TELA"] },
  { palabra: "REMERA", tabu: ["CAMISETA", "MANGA", "TELA", "ROPA"] },
  { palabra: "CAMISA", tabu: ["BOTON", "FORMAL", "MANGA", "ROPA"] },
  { palabra: "VESTIDO", tabu: ["MUJER", "ENTERA", "TELA", "ELEGANTE"] },
  { palabra: "TRAJE", tabu: ["FORMAL", "CORBATA", "SACO", "HOMBRE"] },
  { palabra: "CORBATA", tabu: ["CUELLO", "TRAJE", "FORMAL", "NUDO"] },
  { palabra: "CINTURON", tabu: ["PANTALON", "CUERO", "HEBILLA", "CINTURA"] },
  { palabra: "SOMBRERO", tabu: ["CABEZA", "ALA", "CUBIERTA", "SOL"] },
  { palabra: "GORRA", tabu: ["CABEZA", "VISERA", "DEPORTIVA", "TELA"] },
  { palabra: "CARTERA", tabu: ["MUJER", "BOLSA", "CUERO", "LLEVAR"] },
  { palabra: "BILLETERA", tabu: ["DINERO", "BOLSILLO", "CUERO", "TARJETA"] },
  { palabra: "RELOJ", tabu: ["TIEMPO", "HORA", "MUNECA", "AGUJAS"] },
  { palabra: "COLLAR", tabu: ["CUELLO", "JOYA", "CADENA", "ORO"] },
  { palabra: "PULSERA", tabu: ["MUNECA", "JOYA", "ORO", "ADORNO"] },
  { palabra: "ANILLO", tabu: ["DEDO", "ORO", "CASAMIENTO", "JOYA"] },
  { palabra: "LENTES", tabu: ["OJOS", "VER", "VIDRIO", "MARCO"] },
  { palabra: "PANUELO", tabu: ["NARIZ", "TELA", "ESTORNUDAR", "BOLSILLO"] },
  { palabra: "MEDIAS", tabu: ["PIE", "TELA", "ZAPATO", "PAR"] },

  // Hogar y muebles
  { palabra: "SILLON", tabu: ["SENTARSE", "SALA", "COMODO", "ALMOHADON"] },
  { palabra: "SOFA", tabu: ["SALA", "SENTARSE", "COMODO", "COJIN"] },
  { palabra: "MESA", tabu: ["COMER", "MADERA", "PATAS", "SUPERFICIE"] },
  { palabra: "SILLA", tabu: ["SENTARSE", "PATAS", "MADERA", "RESPALDO"] },
  { palabra: "ESCRITORIO", tabu: ["TRABAJAR", "COMPUTADORA", "MADERA", "OFICINA"] },
  { palabra: "CAMA", tabu: ["DORMIR", "COLCHON", "ALMOHADA", "DESCANSO"] },
  { palabra: "PLACARD", tabu: ["ROPA", "GUARDAR", "ARMARIO", "ESPEJO"] },
  { palabra: "ESTANTE", tabu: ["REPISAS", "PARED", "GUARDAR", "MADERA"] },
  { palabra: "CUADRO", tabu: ["PARED", "PINTURA", "COLGAR", "MARCO"] },
  { palabra: "JARRON", tabu: ["FLORES", "CERAMICA", "DECORACION", "AGUA"] },
  { palabra: "MACETA", tabu: ["PLANTA", "TIERRA", "CERAMICA", "FLORES"] },
  { palabra: "LAMPARA", tabu: ["LUZ", "TECHO", "ILUMINAR", "PANTALLA"] },
  { palabra: "CUADERNO", tabu: ["ESCRIBIR", "HOJAS", "ESCUELA", "LAPIZ"] },
  { palabra: "CALENDARIO", tabu: ["FECHAS", "MESES", "ANO", "DIAS"] },
];


// ── Audio Engine ──────────────────────────────────────────────
// ── Milonga / Tango background music engine ───────────────────
// Plays a looping Argentine milonga: bandoneón melody + bass + rhythm
function useMilonga() {
  const ctxRef   = useRef(null);
  const loopRef  = useRef(null);
  const masterRef = useRef(null);
  const playingRef = useRef(false);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      // master gain (soft background volume)
      const m = ctxRef.current.createGain();
      m.gain.value = 0.13;
      m.connect(ctxRef.current.destination);
      masterRef.current = m;
    }
    return ctxRef.current;
  };

  // note frequencies (A3=220 base, milonga in D minor)
  const NOTE = {
    D3:146.83, E3:164.81, F3:174.61, G3:196.00, A3:220.00,
    Bb3:233.08, C4:261.63, D4:293.66, E4:329.63, F4:349.23,
    G4:392.00, A4:440.00, Bb4:466.16, C5:523.25, D5:587.33,
    E5:659.25, F5:698.46,
  };

  // Bandoneón-style tone: sawtooth + slight detune
  const playBandoneon = (ac, dest, freq, start, dur, vol = 0.5) => {
    const osc1 = ac.createOscillator();
    const osc2 = ac.createOscillator();
    const gain = ac.createGain();
    osc1.type = "sawtooth"; osc1.frequency.value = freq;
    osc2.type = "sawtooth"; osc2.frequency.value = freq * 1.003; // slight detune
    osc1.connect(gain); osc2.connect(gain); gain.connect(dest);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.04);
    gain.gain.setValueAtTime(vol, start + dur - 0.06);
    gain.gain.linearRampToValueAtTime(0, start + dur);
    osc1.start(start); osc1.stop(start + dur + 0.01);
    osc2.start(start); osc2.stop(start + dur + 0.01);
  };

  // Bass pluck: triangle wave, short decay
  const playBass = (ac, dest, freq, start, dur) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "triangle"; osc.frequency.value = freq;
    osc.connect(gain); gain.connect(dest);
    gain.gain.setValueAtTime(0.55, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + Math.min(dur, 0.35));
    osc.start(start); osc.stop(start + dur);
  };

  // Percussion click (cajita / woodblock feel)
  const playClick = (ac, dest, start, vol = 0.18) => {
    const buf = ac.createBuffer(1, ac.sampleRate * 0.06, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ac.sampleRate * 0.008));
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    const filt = ac.createBiquadFilter();
    src.buffer = buf;
    filt.type = "bandpass"; filt.frequency.value = 1200; filt.Q.value = 2;
    src.connect(filt); filt.connect(gain); gain.connect(dest);
    gain.gain.value = vol;
    src.start(start);
  };

  // ── The milonga pattern (8 beats = 4/4 × 2, BPM ~72) ──
  // Milonga rhythm: strong beats 1,3 with syncopated feel
  const scheduleLoop = (ac, dest, startTime) => {
    const BPM = 72;
    const beat = 60 / BPM;        // ~0.833s per beat
    const bar  = beat * 4;        // ~3.33s per bar
    const loop = bar * 4;         // 4 bars = ~13.33s

    // ── Melody (bandoneón) — D minor, lyrical milonga phrase ──
    const melody = [
      // bar 1: opening phrase
      [NOTE.D4, 0,       beat*1.5], [NOTE.F4, beat*1.5, beat*0.5],
      [NOTE.A4, beat*2,  beat*1.5], [NOTE.G4, beat*3.5, beat*0.5],
      // bar 2
      [NOTE.F4, bar,     beat],     [NOTE.E4, bar+beat, beat*0.5],
      [NOTE.D4, bar+beat*1.5, beat*1.5], [NOTE.C4, bar+beat*3, beat],
      // bar 3: rise
      [NOTE.E4, bar*2,   beat],     [NOTE.F4, bar*2+beat, beat],
      [NOTE.G4, bar*2+beat*2, beat],[NOTE.A4, bar*2+beat*3, beat*0.75],
      [NOTE.Bb4,bar*2+beat*3.75,beat*0.25],
      // bar 4: resolution
      [NOTE.A4, bar*3,   beat*1.5], [NOTE.F4, bar*3+beat*1.5, beat*0.5],
      [NOTE.D4, bar*3+beat*2, beat*2],
    ];

    // ── Bass line — classic milonga bass ──
    const bass = [
      // bar 1
      [NOTE.D3,  0,      beat],  [NOTE.A3,  beat,   beat*0.5],
      [NOTE.D3,  beat*2, beat],  [NOTE.A3,  beat*3, beat*0.5],
      // bar 2
      [NOTE.C4,  bar,    beat],  [NOTE.G3,  bar+beat, beat*0.5],
      [NOTE.F3,  bar+beat*2, beat],[NOTE.C4, bar+beat*3, beat*0.5],
      // bar 3
      [NOTE.Bb3, bar*2,  beat],  [NOTE.F3,  bar*2+beat, beat*0.5],
      [NOTE.G3,  bar*2+beat*2, beat],[NOTE.D3,bar*2+beat*3, beat*0.5],
      // bar 4
      [NOTE.A3,  bar*3,  beat],  [NOTE.E3,  bar*3+beat, beat*0.5],
      [NOTE.D3,  bar*3+beat*2, beat*2],
    ];

    // ── Milonga rhythm: beats 1, 2.5, 3 in each bar (3-3-2 feel) ──
    const rhythmOffsets = [0, beat*0.5, beat, beat*1.5, beat*2, beat*2.5, beat*3, beat*3.5];
    const rhythmVols    = [0.22, 0.10, 0.18, 0.10, 0.22, 0.10, 0.15, 0.10];

    for (let b = 0; b < 4; b++) {
      rhythmOffsets.forEach((off, ri) => {
        playClick(ac, dest, startTime + bar * b + off, rhythmVols[ri]);
      });
    }

    melody.forEach(([freq, off, dur]) => playBandoneon(ac, dest, freq, startTime + off, dur, 0.45));
    bass.forEach(([freq, off, dur])   => playBass(ac, dest, freq, startTime + off, dur));

    return loop;
  };

  const stop = () => {
    playingRef.current = false;
    clearTimeout(loopRef.current);
    // Suspend context so already-scheduled oscillators go silent immediately
    if (ctxRef.current && ctxRef.current.state === "running") {
      ctxRef.current.suspend();
    }
  };

  const start = () => {
    if (playingRef.current) return;
    playingRef.current = true;
    const ac = getCtx();
    // Resume suspended context
    if (ac.state === "suspended") ac.resume();
    const dest = masterRef.current;

    let nextStart = ac.currentTime + 0.05;
    const tick = () => {
      if (!playingRef.current) return;
      const loopDur = scheduleLoop(ac, dest, nextStart);
      nextStart += loopDur;
      loopRef.current = setTimeout(tick, (loopDur - 1) * 1000);
    };
    tick();
  };

  const toggle = () => { playingRef.current ? stop() : start(); };

  return { start, stop, toggle, isPlaying: () => playingRef.current };
}

function useSound() {
  const ctx = useRef(null);
  const getCtx = () => {
    if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctx.current;
  };

  const playCorrect = () => {
    const ac = getCtx();
    const t = ac.currentTime;
    [523.25, 659.25].forEach((freq, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + i * 0.13);
      gain.gain.setValueAtTime(0, t + i * 0.13);
      gain.gain.linearRampToValueAtTime(0.35, t + i * 0.13 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.13 + 0.35);
      osc.start(t + i * 0.13);
      osc.stop(t + i * 0.13 + 0.35);
    });
  };

  const playTabu = () => {
    const ac = getCtx();
    const t = ac.currentTime;
    [220, 185, 155].forEach((freq, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + i * 0.1);
      gain.gain.setValueAtTime(0.3, t + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.18);
      osc.start(t + i * 0.1);
      osc.stop(t + i * 0.1 + 0.2);
    });
  };

  const playSkip = () => {
    const ac = getCtx();
    const t = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.linearRampToValueAtTime(320, t + 0.15);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.start(t); osc.stop(t + 0.2);
  };

  return { playCorrect, playTabu, playSkip };
}

// ── Random Card ───────────────────────────────────────────────
function getRandomCard(usedIndices) {
  const available = CARDS.map((_, i) => i).filter(i => !usedIndices.has(i));
  if (available.length === 0) return { card: CARDS[Math.floor(Math.random() * CARDS.length)], index: 0, reset: true };
  const idx = available[Math.floor(Math.random() * available.length)];
  return { card: CARDS[idx], index: idx, reset: false };
}

const initialState = {
  screen: "home",
  scores: [0, 0],
  currentTeam: 0,
  round: 1,
  maxRounds: 3,
  card: null,
  timeLeft: TURN_DURATION,
  timerRunning: false,
  turnHistory: [],
  flash: null, // 'correct' | 'tabu' | 'skip' | null
  usedIndices: new Set(),
};

// ── Pastel palette ────────────────────────────────────────────
const P = {
  bg:        "#FFF8F0",
  bgCard:    "#FFFFFF",
  bgAlt:     "#FFF0F5",
  rose:      "#F9A8C9",
  roseDark:  "#E8709A",
  mint:      "#A8DFC9",
  mintDark:  "#3BAE7E",
  peach:     "#FFCBA4",
  peachDark: "#E8854A",
  sky:       "#A8D4F9",
  skyDark:   "#3A8EDE",
  lavender:  "#C8B8F0",
  yellow:    "#FFE599",
  yellowDark:"#C9960A",
  text:      "#3D2C40",
  textLight: "#9B8EA5",
  red1:      "#FFB3C1",
  red2:      "#E8325A",
};

// Team colors: Rose for team 0, Sky for team 1
const TC = [
  { light: P.rose, dark: P.roseDark, grad: "linear-gradient(135deg, #F9A8C9, #E8709A)" },
  { light: P.sky,  dark: P.skyDark,  grad: "linear-gradient(135deg, #A8D4F9, #3A8EDE)" },
];

export default function TabuGame() {
  const [state, setState] = useState(initialState);
  const [musicOn, setMusicOn] = useState(false);
  const timerRef = useRef(null);
  const sound = useSound();
  const milonga = useMilonga();

  const toggleMusic = () => {
    milonga.toggle();
    setMusicOn(v => !v);
  };

  const triggerFlash = useCallback((type) => {
    setState(s => ({ ...s, flash: type }));
    setTimeout(() => setState(s => ({ ...s, flash: null })), 350);
  }, []);

  useEffect(() => {
    if (state.timerRunning) {
      timerRef.current = setInterval(() => {
        setState(s => {
          if (s.timeLeft <= 1) {
            clearInterval(timerRef.current);
            return { ...s, timeLeft: 0, timerRunning: false, screen: "review" };
          }
          return { ...s, timeLeft: s.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [state.timerRunning]);

  const nextCard = (currentUsed) => {
    const { card, index, reset } = getRandomCard(currentUsed);
    const newUsed = reset ? new Set([index]) : new Set([...currentUsed, index]);
    return { card, newUsed };
  };

  const startTurn = () => {
    const { card, newUsed } = nextCard(state.usedIndices);
    setState(s => ({ ...s, screen: "playing", turnHistory: [], card, timeLeft: TURN_DURATION, timerRunning: true, usedIndices: newUsed, flash: null }));
  };

  const handleResult = (result) => {
    if (!state.card) return;
    if (result === "correct") sound.playCorrect();
    else if (result === "tabu") sound.playTabu();
    else sound.playSkip();
    triggerFlash(result);
    const entry = { word: state.card.palabra, result };
    const scoreDelta = result === "correct" ? 1 : result === "tabu" ? -1 : 0;
    const { card, newUsed } = nextCard(state.usedIndices);
    setState(s => ({
      ...s,
      turnHistory: [...s.turnHistory, entry],
      scores: s.scores.map((sc, i) => i === s.currentTeam ? sc + scoreDelta : sc),
      card,
      usedIndices: newUsed,
    }));
  };

  const endTurn = () => {
    clearInterval(timerRef.current);
    setState(s => ({ ...s, screen: "review", timerRunning: false }));
  };

  const nextTurn = () => {
    const nextTeam = (state.currentTeam + 1) % 2;
    const nextRound = nextTeam === 0 ? state.round + 1 : state.round;
    if (nextRound > state.maxRounds) { setState(s => ({ ...s, screen: "gameover" })); return; }
    setState(s => ({ ...s, screen: "home", currentTeam: nextTeam, round: nextRound, card: null, timeLeft: TURN_DURATION, turnHistory: [] }));
  };

  const resetGame = () => setState({ ...initialState, usedIndices: new Set() });

  // Timer colors
  const timerPct = state.timeLeft / TURN_DURATION;
  const timerColor = timerPct > 0.5 ? P.mintDark : timerPct > 0.2 ? P.peachDark : P.red2;
  const timerBg   = timerPct > 0.5 ? P.mint     : timerPct > 0.2 ? P.peach     : P.red1;

  // Flash overlay color
  const flashColors = { correct: "#B8F5D8", tabu: "#FFB3C1", skip: "#FFE9A0" };
  const flashColor = state.flash ? flashColors[state.flash] : "transparent";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
    @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes popIn    { 0%{transform:scale(0.88)} 60%{transform:scale(1.04)} 100%{transform:scale(1)} }
    @keyframes flashBg  { 0%{opacity:0.7} 100%{opacity:0} }
    @keyframes timerPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
    @keyframes wiggle   { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-4deg)} 75%{transform:rotate(4deg)} }
    * { box-sizing: border-box; }
    body { margin: 0; }
    .btn-action { transition: transform 0.1s, box-shadow 0.1s; }
    .btn-action:active { transform: scale(0.93) !important; }
    .card-enter { animation: fadeUp 0.28s cubic-bezier(.22,.68,0,1.2) both; }
    .score-card { transition: transform 0.3s, box-shadow 0.3s; }
  `;

  // ── HOME ──────────────────────────────────────────────────
  if (state.screen === "home") {
    const isFirst = state.round === 1 && state.currentTeam === 0;
    const tc = TC[state.currentTeam];
    return (
      <div style={{ minHeight: "100vh", background: P.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", padding: 16 }}>
        <style>{css}</style>
        {/* Decorative blobs */}
        <div style={{ position: "fixed", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: P.rose, opacity: 0.25, pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: P.sky, opacity: 0.25, pointerEvents: "none" }} />
        <div style={{ position: "fixed", top: "40%", left: -40, width: 140, height: 140, borderRadius: "50%", background: P.mint, opacity: 0.2, pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, animation: "fadeUp 0.4s both" }}>
          {/* Logo */}
          <div style={{ fontFamily: "Fredoka One, cursive", fontSize: 68, color: P.roseDark, letterSpacing: "0.05em", lineHeight: 1, textShadow: `3px 3px 0px ${P.rose}`, marginBottom: -4 }}>TABÚ</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, color: P.textLight, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: -8 }}>
            {isFirst ? "el juego de las palabras prohibidas" : `Ronda ${state.round} de ${state.maxRounds}`}
          </div>

          {/* Score board */}
          <div style={{ display: "flex", gap: 12, width: "100%", marginTop: 8 }}>
            {TEAM_NAMES.map((name, i) => {
              const active = !isFirst && i === state.currentTeam;
              return (
                <div key={i} className="score-card" style={{
                  flex: 1, borderRadius: 20, padding: "18px 12px", textAlign: "center",
                  background: active ? TC[i].grad : P.bgCard,
                  boxShadow: active ? `0 8px 24px ${TC[i].light}99` : "0 2px 12px rgba(0,0,0,0.06)",
                  transform: active ? "scale(1.04)" : "scale(1)",
                  border: `2px solid ${active ? TC[i].dark : TC[i].light}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: active ? "#fff" : TC[i].dark, marginBottom: 6 }}>{name}</div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: active ? "#fff" : P.text, lineHeight: 1, fontFamily: "Fredoka One, cursive" }}>{state.scores[i]}</div>
                </div>
              );
            })}
          </div>

          {!isFirst && (
            <div style={{ fontSize: 16, color: P.text, fontWeight: 700, textAlign: "center" }}>
              Turno de <span style={{ color: TC[state.currentTeam].dark }}>{TEAM_NAMES[state.currentTeam]}</span>
            </div>
          )}

          <button onClick={startTurn} className="btn-action" style={{
            width: "100%", padding: "16px 0", borderRadius: 18, border: "none", cursor: "pointer",
            background: isFirst ? `linear-gradient(135deg, ${P.lavender}, #A78BFA)` : TC[state.currentTeam].grad,
            color: "#fff", fontSize: 18, fontWeight: 800, fontFamily: "Nunito, sans-serif",
            boxShadow: isFirst ? "0 6px 20px #C8B8F088" : `0 6px 20px ${TC[state.currentTeam].light}99`,
            letterSpacing: "0.03em",
          }}>
            {isFirst ? "✨ ¡Comenzar juego!" : "🎯 ¡Empezar turno!"}
          </button>

          {!isFirst && (
            <button onClick={resetGame} style={{ background: "none", border: `1.5px solid ${P.rose}`, borderRadius: 12, padding: "9px 24px", color: P.roseDark, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
              Reiniciar juego
            </button>
          )}

          {/* Music toggle */}
          <button onClick={toggleMusic} style={{
            background: musicOn ? `linear-gradient(135deg, ${P.lavender}, #A78BFA)` : "none",
            border: `1.5px solid ${P.lavender}`,
            borderRadius: 20, padding: "8px 20px",
            color: musicOn ? "#fff" : "#A78BFA",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Nunito, sans-serif",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {musicOn ? "🎵 Música: ON" : "🎵 Música: OFF"}
          </button>
        </div>
      </div>
    );
  }

  // ── PLAYING ───────────────────────────────────────────────
  if (state.screen === "playing") {
    const tc = TC[state.currentTeam];
    const correctCount = state.turnHistory.filter(h => h.result === "correct").length;
    const tabuCount = state.turnHistory.filter(h => h.result === "tabu").length;
    return (
      <div style={{ minHeight: "100vh", background: P.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", padding: 16, position: "relative", overflow: "hidden" }}>
        <style>{css}</style>

        {/* Decorative blobs */}
        <div style={{ position: "fixed", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: tc.light, opacity: 0.3, pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: P.mint, opacity: 0.25, pointerEvents: "none" }} />

        {/* Flash overlay */}
        {state.flash && (
          <div style={{ position: "fixed", inset: 0, background: flashColor, pointerEvents: "none", animation: "flashBg 0.35s ease forwards", zIndex: 100 }} />
        )}

        <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Top bar: timer + team + score */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Timer circle */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
              background: timerBg, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 16px ${timerBg}99`,
              animation: state.timeLeft <= 10 ? "timerPulse 0.7s infinite" : "none",
              border: `3px solid ${timerColor}`,
            }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: timerColor, fontFamily: "Fredoka One, cursive" }}>{state.timeLeft}</span>
            </div>

            {/* Team badge */}
            <div style={{ flex: 1, background: tc.grad, borderRadius: 14, padding: "8px 14px", boxShadow: `0 4px 14px ${tc.light}88` }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{TEAM_NAMES[state.currentTeam]}</div>
            </div>

            {/* Mini score */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" }}>
              <div style={{ background: "#D4F5E4", borderRadius: 8, padding: "3px 10px", fontSize: 13, fontWeight: 800, color: P.mintDark }}>✓ {correctCount}</div>
              <div style={{ background: P.red1, borderRadius: 8, padding: "3px 10px", fontSize: 13, fontWeight: 800, color: P.red2 }}>🚫 {tabuCount}</div>
            </div>
          </div>

          {/* Card */}
          {state.card && (
            <div key={state.card.palabra} className="card-enter" style={{
              background: P.bgCard, borderRadius: 24, padding: "28px 24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: `2px solid ${P.rose}55`,
            }}>
              <div style={{ fontFamily: "Fredoka One, cursive", fontSize: 38, color: P.text, textAlign: "center", letterSpacing: "0.04em", marginBottom: 16, textTransform: "uppercase" }}>
                {state.card.palabra}
              </div>
              <div style={{ height: 2, background: `linear-gradient(90deg, ${P.rose}, ${P.sky})`, borderRadius: 2, marginBottom: 16 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {state.card.tabu.map((t, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#FFF0F5", borderRadius: 10, padding: "7px 12px",
                    border: `1px solid ${P.rose}66`,
                  }}>
                    <span style={{ fontSize: 14 }}>🚫</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: P.roseDark, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            {/* Tabú */}
            <button className="btn-action" onClick={() => handleResult("tabu")} style={{
              flex: 1, borderRadius: 18, border: "none", cursor: "pointer", padding: "16px 6px",
              background: `linear-gradient(135deg, ${P.red1}, #F77E9B)`,
              boxShadow: `0 5px 16px ${P.red1}99`, color: "#fff",
              fontSize: 13, fontWeight: 800, fontFamily: "Nunito, sans-serif",
              lineHeight: 1.5,
            }}>
              🚫<br/>Tabú
            </button>
            {/* Pasar */}
            <button className="btn-action" onClick={() => handleResult("skip")} style={{
              flex: 1, borderRadius: 18, border: "none", cursor: "pointer", padding: "16px 6px",
              background: `linear-gradient(135deg, ${P.yellow}, #FFD55A)`,
              boxShadow: `0 5px 16px ${P.yellow}99`, color: P.yellowDark,
              fontSize: 13, fontWeight: 800, fontFamily: "Nunito, sans-serif",
              lineHeight: 1.5,
            }}>
              ⏭<br/>Pasar
            </button>
            {/* Correcto */}
            <button className="btn-action" onClick={() => handleResult("correct")} style={{
              flex: 1.3, borderRadius: 18, border: "none", cursor: "pointer", padding: "16px 6px",
              background: `linear-gradient(135deg, ${P.mint}, #5ECFA0)`,
              boxShadow: `0 5px 16px ${P.mint}99`, color: "#fff",
              fontSize: 14, fontWeight: 900, fontFamily: "Nunito, sans-serif",
              lineHeight: 1.5,
            }}>
              ✓<br/>Correcto
            </button>
          </div>

          <button onClick={endTurn} style={{
            background: "none", border: `1.5px solid ${P.textLight}55`, borderRadius: 12,
            padding: "10px", color: P.textLight, fontSize: 13, fontWeight: 700, cursor: "pointer",
            fontFamily: "Nunito, sans-serif",
          }}>
            Terminar turno
          </button>

          {/* Music toggle - compact */}
          <button onClick={toggleMusic} style={{
            alignSelf: "center", background: musicOn ? "#EDE9FF" : "none",
            border: `1.5px solid ${P.lavender}`, borderRadius: 16,
            padding: "5px 14px", color: "#A78BFA", fontSize: 12,
            fontWeight: 700, cursor: "pointer", fontFamily: "Nunito, sans-serif",
          }}>
            {musicOn ? "🎵 ON" : "🎵 OFF"}
          </button>

          {/* History chips */}
          {state.turnHistory.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[...state.turnHistory].reverse().slice(0, 4).map((h, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: h.result === "correct" ? "#EEFAF4" : h.result === "tabu" ? "#FFF0F3" : "#FFFBEA",
                  borderRadius: 8, padding: "5px 10px",
                  border: `1px solid ${h.result === "correct" ? P.mint : h.result === "tabu" ? P.red1 : P.yellow}`,
                  opacity: Math.max(0.3, 1 - i * 0.22),
                  fontSize: 12, fontWeight: 700, color: P.text,
                }}>
                  {h.result === "correct" ? "✓" : h.result === "tabu" ? "🚫" : "⏭"}
                  <span>{h.word}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── REVIEW ────────────────────────────────────────────────
  if (state.screen === "review") {
    const correct = state.turnHistory.filter(h => h.result === "correct").length;
    const tabu = state.turnHistory.filter(h => h.result === "tabu").length;
    const skip = state.turnHistory.filter(h => h.result === "skip").length;
    const tc = TC[state.currentTeam];
    return (
      <div style={{ minHeight: "100vh", background: P.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", padding: 16 }}>
        <style>{css}</style>
        <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, animation: "fadeUp 0.35s both" }}>
          <div style={{ fontFamily: "Fredoka One, cursive", fontSize: 36, color: P.text }}>Fin del turno</div>
          <div style={{ background: tc.grad, borderRadius: 20, padding: "7px 22px", color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: `0 4px 14px ${tc.light}88` }}>
            {TEAM_NAMES[state.currentTeam]}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            {[
              { val: correct, label: "Correctas", bg: "#D4F5E4", color: P.mintDark, border: P.mint },
              { val: tabu,    label: "Tabú (−1)", bg: "#FFE0E8", color: P.red2,     border: P.red1 },
              { val: skip,    label: "Pasadas",   bg: "#FFF7D4", color: P.yellowDark,border: P.yellow },
            ].map(({ val, label, bg, color, border }, i) => (
              <div key={i} style={{ flex: 1, background: bg, borderRadius: 18, padding: "16px 8px", textAlign: "center", border: `2px solid ${border}`, boxShadow: `0 4px 12px ${border}55` }}>
                <div style={{ fontFamily: "Fredoka One, cursive", fontSize: 36, color, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* History list */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, maxHeight: 220, overflowY: "auto" }}>
            {state.turnHistory.map((h, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: h.result === "correct" ? "#EEFAF4" : h.result === "tabu" ? "#FFF0F3" : "#FFFBEA",
                borderLeft: `4px solid ${h.result === "correct" ? P.mintDark : h.result === "tabu" ? P.red2 : P.yellowDark}`,
                borderRadius: 10, padding: "8px 14px", fontSize: 14, fontWeight: 700, color: P.text,
              }}>
                <span>{h.result === "correct" ? "✓" : h.result === "tabu" ? "🚫" : "⏭"}</span>
                {h.word}
              </div>
            ))}
          </div>

          <button onClick={nextTurn} className="btn-action" style={{
            width: "100%", padding: "15px 0", borderRadius: 18, border: "none", cursor: "pointer",
            background: tc.grad, color: "#fff", fontSize: 17, fontWeight: 800, fontFamily: "Nunito, sans-serif",
            boxShadow: `0 6px 20px ${tc.light}99`,
          }}>
            Continuar →
          </button>
        </div>
      </div>
    );
  }

  // ── GAMEOVER ──────────────────────────────────────────────
  if (state.screen === "gameover") {
    const winner = state.scores[0] > state.scores[1] ? 0 : state.scores[1] > state.scores[0] ? 1 : -1;
    return (
      <div style={{ minHeight: "100vh", background: P.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", padding: 16 }}>
        <style>{css}</style>
        <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, animation: "popIn 0.5s both" }}>
          <div style={{ fontFamily: "Fredoka One, cursive", fontSize: 52, color: P.roseDark, textShadow: `3px 3px 0 ${P.rose}` }}>¡Fin!</div>
          {winner === -1
            ? <div style={{ fontSize: 22, fontWeight: 800, color: P.yellowDark }}>🤝 ¡Empate!</div>
            : <div style={{ fontSize: 20, fontWeight: 800, color: TC[winner].dark }}>🏆 ¡Ganó {TEAM_NAMES[winner]}!</div>
          }

          <div style={{ display: "flex", gap: 12, width: "100%" }}>
            {TEAM_NAMES.map((name, i) => {
              const isWinner = i === winner;
              return (
                <div key={i} className="score-card" style={{
                  flex: 1, borderRadius: 20, padding: "20px 12px", textAlign: "center",
                  background: isWinner ? TC[i].grad : P.bgCard,
                  boxShadow: isWinner ? `0 10px 28px ${TC[i].light}99` : "0 2px 12px rgba(0,0,0,0.06)",
                  transform: isWinner ? "scale(1.07)" : "scale(1)",
                  border: `2px solid ${isWinner ? TC[i].dark : TC[i].light}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: isWinner ? "#fff" : TC[i].dark, marginBottom: 6 }}>{name}</div>
                  <div style={{ fontSize: 52, fontWeight: 900, color: isWinner ? "#fff" : P.text, lineHeight: 1, fontFamily: "Fredoka One, cursive" }}>{state.scores[i]}</div>
                  {isWinner && <div style={{ marginTop: 6, fontSize: 20 }}>🏆</div>}
                </div>
              );
            })}
          </div>

          <button onClick={resetGame} className="btn-action" style={{
            width: "100%", padding: "15px 0", borderRadius: 18, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${P.lavender}, #A78BFA)`,
            color: "#fff", fontSize: 17, fontWeight: 800, fontFamily: "Nunito, sans-serif",
            boxShadow: "0 6px 20px #C8B8F099",
          }}>
            ✨ Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }
}
