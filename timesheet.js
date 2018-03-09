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
  var monthsWorked = "";
  var totalBilled = "";

  $("#submit-button").on("click", function(event){
    event.preventDefault();


    name = $("#name-input").val().trim();
    role = $("#role-input").val().trim();
    start = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    monthsWorked = ""
    monthRate = $("#rate-input").val().trim();
    totalBilled = ""

    
  
    database.ref().push({
        name: name,
        role: role,
        start: moment(start, "MM/DD/YY").format("X"),
        rate: monthRate
    });


  });

  database.ref().on("child_added", function (childSnapshot) {
      //  monthsWorked = exFunction(a, b)
    var newStart = moment(start).format("MMMM Do YYYY")
    $("#table-body").append("<tr>" + "<td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().role + "</td><td>" + childSnapshot.val().newStart +
    "</td><td>" + childSnapshot.val().monthsWorked + "</td><td>" + childSnapshot.val().rate + "</td><td>" + childSnapshot.val().totalBilled + "</td><?tr>");
  }, function (errorObject) {
    console.log("Errors handled: " +errorObject.code);
  });