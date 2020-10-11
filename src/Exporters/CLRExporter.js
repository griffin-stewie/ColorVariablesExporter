import { SwatchWrapper } from '../SwatchWrapper'

export class CLRExporter {
  constructor(swatches, colorSpace) {
    this.swatches = swatches;
    this.colorSpace = colorSpace
  }

  exportAsFile(url) {
    const colorList = NSColorList.alloc().initWithName("colors")
    this.swatches.forEach(swatch => {
      const wrapper = new SwatchWrapper(swatch, this.colorSpace)
      const color = wrapper.nsColor()
      colorList.setColor_forKey(color, wrapper.name())

      // log(`🍣: ${swatch.name} => ${swatch.color}, ${this.colorSpace}, ${wrapper.contentsJSONString()}`)
    });
    log(`🍣: ${colorList.name()}`)
    const fileName = `colors.clr`
    const destURL = url.URLByAppendingPathComponent(fileName)
    colorList.writeToURL_error(destURL, null)
  }
}