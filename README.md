# ColorVariablesExporter

## Installation

- [Download](../../releases/latest/download/colorvariablesexporter.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on colorvariablesexporter.sketchplugin

## How it works

1. Add some Color Variables
2. Select export menu from `Plugins > Color Variables Exporter`
    - `Export as ColorSet`
    - `Export as Swift UIColor Extension using ColorSet`
    - `Export as color.xml`
    - `Export as JSON`
    - `Export as CLR`
3. Choose a destination where you want to save

### Export file types

#### `Export as ColorSet`

This format is for Apple platform apps developers such as iOS, macOS etc. It exports Color Set directories for Xcode. It useful for developers which prefer use Storyboards and xib files and developing UI by programatically.

#### `Export as Swift UIColor Extension using ColorSet`

This formt is for Apple platform apps developers as well. Especially developers which develop UI by code. You need to export ColorSet as well to take advantage of this format.

#### `Export as color.xml`

This format is for Android apps developers.

#### `Export as JSON`

This format is for scripting purpose. Using this JSON, you can generate codes, CSV or what ever you want.

#### `Export as CLR`

This generates [CLR file](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/DrawColor/Concepts/AboutColorLists.html). You can copy this file at `~/Library/Colors` then you can see your colors inside macOS native Color Picker UI.

## Samples

[Donwload](https://github.com/griffin-stewie/ColorVariablesExporter/releases/download/v0.2.0/samples.zip) sample files.

## Credits

- [griffin-stewie](https://griffin-stewie.github.io/): Developer
- [Poem](https://dribbble.com/poem_f): Icon Designer
- Special thanks to [ment\-mx/Prism](https://github.com/ment-mx/Prism)