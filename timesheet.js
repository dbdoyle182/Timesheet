  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2Us3l2Xt4FD7M8AorSeZooz_2BhWKepg",
    authDomain: "timesheet-62ce4.firebaseapp.com",
    databaseURL: "https://timesheet-62ce4.firebaseio.com",
    projectId: "timesheet-62ce4",
    storageBucket: "timesheet-62ce4.appspot.com",
    messagingSenderId: "382375287681"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var name = "";
  var role = "";
  var start = "";
  var monthRate = "";

  $("#submit-button").on("click", function(event){
    event.preventDefault();


    name = $("#name-input").val().trim();
    role = $("#role-input").val().trim();
    start = $("#start-input").val().trim();
    monthRate = $("#rate-input").val().trim();
  
  
    database.ref().push({
        name: name,
        role: role,
        start: start,
        rate: monthRate
    });

    var newRow = $("<tr>");
    var nameTd = $("<td>").text(name);
    var roleTd = $("<td>").text(role);
    var startTd = $("<td>").text(start);
    var monthsWorked = $("<td>").text("Test");
    var rateTd = $("<td>").text(monthRate);
    var totalBilled = $("<td>").text("Test")
    newRow.append(nameTd, roleTd, startTd, rateTd);
    $("#table-body").append(newRow);

  });

  database.ref().on("child_added", function (childSnapshot) {

    $("#table-body").append("<tr>" + "<td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().role + "</td><td>" + childSnapshot.val().start +
    "</td><td>" + childSnapshot.val().monthsWorked + "</td><td>" + childSnapshot.val().rate + "</td><td>" + childSnapshot.val().totalBilled + "</td><?tr>");
  }, function (errorObject) {
    console.log("Errors handled: " +errorObject.code);
  });