# Cuarta y última sesión del curso de Three.js

En esta última sesión terminaremos de ver algunos mecanismos de Three.js pendientes
y hablaremos de alguna que otra técnica adicional. Exploraremos también algunos
comportamientos problemáticos típicos.

- Ahora sí, postprocesado (al menos SSAO, AA y Bloom)
- Dedicaremos unos minutos al tratamiento de imágenes HDR (HDRi) y su uso como fuente de iluminación ambiental
    - De paso probaremos también otro material PBR más avanzado que permite transparencia + reflexión
    - Esto debería responder a la duda planteada por Sergio _(creo, perdón si me confundo de persona)_, en la sesión anterior.
- Otros tipos de luces y el problema de recompilación de shaders
- Helpers
- Factorías
- Animaciones
---

# Sesiones anteriores


# Tercera sesión del curso de Three.js

Continuamos a partir de los resultados de la segunda sesión (este mismo repo)

## Lo que intentaremos ver en esta tercera sesión

- Cosillas que quedaron pendientes en la anterior sesión
    - Alguna sugerencia adicional rápida de gestión de escenas
    - Materiales builtin
        - Quería introducirlos al menos en la sesión anterior. En esta profundizaremos en ellos.
    - Postprocesado, si nos sobra tiempo. Si no para la última sesión.
        - Vimos de qué trataba en la sesión anterior, pero no cómo implementar nada concreto. Si nos sobra tiempo veremos:
            - Oclusión ambiental
            - Antialiasing (más allá de la opción del renderer)
            - Bloom

- Carga de modelos y texturas (glTF/.glb)

- GUI y elementos 2D web sincronizados

- Instanciación (InstancedMesh)

# Segunda sesión del curso de Three.js

Continuamos a partir de los resultados de la primera sesión.

Esta vez, iré haciendo push a main en este repositorio con lo que vayamos
viendo en clase.

En este mismo repositorio construimos algún escenario para ejercicios.

## Lo que intentaremos ver en la segunda sesión

- Algunas cosas pendientes respecto a ajustes responsive
- Técnicas de organización y aplicabilidad de principios (principalmente SRP)
    - Veremos algunos problemas típicos relacionados a memory leaks y técnicas para gestionar escenas.
- Pequeña introducción a la gestión de recursos
    - Solo para tratar materiales. Profundizaremos en ello cuando tratemos la importación de modelos y carga de texturas.
- Materiales builtin
- Luces y sombras (introducción)
- Raycast e interacción
- Algo de postprocesado