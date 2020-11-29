import { SwatchWrapper } from '../SwatchWrapper'

export class ColorSetExporter {
  constructor(swatches, colorSpace) {
    this.swatches = swatches;
    this.colorSpace = colorSpace
  }

  exportAsFile(url) {
    const manager = NSFileManager.defaultManager()
    const wrappers = this.swatches.map(swatch => {
      return new SwatchWrapper(swatch, this.colorSpace)
    })
    wrappers.forEach(wrapper => {
      const name = wrapper.snakeCasedName()
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

