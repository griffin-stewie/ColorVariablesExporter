import { SwatchWrapper } from '../SwatchWrapper'
import * as ui from '../UI';

export class JSONExporter {
  constructor(swatches, colorSpace) {
    this.swatches = swatches;
    this.colorSpace = colorSpace
  }

  exportAsFile() {
    const destinationURL = ui.showSaveFileDialog("colors.json")

    if (destinationURL === null) {
      return
    }

    let jsonRoot = {}
    this.swatches.forEach(swatch => {
      const wrapper = new SwatchWrapper(swatch, this.colorSpace)
      jsonRoot[wrapper.name()] = wrapper.hexRGBAColor()
      // log(`🍣: ${swatch.name} => ${swatch.color}, ${this.colorSpace}, ${wrapper.contentsJSONString()}`)
    });

    const json = JSON.stringify(jsonRoot, null, 2)
    const path = destinationURL.path()
    const fileString = NSString.stringWithString(json)
    fileString.writeToFile_atomically_encoding_error(
      path,
      true,
      NSUTF8StringEncoding,
      null
    )
  }
}

