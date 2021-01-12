import { SwatchWrapper } from '../SwatchWrapper'
import * as ui from '../UI';

export class ColorSetExporter {
  constructor(swatches, colorSpace) {
    this.swatches = swatches;
    this.colorSpace = colorSpace
  }

  exportAsFile() {
    const destinationURL = ui.showSaveDirectoryDialog()

    if (destinationURL === null) {
      return
    }

    const manager = NSFileManager.defaultManager()
    const wrappers = this.swatches.map(swatch => {
      return new SwatchWrapper(swatch, this.colorSpace)
    })
    wrappers.forEach(wrapper => {
      const name = wrapper.snakeCasedName()
      const fileName = `${name}.colorset`
      const colorsetURL = destinationURL.URLByAppendingPathComponent(fileName)
      manager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(
        colorsetURL.path(),
        true,
        null,
        null
      )
      const path = colorsetURL.path()
      const fileString = NSString.stringWithString(this.contentsJSONString(wrapper))
      fileString.writeToFile_atomically_encoding_error(
        `${path}/Contents.json`,
        true,
        NSUTF8StringEncoding,
        null
      )

      // log(`🍣: ${swatch.name} => ${swatch.color}, ${this.colorSpace}, ${wrapper.contentsJSONString()}`)
    });
  }

  contentsJSONString(wrapper) {
    return JSON.stringify(this.contentsJSON(wrapper), null, 2)
  }

  contentsJSON(wrapper) {
    const c = this.colorObject(wrapper)
    return {
      colors: [c],
      info: {
        author: "github.com/griffin-stewie/ColorVariablesExporter",
        version: 1
      }
    }
  }

  colorObject(wrapper) {
    const color = {
      "color-space": wrapper.colorSpaceString(),
      components: this.colorComponents(wrapper)
    }
    return {
      color: color,
      idiom: "universal"
    }
  }

  colorComponents(wrapper) {
    const hex = wrapper.hexRGBColor()
    return {
      alpha: wrapper.color().alpha().toFixed(3),
      blue: "0x" + hex.slice(5, 7),
      green: "0x" + hex.slice(3, 5),
      red: "0x" + hex.slice(1, 3),
    }
  }
}

