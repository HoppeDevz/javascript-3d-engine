
## 🧊 JAVASCRIPT 3D ENGINE

Resolvi fazer este projeto para aprender um pouco mais sobre computação gráfica.
O mesmo consiste em desenvolver uma engine 3D do princípio (from scratch).

- Example Code:
```ts
const canvas = document.querySelector("#viewport") as any;

if (canvas) {

    const width = 1024;
    const height = 768;

    // Initializing...
    initialize(canvas.getContext('2d'), width, height);

    const scene = new Scene();

    const cubeColor = new Color(255, 0, 0, 255);
    const cubeMaterial = new Material(cubeColor);
    const cube = new Model(CubeVerteces, cubeMaterial);

    scene.addModel(cube);

    scene.render();

    // THIS CODE RENDERS THE ORANGE CUBE BELLOW //
}
```

- Result of Example Code:
<p align="center">
  <img src="https://s5.gifyu.com/images/msedge_pf2lcOa10A.gif" />
</p>