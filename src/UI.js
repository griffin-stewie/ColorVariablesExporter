export function showSaveFileDialog(defaultFileName) {
  const savePanel = NSSavePanel.savePanel()
  savePanel.setNameFieldStringValue(defaultFileName)
  savePanel.setAllowsOtherFileTypes(true)
  savePanel.setExtensionHidden(false)

  if (savePanel.runModal()) {
    return savePanel.URL()
  }

  return null
}

export function showSaveDirectoryDialog(params) {
  const panel = NSOpenPanel.openPanel()
  panel.prompt = "Export"
  panel.message = "Choose export directory"
  panel.canChooseFiles = false
  panel.canChooseDirectories = true
  panel.allowsMultipleSelection = false
  panel.canCreateDirectories = true

  if (panel.runModal()) {
    return panel.URL()
  }

  return null
}