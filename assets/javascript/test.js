/Data for New Child in Database
   var addedTrainName = snapshot.val().trainName;//Newly Added Train Name
   var addedDestination = snapshot.val().destination;//Newly Added Destination
   var addedFrequency = snapshot.val().frequency; //Newly Added Frequency
   var addedFirstTrainTime = snapshot.val().firstTrainTime;//Newly Added Train Time


   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(addedFirstTrainTime, "HH:mm").subtract(1, "years");
   // console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
   // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   // console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % addedFrequency;
   // console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = addedFrequency - tRemainder;
   // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));