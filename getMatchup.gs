function getMatchup() {
  const cell = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
  const row = cell.getRow();
  const col = cell.getColumn();
  const namecell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(row - 1, 4);
  const scorecell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(row + 1, col);
  const mpcell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(row + 2, col);
  const warmups = scorecell.getValue();
  const myname = namecell.getValue();
  var teamplay = true;
  var team = 2;
  if(myname == "Pompeijwag")
  {
    teamplay = false;
  }
  const mp = cell.getValue();
  const link = "https://osu.ppy.sh/community/matches/" + mp;
  var mpformula = '=HYPERLINK("'  + link + '", "' + "mp" + '")';
  console.log(mp);
  const api = PropertiesService.getScriptProperties().getProperty("apiKey");
  const url = `https://osu.ppy.sh/api/get_match?k=${api}&mp=${mp}`;
  var match = JSON.parse(UrlFetchApp.fetch(url));
  var teams = match.match.name.match(/\([^)]+\)/g)
  teams = teams.map(m => m.substring(1, m.length - 1));
  if(teams[0] == myname)
  {
    cell.setValue("vs " + teams[1]);
  }
  else 
  {
    cell.setValue("vs " + teams[0]);
    team = 1;
  }
  var wins = 0;
  var losses = 0;
  match.games.forEach((map, index) => 
  { 
    if(index >= warmups)
    {
      var villian = 0;
      var hero = 0;
      if(teamplay)
      {
        map.scores.forEach(score => 
        {
          if(score.team == team)
          {
            hero = Number(hero) + Number(score.score);
          }
          else
          {
            villian = Number(villian) + Number(score.score);
          }
        });
      }
      else
      {
        map.scores.forEach(score => 
        {
          if(score.user_id == "9315589")
          {
            hero = score.score;
          }
          else
          {
            villian = score.score;
          }
        });
      }
      if(Number(hero) > Number(villian))
      {
        wins++;
      }
      else if(Number(villian) > Number(hero))
      {
        losses++;
      }
      console.log([hero, villian]);
      console.log(wins);
    }
    
  });
  var scoreline = wins + " - " + losses;
  mpcell.setFormula(mpformula);
  mpcell.setFontColor("#6fa8dc");
  if(Number(wins) < Number(losses))
  {
    scorecell.setFontColor("#ea4335");
  }
  else
  {
    scorecell.setFontColor("Lime");
  }
  scorecell.setValue(scoreline);
  console.log(teams)
}
