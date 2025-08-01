
function getUser(user)
{
  const cell = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
  const api = PropertiesService.getScriptProperties().getProperty("apiKey");
  const url = `https://osu.ppy.sh/api/get_user?k=${api}&u=${user}`;
  var userinfo = JSON.parse(UrlFetchApp.fetch(url));
  console.log(userinfo);
  const id = userinfo[0].user_id;
  const flag = userinfo[0].country;
  const output = `https://osu.ppy.sh/users/${id}`;
  const flaglink = "https://osu.ppy.sh/images/flags/" + String(flag) + ".png";
  return [output, flaglink];

}

// function getActivePlayer()
// {
//   const cell = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
//   var row = cell.getRow();
//   var col = cell.getColumn();
//   var flagCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(row, col - 1);
//   var name = cell.getValue();
//   user = getUser(name);
//   var link = user[0];
//   var flaglink = user[1];
//   var formula = '=HYPERLINK("'  + link + '", "' + String(name) + '")';
//   var formulaflag = '=IMAGE("' + flaglink +  '",4, 15, 22 )';
//   console.log(formula);
//   console.log(formulaflag);
//   cell.setFormula(formula);
//   flagCell.setFormula(formulaflag);
// }

function getActivePlayer(e)
{
  const cell = e.range;
  var row = cell.getRow();
  var col = cell.getColumn();
  if(row >= 7 && col >= 15 && col <= 27 && col % 2 == 1)
  {
    var flagCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(row, col - 1);
    var name = cell.getValue();
    user = getUser(name);
    var link = user[0];
    var flaglink = user[1];
    var formula = '=HYPERLINK("'  + link + '", "' + String(name) + '")';
    var formulaflag = '=IMAGE("' + flaglink +  '",4 ,15 ,22)';
    console.log(formula);
    console.log(formulaflag);
    cell.setFormula(formula);
    flagCell.setFormula(formulaflag);
  }
  
}

