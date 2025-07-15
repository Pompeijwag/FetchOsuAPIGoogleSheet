function getScores(mp, team, range) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const api = PropertiesService.getScriptProperties().getProperty("apiKey");
  const url = `https://osu.ppy.sh/api/get_match?k=${api}&mp=${mp}`;
  const ids = range[0];
  console.log(ids);
  console.log(url)
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
      console.log([map.beatmap_id, id]);
      if(map.beatmap_id == id)
      {
        nomatch = 0;
        if(map.scores.length !== 0)
        {
          map.scores.forEach((item, iii) => {
          if(item.team == team)
          {
            teamscore = teamscore + Number(item.score);
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
  

 
  console.log(output);
  return output;
}

function getUser(user)
{
  const cell = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
  const api = PropertiesService.getScriptProperties().getProperty("apiKey");
  const url = `https://osu.ppy.sh/api/get_user?k=${api}&u=${user}`;
  var userinfo = JSON.parse(UrlFetchApp.fetch(url));
  console.log(userinfo);
  const id = userinfo[0].user_id;
  const output = `https://osu.ppy.sh/users/${id}`
  return output;

}

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
