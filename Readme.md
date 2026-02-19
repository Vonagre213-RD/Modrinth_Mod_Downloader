##If you're going to make a fork of this project or use it in your own please mention me ❤️

## Modrinth mod downloader

hi! This is a little project I made with typescript to quickly download mods and its dependencies from modrinth since I was too lazy to do it manually heh I hope you like it!

# Pre requisites

1- This was made with **Node JS** so you must install it first before starting **download link ->**[Node.js — Descarga Node.js®](https://nodejs.org/es/download).

2- Also, I used **pnpm** instead of **npm** as package manager so you must install it first  **Official installation link ->** [Installation | pnpm](https://pnpm.io/installation).

# Installation 

1- First download the file from **GitHub** it will download a .zip, extract it and open the folder with your code editor or terminal, I will be using **Visual Studio** code for the guide.

2- Once you open the file, open a terminal and write:

```cmd
pnpm install
```

![Installation step](Photos/Pasted%20image%2020260218195546.png)

3- That's all! You have already installed the mod downloader! Now proceed to the usage guide!

# Usage

1- You will see that there is a file named `downloadQueue.xml` that's were you will write all the information about the mods you want to download, your version and loader it has this structure.

```xml

<downloadQueue loader="" version="" outputPath="" >
    <mods>

    </mods>
</downloadQueue>
```

`loader`: here you specify your mod loader (fabric, forge, quill, etc...).
`version`: here you specify your Minecraft version.
`outputPath`: here you put the path where you want the folders to store, it is by default in ./mods
`mods`: here you write the name of the mods you want to download, separate them with commas

# example

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

# !! Important !!

Even if the program uses the search version of the api to find similarities, please try to use the exact name of the mod (the one that appears in the urls).

![Mod name example](Photos/Pasted%20image%2020260218202752.png)

In this case it is `distantHorizons`,

or at least one similar.

# How to execute:

just write `pnpm run start` in your terminal and it will execute the program.

![Execution example](Photos/Pasted%20image%2020260218205031.png)

# That's it!! now you can easily download mods!


