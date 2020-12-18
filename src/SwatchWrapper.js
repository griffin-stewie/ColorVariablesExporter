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
                colorSpace = NSColorSpace.sRGBColorSpace()
        }

        return this.color().NSColorWithColorSpace(colorSpace)
    }

    hexRGBColor() {
        return this.swatch.color.toUpperCase().slice(0,7)
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

    colorTag() {
        return `<color name="${this.snakeCasedName(true)}">${this.hexARGBColor()}</color>`
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
