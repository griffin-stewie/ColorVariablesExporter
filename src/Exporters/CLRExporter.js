import { SwatchWrapper } from '../SwatchWrapper'
import * as ui from '../UI';

export class CLRExporter {
  constructor(swatches, colorSpace) {
    this.swatches = swatches;
    this.colorSpace = colorSpace
  }

  exportAsFile() {
    const destinationURL = ui.showSaveFileDialog("colors.clr")

    if (destinationURL === null) {
      return
    }

    const colorList = NSColorList.alloc().initWithName("colors")
    this.swatches.forEach(swatch => {
      const wrapper = new SwatchWrapper(swatch, this.colorSpace)
      const color = wrapper.nsColor()
      colorList.setColor_forKey(color, wrapper.camelCasedName(true))

      // log(`🍣: ${swatch.name} => ${swatch.color}, ${this.colorSpace}, ${wrapper.contentsJSONString()}`)
    });
    log(`🍣: ${colorList.name()}`)
    colorList.writeToURL_error(destinationURL, null)
  }
}