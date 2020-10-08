import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

import { ColorSetExporter } from './ColorSetExporter'

export function exportAsColorSet(context) {
  const doc = sketch.getSelectedDocument()
  const swatches = doc.swatches
  const exporter = new ColorSetExporter(swatches, doc.colorSpace)

  const manager = NSFileManager.defaultManager()
  const desktopURL = manager.URLsForDirectory_inDomains(NSDesktopDirectory, NSUserDomainMask)[0]

  exporter.exportAsFile(desktopURL)

  sketch.UI.message(`Exported at ${desktopURL} 🙌`)
}
