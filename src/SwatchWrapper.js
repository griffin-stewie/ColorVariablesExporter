var Document = require('sketch/dom').Document
import * as changeCase from "change-case";

export class SwatchWrapper {
    constructor(swatch, colorSpace) {
        this.swatch = swatch;
        this.colorSpace = colorSpace
    }

    name() {
        return this.swatch.name.trim()
    }

    snakeCasedName(dropLeadingNumber) {
        let name = this.swatch.name.trim()
        if (dropLeadingNumber) {
            name = name.replace(/^([0-9]+?)/gi, "")
        }
        return changeCase.snakeCase(name)
    }

    camelCasedName(dropLeadingNumber) {
        let name = this.swatch.name.trim()
        if (dropLeadingNumber) {
            name = name.replace(/^([0-9]+?)/gi, "")
        }
        return changeCase.camelCase(name)
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
                colorSpace = NSColorSpace.displayP3ColorSpace()
        }

        return this.color().NSColorWithColorSpace(colorSpace)
    }

    hexRGBColor() {
        return this.swatch.color.toUpperCase().slice(0, 7)
    }

    hexRGBAColor() {
        return this.swatch.color.toUpperCase()
    }

    hexARGBColor() {
        const color = this.hexRGBAColor()
        // "#rrggbbaa" -> "#aarrggbb"
        return `#${color.slice(7, color.length)}${color.slice(1, 7)}`
    }

    alphaValue() {
        return this.color().alpha()
    }

    colorSpaceString() {
        switch (this.colorSpace) {
            case Document.ColorSpace.sRGB:
                return "srgb";
            case Document.ColorSpace.P3:
                return "display-p3";
            default:
                return "display-p3";
        }
    }
}
