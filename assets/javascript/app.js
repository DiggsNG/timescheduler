// Initialize Firebase
var config = {
   
    apiKey: "AIzaSyD6yWdBfuwxawsuXAT5qTNMEPajNb0Gj5c",
    authDomain: "timeapp-d3159.firebaseapp.com",
    databaseURL: "https://timeapp-d3159.firebaseio.com",
    projectId: "timeapp-d3159",
    storageBucket: "timeapp-d3159.appspot.com",
    messagingSenderId: "575169622243"

  };

firebase.initializeApp(config);

var database = firebase.database();



// Capture Button Click
$("#click-button").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    var trainName = $("#trainName").val().trim();
    var destiNation = $("#destiNation").val().trim();
    var Freq = $("#Freq").val().trim();
    var firsttrain = $("#firsttrain").val().trim();
    // var minutesAway = $("#minutesAway").val().trim();

    //Initiate Time calculations
    // timetoGather();

    // Code for "Setting values in the database"
    database.ref().push({
        trainName: trainName,
        destiNation: destiNation,
        Freq: Freq,
        firsttrain: firsttrain,
       // minutesAway: tMinutesTillTrain,
    });

   
    //Clear Input Fields
    $("#trainName").val("");
    $("#destiNation").val("");
    $("#Freq").val("");
    $("#firsttrain").val("");
    
    
});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
     
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destiNation);
    console.log(snapshot.val().Freq);
    console.log(snapshot.val().firsttrain);
   // console.log(snapshot.val().nextArrival);

     
    //Data for New Child in Database
     var addedTrainname = snapshot.val().trainName;        //Newly Added Train names
     var addedDestination = snapshot.val().destiNation;        //Newly Added train destination
     var addedFreq = snapshot.val().Freq;   //Newly Added train frequency of travel
     var addedfirsttrain = snapshot.val().firsttrain; //Newly Added train next arrival
     //var addedminutesAway = snapshot.val().minutesAway; //Newly Added train minutes away
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(addedfirsttrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log(firstTimeConverted);
    // Time apart (remainder)
    var tRemainder = diffTime % addedFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = addedFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
    
    
    //New Row in the Output Table
    var newRow=$("<tr>");

    //Append Each Piece of Data to Row in Same Order as the Table Headers in HTML File
    $(newRow).append("<td>"+addedTrainname+"</td>");
    $(newRow).append("<td>"+addedDestination+"</td>");
    $(newRow).append("<td>"+addedFreq+"</td>");
    $(newRow).append("<td>"+moment(nextTrain).format("hh:mm A")+"</td>");//Net Arrival
    $(newRow).append("<td>"+tMinutesTillTrain+"</td>");
    
    //Append New Row to Table Body
    $("#timeTableRows").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
