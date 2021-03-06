import { SwatchWrapper } from '../SwatchWrapper'
import * as ui from '../UI';

export class ColorsXMLExporter {
  constructor(swatches, colorSpace) {
    this.swatches = swatches;
    this.colorSpace = colorSpace
  }

  exportAsFile() {
    const destinationURL = ui.showSaveFileDialog("colors.xml")

    if (destinationURL === null) {
      return
    }

    let colorTags = new Array()
    this.swatches.forEach(swatch => {
      const wrapper = new SwatchWrapper(swatch, this.colorSpace)
      colorTags.push(this.colorTag(wrapper))
      // log(`🍣: ${swatch.name} => ${swatch.color}, ${this.colorSpace}, ${wrapper.contentsJSONString()}`)
    });

    const xml = this.contentsXMLString(colorTags)
    const path = destinationURL.path()
    const fileString = NSString.stringWithString(xml)
    fileString.writeToFile_atomically_encoding_error(
      path,
      true,
      NSUTF8StringEncoding,
      null
    )
  }

  colorTag(wrapper) {
    return `<color name="${wrapper.snakeCasedName(true)}">${wrapper.hexARGBColor()}</color>`
  }

  contentsXMLString(colorTags) {
    const colorStrings = colorTags
      .map(a => `    ${a}`)
      .join("\n")
    return `
      <?xml version="1.0" encoding="utf-8"?>
<resources>
  <!-- generated by github.com/griffin-stewie/ColorVariablesExporter -->
${colorStrings}
</resources>
      `.trim()
  }
}

