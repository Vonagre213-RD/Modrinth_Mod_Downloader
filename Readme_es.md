## Si vas a hacer un fork de este proyecto o usarlo en el tuyo, por favor mencióname ❤️

## Descargador de mods de Modrinth

¡Hola! Este es un pequeño proyecto que hice con TypeScript para descargar mods y sus dependencias de Modrinth rápidamente ya que me daba flojera hacerlo manualmente heh,Espero que les guste!

# Pre-requisitos

1- Esto fue hecho con **Node JS** así que debes instalarlo primero antes de empezar **link de descarga ->**[Node.js — Descarga Node.js®](https://nodejs.org/es/download).

2- También, usé **pnpm** en lugar de **npm** como gestor de paquetes así que debes instalarlo primero **Link oficial de instalación ->** [Installation | pnpm](https://pnpm.io/installation).

# Instalación 

1- Primero descarga el archivo de **GitHub**, descargará un .zip, extráelo y abre la carpeta con tu editor de código o terminal, yo estaré usando **Visual Studio Code** para la guía.

2- Una vez abras el archivo, abre una terminal y escribe:

```cmd
pnpm install
```

![Paso de instalación](Photos/Pasted%20image%2020260218195546.png)

3- ¡Eso es todo! ¡Ya instalaste el descargador de mods! ¡Ahora procede a la guía de uso!

# Uso

1- Verás que hay un archivo llamado `downloadQueue.xml`, ahí es donde escribirás toda la información sobre los mods que quieres descargar, tu versión y loader, tiene esta estructura.

```xml

<downloadQueue loader="" version="" outputPath="" >
    <mods>

    </mods>
</downloadQueue>
```

`loader`: aquí especificas tu mod loader (fabric, forge, quill, etc...).
`version`: aquí especificas tu versión de Minecraft.
`outputPath`: aquí pones la ruta donde quieres que se guarden las carpetas, por defecto es en ./mods
`mods`: aquí escribes los nombres de los mods que quieres descargar, sepáralos con comas

# ejemplo

```xml
<downloadQueue loader="fabric" version="1.20.1" outputPath="./mods" >

    <mods>

        ambientsounds,

        appleskin,

        auditory,

        better advancements,

        better f3,

        better than mending,

        better third person,

    </mods>

</downloadQueue>
```

# !! Importante !!

Aunque el programa usa la versión de búsqueda de la api para encontrar similitudes, por favor intenta usar el nombre exacto del mod (el que aparece en las urls).

![Ejemplo de nombre de mod](Photos/Pasted%20image%2020260218202752.png)

en este caso es `distanHorizons`.

o al menos uno lo más similar posible para evitar errores.

# Cómo ejecutar:

solo escribe `pnpm run start` en tu terminal y se ejecutara el programa.

![Ejemplo de ejecución](Photos/Pasted%20image%2020260218205031.png)

# ¡Eso es todo!! ahora puedes descargar mods fácilmente
