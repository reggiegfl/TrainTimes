



$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxpAJGP0M63Rp73a7ZU_smIcp7lOA7A3E",
    authDomain: "train-times-cf93f.firebaseapp.com",
    databaseURL: "https://train-times-cf93f.firebaseio.com",
    projectId: "train-times-cf93f",
    storageBucket: "train-times-cf93f.appspot.com",
    messagingSenderId: "613750249340"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  //create click listener for #inputButton button

  $("#inputButton").on("click", function (event) {
    event.preventDefault();

    //create variables for name, destination, first train time, frequency
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTime = $("#firstTrainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    console.log(trainName, destination, firstTime, frequency);
    var train = {
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
    };
  console.log(train)
    //push to firebase so anyone can access
    database.ref().push(train);
  });
  //pull that information back from firebase
  database.ref().on("child_added", function(childsnapshot) {
    console.log(childsnapshot.val());
    var returnTrainName =childsnapshot.val().trainName;
    var returnDesination =childsnapshot.val().destination;
    var returnFirstTime =childsnapshot.val().firstTime;
    var returnFrequency =childsnapshot.val().frequency;
    var difference = moment(returnFirstTime, "hh:mm");

    // Current Time
    var current = moment();

    // Difference between the times
    var diffTime = current.diff(moment(difference), "minutes");

    // Time until next train
    var minutesLeft = diffTime % returnFrequency;

    // Minute(s) Until Train
    var minutesTillTrain = returnFrequency - minutesLeft;

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");



    //create variable to hold result of time left until next train function
    //var nextArrival = 
    //copmpare one time to another on moment js documentation and compre times and output to dom
    //var current = moment();
    //console.log(current);

    //var timePassed = current.diff(moment(returnFirstTime), "minutes");
    //populate table with values returned from firebase
    $("#dataTable").append(
      '<tr><td>' + returnTrainName + "</td>" +
      '<td>' + returnDesination + "</td>" +
      '<td>' + returnFrequency + "</td>" +
      '<td>' + returnFirstTime + "</td>" +
      '<td>' + catchTrain + "</td></tr>"
    )




  });
});




