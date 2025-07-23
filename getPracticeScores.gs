//  menu.addItem('Get Practice Scores', 'getPracticeScores').addToUi();
//  menu.addItem('Save Players', 'savePlayers').addToUi();

function savePlayers() {
  const api = PropertiesService.getScriptProperties().getProperty("apiKey");
  array = [];
  const range = SpreadsheetApp.getActiveRange().getValues();
  range.forEach((player, index) => {
    const url = `https://osu.ppy.sh/api/get_user?k=${api}&u=${player[0]}`;
    var userinfo = JSON.parse(UrlFetchApp.fetch(url));
    console.log(userinfo);
    array.push(userinfo[0].user_id);
  });
  let playerids = PropertiesService.getScriptProperties();
  playerids.setProperty("playerids", JSON.stringify(array));
  console.log(array);
}

function getPracticeScores() 
{
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var mpid;
  var playerids;
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt("Enter your mp ID:", ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.OK) {
    mpid = response.getResponseText();
    var props = PropertiesService.getScriptProperties();
    playerids = JSON.parse(props.getProperty("playerids"));  
    console.log(mpid);
    console.log(playerids);
  }

  const api = PropertiesService.getScriptProperties().getProperty("apiKey");
  const url = `https://osu.ppy.sh/api/get_match?k=${api}&mp=${mpid}`;
  var match = JSON.parse(UrlFetchApp.fetch(url));
  var beatmaps = []
  for(let i = 0; i < 27; i++)
  {
    beatmaps.push(sheet.getRange(9 + i * 3, 2).getValue());
  }
  match.games.forEach((game) => 
  {
    for(let i = 0; i < 27; i++)
    {
      if(game.beatmap_id == beatmaps[i])
      {
        game.scores.forEach((score) => 
        {
          // console.log(score);
          playerids.forEach((playerid, index2) => 
          {
            if(playerid == score.user_id)
            {
              for(let ii = 0; ii < 4; ii++)
              {
                const cell = sheet.getRange(10 + i * 3, 7 + 6 * index2 + ii);
                const val = cell.getValue();
                if(ii == 3 && val != "" && Number.isInteger(val))
                {
                  cell.setValue(Math.round((Number(val) + Number(score.score))/ 2));
                }
                else if(val == "")
                {
                  cell.setValue(score.score);
                  break;
                }
              }
            }
          });
        });
        break;
      }
    }
    
  });
  // console.log(match);
  
  ui.alert("Finished.");
}
