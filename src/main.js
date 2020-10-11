// documentation: https://developer.sketchapp.com/reference/api/
import sketch from 'sketch'

import { ColorSetExporter } from './Exporters/ColorSetExporter'
import { ColorsXMLExporter } from './Exporters/ColorsXMLExporter'
import { JSONExporter } from './Exporters/JSONExporter'
import { CLRExporter } from './Exporters/CLRExporter'

export function exportAsColorSet(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new ColorSetExporter(swatches, doc.colorSpace)
  exportByExporter(context, exporter)
}

export function exportAsColorXML(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new ColorsXMLExporter(swatches, doc.colorSpace)
  exportByExporter(context, exporter)
}

export function exportAsJSON(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new JSONExporter(swatches, doc.colorSpace)
  exportByExporter(context, exporter)
}

export function exportAsCLR(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new CLRExporter(swatches, doc.colorSpace)
  exportByExporter(context, exporter)
}

function exportByExporter(contxt, exporter) {

  const manager = NSFileManager.defaultManager()
  const desktopURL = manager.URLsForDirectory_inDomains(NSDesktopDirectory, NSUserDomainMask)[0]

  exporter.exportAsFile(desktopURL)

  sketch.UI.message(`Exported at ${desktopURL} 🙌`)
}