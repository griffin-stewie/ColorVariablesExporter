var Document = require('sketch/dom').Document

export class ColorSetExporter {
  constructor(swatches, colorSpace) {
    this.swatches = swatches;
    this.colorSpace = colorSpace
  }

  exportAsFile(url) {
    const manager = NSFileManager.defaultManager()
    this.swatches.forEach(swatch => {
      const wrapper = new SwatchWrapper(swatch, this.colorSpace)
      const name = swatch.name.toLowerCase().trim().split(" ").join("_")
      const fileName = `${name}.colorset`
      const colorsetURL = url.URLByAppendingPathComponent(fileName)
      manager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(
        colorsetURL.path(),
        true,
        null,
        null
      )
      const path = colorsetURL.path()
      const fileString = NSString.stringWithString(wrapper.contentsJSONString())
      fileString.writeToFile_atomically_encoding_error(
        `${path}/Contents.json`,
        true,
        NSUTF8StringEncoding,
        null
      )

      // log(`🍣: ${swatch.name} => ${swatch.color}, ${this.colorSpace}, ${wrapper.contentsJSONString()}`)
    });
  }
}

class SwatchWrapper {
  constructor(swatch, colorSpace) {
    this.swatch = swatch;
    this.colorSpace = colorSpace
  }

  color() {
    return this.swatch.sketchObject.color()
  }

  colorSpaceString() {
    switch (this.colorSpace) {
      case Document.ColorSpace.sRGB:
        return "srgb";
      case Document.ColorSpace.P3:
        return "display-p3";
      default:
        return "hoge";
    }
  }

  contentsJSONString() {
    return JSON.stringify(this.contentsJSON(), null, 2)
  }

  contentsJSON() {
    const c = this.colorObject()
    return {
      colors: [c],
      info: {
        author: "github.com/griffin-stewie/ColorVariablesExporter",
        version: 1
      }
    }
  }

  colorObject() {
    const color = {
      "color-space": this.colorSpaceString(),
      components: this.colorComponents()
    }
    return {
      color: color,
      idiom: "universal"
    }
  }

  colorComponents() {
    const color = this.color()
    return {
      alpha: color.alpha().toFixed(3),
      blue: color.blue().toFixed(3),
      green: color.green().toFixed(3),
      red: color.red().toFixed(3),
    }
  }
}