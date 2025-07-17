function onOpen()
{
  const UI = SpreadsheetApp.getUi();
  UI.createMenu("Osu API").addItem('Save Osu API Key', 'promptApi').addToUi();
}

function promptApi()
{
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt("Enter your Osu API Key:", ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.OK) {
    PropertiesService.getScriptProperties().setProperty("apiKey", response.getResponseText());
    ui.alert("API key saved.");
    console.log(PropertiesService.getScriptProperties().getProperty("apiKey"));
  }
}
