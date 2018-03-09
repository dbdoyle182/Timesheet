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
  start = moment($("#start-input").val().trim(), "MM/DD/YY").format("X");
  monthsWorked = "";
  monthRate = $("#rate-input").val().trim();
  totalBilled = "";

  database.ref().push({
    name: name,
    role: role,
    start: start,
    rate: monthRate
  });

  $("#name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
  //  monthsWorked = exFunction(a, b)
  var start = childSnapshot.val().start  
  var rate = childSnapshot.val().rate;
  var name = childSnapshot.val().name;
  var role = childSnapshot.val().role;
  var newStart = moment.unix(start).format("MM/DD/YY");
  var monthsWorked = moment().diff(moment.unix(start, "X"), "months");
  var totalBilled = monthsWorked * rate;

  $("#table-body").append("<tr>" + "<td>" + name + "</td><td>" + role + "</td><td>" + newStart +
  "</td><td>" + monthsWorked + "</td><td>" + rate + "</td><td>" + totalBilled + "</td><tr>");
  }, function (errorObject) {
  console.log("Errors handled: " +errorObject.code);
  });