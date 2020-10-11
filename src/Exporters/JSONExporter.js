var Document = require('sketch/dom').Document

export class JSONExporter {
    constructor(swatches, colorSpace) {
        this.swatches = swatches;
        this.colorSpace = colorSpace
    }

    exportAsFile(url) {
        const manager = NSFileManager.defaultManager()

        let jsonRoot = {}
        this.swatches.forEach(swatch => {
            const wrapper = new SwatchWrapper(swatch, this.colorSpace)
            jsonRoot[wrapper.name()] = wrapper.colorComponents()
            // log(`🍣: ${swatch.name} => ${swatch.color}, ${this.colorSpace}, ${wrapper.contentsJSONString()}`)
        });

        const json = JSON.stringify(jsonRoot, null, 2)
        const path = url.path()
        const fileString = NSString.stringWithString(json)
        fileString.writeToFile_atomically_encoding_error(
            `${path}/colors.json`,
            true,
            NSUTF8StringEncoding,
            null
        )
    }
}

class SwatchWrapper {
    constructor(swatch, colorSpace) {
        this.swatch = swatch;
        this.colorSpace = colorSpace
    }

    name() {
        return this.swatch.name.trim()
    }

    color() {
        return this.swatch.sketchObject.color()
    }

    colorTag() {
        return `<color name="${this.name()}">${this.colorComponents()}</color>`
    }

    colorComponents() {
        const color = this.swatch.color.toUpperCase()
        // "#rrggbbaa" -> "#aarrggbb"
        return color
    }
}