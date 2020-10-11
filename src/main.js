import sketch from 'sketch'
import { CLRExporter } from './Exporters/CLRExporter'
// documentation: https://developer.sketchapp.com/reference/api/

import { ColorSetExporter } from './Exporters/ColorSetExporter'
import { ColorsXMLExporter } from './Exporters/ColorsXMLExporter'
import { JSONExporter } from './Exporters/JSONExporter'

export function exportAsColorSet(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new ColorSetExporter(swatches, doc.colorSpace)

  const manager = NSFileManager.defaultManager()
  const desktopURL = manager.URLsForDirectory_inDomains(NSDesktopDirectory, NSUserDomainMask)[0]

  exporter.exportAsFile(desktopURL)

  sketch.UI.message(`Exported at ${desktopURL} 🙌`)
}

export function exportAsColorXML(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new ColorsXMLExporter(swatches, doc.colorSpace)

  const manager = NSFileManager.defaultManager()
  const desktopURL = manager.URLsForDirectory_inDomains(NSDesktopDirectory, NSUserDomainMask)[0]

  exporter.exportAsFile(desktopURL)

  sketch.UI.message(`Exported at ${desktopURL} 🙌`)
}

export function exportAsJSON(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new JSONExporter(swatches, doc.colorSpace)

  const manager = NSFileManager.defaultManager()
  const desktopURL = manager.URLsForDirectory_inDomains(NSDesktopDirectory, NSUserDomainMask)[0]

  exporter.exportAsFile(desktopURL)

  sketch.UI.message(`Exported at ${desktopURL} 🙌`)
}

export function exportAsCLR(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new CLRExporter(swatches, doc.colorSpace)

  const manager = NSFileManager.defaultManager()
  const desktopURL = manager.URLsForDirectory_inDomains(NSDesktopDirectory, NSUserDomainMask)[0]

  exporter.exportAsFile(desktopURL)

  sketch.UI.message(`Exported at ${desktopURL} 🙌`)
}
