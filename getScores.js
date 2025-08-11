function getScores(mp, team, range, ez) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const api = PropertiesService.getScriptProperties().getProperty("apiKey");
  const url = `https://osu.ppy.sh/api/get_match?k=${api}&mp=${mp}`;
  const ids = range[0];
  //console.log(ids);
  //console.log(url)
  let ezmult = 1.0;
  if(ez !== undefined && ez !== ""){ezmult = ez;};
  var match = JSON.parse(UrlFetchApp.fetch(url));
  let teamscore = 0;
  let nomatch = 1;
  let output = [[]];
  ids.forEach((id, i) => 
  {
    if(id == "")
    {
      output[0] = output[0].concat(null);
    }
    else{
    match.games.forEach((map, ii) => 
    {
      //console.log([map.beatmap_id, id]);
      if(map.beatmap_id == id)
      {
        nomatch = 0;
        if(map.scores.length !== 0)
        {
          map.scores.forEach((item, iii) => {
          if(item.team == team)
          {
            if(item.enabled_mods & 2)
            {
              teamscore = teamscore + Math.round(Number(item.score) * ezmult);
              console.log(ezmult);
              console.log(teamscore);
            }
            else
            {
              teamscore = teamscore + Number(item.score);
            }
          }
          });  
          output[0] = output[0].concat(teamscore);
          teamscore = 0;
        }
      }
      
    });
    if(nomatch)
    {
      output[0] = output[0].concat("-");
    }
    nomatch = 1;
    }
  });
  

 
  //console.log(output);
  return output;
}

function onOpen()
{
  const UI = SpreadsheetApp.getUi();
  const menu = UI.createMenu("Osu API")
  menu.addItem('Save Osu API Key', 'promptApi').addToUi();
  menu.addItem('Save Players', 'savePlayers').addToUi();
  menu.addItem('Get Practice Scores', 'getPracticeScores').addToUi();
  
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
