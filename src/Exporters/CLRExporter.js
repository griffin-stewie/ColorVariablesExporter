var Document = require('sketch/dom').Document

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

    nsColor() {
        let colorSpace = null;
        switch (this.colorSpace) {
            case Document.ColorSpace.sRGB:
                colorSpace = NSColorSpace.sRGBColorSpace()
            case Document.ColorSpace.P3:
                colorSpace = NSColorSpace.displayP3ColorSpace()
            default:
                colorSpace = NSColorSpace.sRGBColorSpace()
        }

        return this.swatch.sketchObject.color().NSColorWithColorSpace(colorSpace)
    }
}