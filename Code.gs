function doGet(request) {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate();
}

/* @Include JavaScript and CSS Files */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

/* @Process Form */
function processForm(formObject) {
  /* Change url below with your Google Sheet */
  var url = <<Enter url of Google Sheets to hold checkIn and checkOut data
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Data");
  var tz = ss.getSpreadsheetTimeZone();
  
  var d = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd @ hh:mm:ss.SSS'); 
  
  
 ws.appendRow([d,
                formObject.SchoolDL,
                formObject.idNum,
                formObject.last_name,
                formObject.first_name,
                formObject.Grade,
                formObject.retDeviceSN,
                formObject.DeviceType,
                formObject.retAdapter,
                formObject.issDeviceSN,
                formObject.issAdapter,
                formObject.notes]);
                
 // need admin credential
 // var arrCB = [formObject.email,formObject.issDeviceSN, ""];
 // updUserCBInfo(arrCB);
}


function getInfo(idNum) {
  /* Change url below with your Google Sheet */
  var url = <<Enter Google Sheets with Users Info (ID, Full Name, Last Name, First Name) >>
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("StudentData byId");
  var data = ws.getRange(1, 1, ws.getLastRow(), 7).getValues();
    
  var idList = data.map(function(r){ return r[0]; });
  var lastList = data.map(function(r){ return r[2]; });
  var firstList = data.map(function(r){ return r[3]; });
  var emailList = data.map(function(r){ return r[5]; });
  
  var position = idList.indexOf(idNum);
  
  if (position > -1) {
     var lfList = [lastList[position], firstList[position], emailList[position]];
     return lfList;
      // return lastList[position], lastlist;
      } else {
          return ['NotFound', 'NotFound', 'NotFound'];
      }
}


function getNumber(idName) {
  /* Change url below with your Google Sheet */
  var url = <<Enter Google Sheets with Users Info (Full Name, ID, Last Name, First Name) >>
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("StudentData byName");
  var data = ws.getRange(1, 1, ws.getLastRow(), 7).getValues();
  
  var flList = data.map(function(r){ return (r[0].toLowerCase()); });
  
  var idList = data.map(function(r){ return r[1]; });
  var ouList = data.map(function(r){ return r[4]; });
  var emailList = data.map(function(r){ return r[5]; });

  var loweridName=idName.toLowerCase();
  
  var cntr = 0;
  var ouPathList = [];
  
  while(index != -1){ 
    var index = flList.indexOf(loweridName, index);
    if (index != -1){
      ouPathList.push([idList[index],ouList[index],emailList[index]]);
      //Logger.log(ouPathList);
      cntr++;
      if (cntr == 1) {
        var position = index;
      }
      index++;

    }
  }
  
  Logger.log(ouPathList);
  Logger.log(ouPathList.length);
  
  if (position > -1) {
     if (cntr >= 2) {
       return ouPathList;
       // return ['Multiple Match'];
     } else { 
         //var foundId = idList[position];

         return ouPathList;
         // return foundId;

       }  
   } else {
       ouPathList.push(["NotFound","NotFound","NotFound"])
       return ouPathList;
   }
}

function updUserCBInfo(cbInfo) {
 
      var userID = cbInfo[0];
      var serialNum = cbInfo[1];
      var assetID = cbInfo[2];
       
    var opt = {"locations":[{
      "floorName" : assetID,
      "floorSection" : serialNum,
      "type" : "desk",
      "buildingId" : "",
      "area" : ""
      }]
    };
  
   var updates = AdminDirectory.Users.update(opt, userID);
  
}


