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

