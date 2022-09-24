
## 🧊 JAVASCRIPT 3D ENGINE

Resolvi fazer este projeto para aprender um pouco mais sobre computação gráfica.
O mesmo consiste em desenvolver uma engine 3D do princípio (from scratch).

- Example:
```ts
const canvas = document.querySelector("#viewport") as any;

if (canvas) {

    const width = 1024;
    const height = 768;

    // Initializing...
    initialize(canvas.getContext('2d'), width, height);

    const myScene = new Scene();
    const myCube = new Model(CubeVerteces);

    cube.lineColor = "orange";

    scene.addModel(cube);
    scene.render();

    // THIS CODE RENDERS THE ORANGE CUBE BELLOW //
}
```

<p align="center">
  <img src="https://s4.gifyu.com/images/msedge_Mv59zzm3v3.gif" />
</p>