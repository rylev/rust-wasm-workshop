import init, { CPU, Joypad, Button } from './pkg/lib_gameboy_web.js';

async function main() {
  await init('./pkg/lib_gameboy_web_bg.wasm');
  console.log("Initialized..");
  const app = new Vue({
      el: '#container',
      data: {
      }
  })
}

let canvas
let canvasBuffer = new Uint8Array(144 * 160 * 4)
function getCanvas() {
  if (canvas) { return canvas }

  canvas = document.getElementById('screen').getContext('2d')
  return canvas
}
function drawCanvas(ctx, data) {
  if (!ctx) { return }
  const imageData = ctx.createImageData(160, 144)
  for (let i=0; i < data.length; i+=4) {
      imageData.data[i]   = data[i];   //red
      imageData.data[i+1] = data[i+1]; //green
      imageData.data[i+2] = data[i+2]; //blue
      imageData.data[i+3] = data[i+3]; //alpha
  }

  ctx.putImageData(imageData, 0, 0)
}

function joypad(callback) {
  function setButton(joypad, keyCode, to) {
    switch (keyCode) {
      case 39: joypad.setButton(Button.Right, to); break;
      case 37: joypad.setButton(Button.Left, to); break;
      case 38: joypad.setButton(Button.Up, to); break;
      case 40: joypad.setButton(Button.Down, to); break;
      case 90: joypad.setButton(Button.A, to); break;
      case 88: joypad.setButton(Button.B, to); break;
      case 32: joypad.setButton(Button.Select, to); break;
      case 13: joypad.setButton(Button.Start, to); break;
    }
  }

  window.onkeydown = (e) => {
    const joypad = new Joypad()
    setButton(joypad, e.keyCode, true)
    callback(joypad)
  }

  window.onkeyup = (e) => {
    const joypad = new Joypad()
    setButton(joypad, e.keyCode, false)
    callback(joypad)
  }
}

Vue.component('gameboy', {
    props: ['rom', 'bios'],
    template: `
    <div class="gameboy">
    <canvas height="144"
            width="160"
            id="screen" />
      <div class="controls">
        <div class="button play" @click="play">Play</div>
      </div>
    </div>
  `,
    methods: {
      play() {
        this.runFrame(0)
      },
      runFrame(previousTimeDiff) {
        setTimeout(() => {
          // this.joypad()
          const t1 = window.performance.now()
          let cyclesElapsed = 0
          while (cyclesElapsed < 69905) {
            cyclesElapsed += this.cpu.step()
          }
          const t2 = window.performance.now()
          let timeDiff = 16.7 - (t2 - t1)

          if (previousTimeDiff < 0) { timeDiff = timeDiff + previousTimeDiff }

          this.runFrame(timeDiff)
          this.cpu.copyCanvasToBuffer(canvasBuffer)
          drawCanvas(getCanvas(), canvasBuffer)
        }, Math.max(previousTimeDiff, 0))
      },

    },
    data() {
      const cpu = new CPU(this.bios, this.rom)
      joypad(joypad => cpu.setJoypad(joypad))
      return { cpu }
    }
})

Vue.component('romUploader', {
    props: ['label', 'romUploaded'],
    template: `
    <div>
      <div class="controls">
        <input v-bind:id="label"
               class="input"
               type="file" accept=".gb"
               @change="onChange" />
        <label class="button input-label" v-bind:htmlFor="label">
  {{this.label}}
        </label>
      </div>
    </div>
  `,
    methods: {
      onChange: function(e) {
        const input = e.currentTarget
        const file = input.files && input.files[0]
        if (!file) { return }
        const contents = new Blob([file])
        const arrayReader = new FileReader()
        arrayReader.readAsArrayBuffer(contents)
        arrayReader.onload = () => {
          const rom = new Uint8Array(arrayReader.result)
          this.romUploaded(rom)
        }
      }
    }
})

Vue.component('app', {
    template: `
    <div class="app">
      <div v-if="!bios || !rom" class="controls">
        <romUploader label="Bios" v-bind:romUploaded="uploadBios"></romUploader>
        <romUploader label="Rom" v-bind:romUploaded="uploadRom"></romUploader>
      </div>
      <gameboy v-else v-bind:bios="bios" v-bind:rom="rom" />
    </div>
  `,
    methods: {
      uploadBios(bios) {
        Vue.set(this, 'bios', bios)
      },
      uploadRom(rom) {
        Vue.set(this, 'rom', rom)
      }
    },
    data() {
      return {
        rom: undefined,
        bios: undefined
      }
    }
})

main();