var app = angular.module('mainApp', []);

var ndate = new Date();
var cm = ndate.getMonth();
var cd = ndate.getDate();
var change_event;
var change_month;
var change_name;
var un = "admin"


var table_iterator = function(arg_record, arg_cm, arg_passed, args_event) {
    $("#list-of-events table tbody tr").remove();
    $("#birth_anniv").text('');
    arg_cm_truc = arg_cm.substring(3,length);

    for (var i = 0; i < arg_record.length; i++) {
       
        var date = arg_record[i].date;
        var split_value = date.split('-');


        if (arg_passed == "update_month") {
            if (arg_cm_truc == split_value[1]) {
                $("#list-of-events table tbody")
                .append("<tr><td>" + arg_record[i].name + "</td><td>" + arg_record[i].date + "</td><td>" + arg_record[i].contact_no +  "</td><td>" + arg_record[i].whatsapp + "</td><td>" + arg_record[i].email  + "</td><td>" + arg_record[i].event + "</td></tr>");
            }
            if (arg_cm_truc == split_value[1]) {
                if (cd == split_value[0]) {
                    $("#birth_anniv").append("<div>Hi, Today is <span>" + arg_record[i].event + "</span> of <span>" + arg_record[i].name + "</span></div>")
                }
            }

        }

        if(arg_passed == "name_change"){
            if(args_event ==  arg_record[i].name){
                 $("#list-of-events table tbody")
                   .append("<tr><td>" + arg_record[i].name + "</td><td>" + arg_record[i].date + "</td><td>" + arg_record[i].contact_no +  "</td><td>" + arg_record[i].whatsapp + "</td><td>" + arg_record[i].email  + "</td><td>" + arg_record[i].event + "</td></tr>");
            }
        }


        if (arg_passed == "normal") {
               
            if (arg_cm_truc == split_value[1]) {
                $("#list-of-events table tbody")
                 .append("<tr><td>" + arg_record[i].name + "</td><td>" + arg_record[i].date + "</td><td>" + arg_record[i].contact_no +  "</td><td>" + arg_record[i].whatsapp + "</td><td>" + arg_record[i].email  + "</td><td>" + arg_record[i].event + "</td></tr>");
            }
            if (arg_cm_truc == split_value[1]) {
                if (cd == split_value[0]) {
                    $("#birth_anniv").append("<div>Hi, Today is <span>" + arg_record[i].event + "</span> of &nbsp<span>" + arg_record[i].name + "</span></div>");
                }
            }
        }

        if (arg_passed == "event_month") {
            console.log("Passed : " + args_event)
            if (args_event == 'Birthday') {
                if (arg_record[i].event == 'birthday') {
                    $("#list-of-events table tbody")
                     .append("<tr><td>" + arg_record[i].name + "</td><td>" + arg_record[i].date + "</td><td>" + arg_record[i].contact_no +  "</td><td>" + arg_record[i].whatsapp + "</td><td>" + arg_record[i].email  + "</td><td>" + arg_record[i].event + "</td></tr>");
                }
              if (arg_cm_truc == split_value[1]) {
                if (cd == split_value[0]) {
                    $(".todays_birthday").show();
                        $("#birth_anniv").append("<div>Hi, Today is <span>" + arg_record[i].event + "</span> of <span>" + arg_record[i].name + "</span></div>")
                    }
                }
            }
            if (args_event == 'Anniversary') {
                if (arg_record[i].event == 'anniversary') {
                    $("#list-of-events table tbody")
                    .append("<tr><td>" + arg_record[i].name + "</td><td>" + arg_record[i].date + "</td><td>" + "</td><td></td><td></td><td>" + arg_record[i].event + "</td></tr>");
                }
                if (arg_cm_truc == split_value[1]) {
                    if (cd == split_value[0]) {
                        $("#birth_anniv").append("<div>Hi, Today is <span>" + arg_record[i].event + "</span> of <span>" + arg_record[i].name + "</span></div>")
                    }
                }
            }
        }
    }
}


var func = function(arg_record, arg_cm, args_event, element) {
    switch (element) {
        case "update_month":
            table_iterator(arg_record, arg_cm, "update_month");
            break;

        case "event_updated":
            table_iterator(arg_record, arg_cm, "event_month", args_event);
            break;

        case "common_start":
            table_iterator(arg_record, arg_cm, "normal");
            break;

        case "change_by_name":
            table_iterator(arg_record, arg_cm, "name_change", args_event);
            break;        
    }
}

app.service('myservice', function() {
    this.update = function() {
        var event_change = $("#events").val();
        change_event = event_change;
        return event_change;
    }
    this.change_month = function() {
        var event_month = $("#month_change").val();
        change_month = event_month;
        return event_month;
    }
    this.change_name = function() {
        var new_name = $("#name_change").val();
        change_name = new_name;
        return new_name;
    }
});

app.controller('loginController', function($scope) {
    $(".main-container, .header-section").hide();
    $scope.pass = "pw_vansh";
    $scope.click_me = function(){
        if($scope.username == "admin" && $scope.password == $scope.pass ){
            $(".blocker").hide();
            $(".main-container, .header-section").show();
        }
        else{
         $("#error-msg").html('Login failed, Please Try Again !')  
        }
        
    }

});


app.controller('mainController', function($scope, myservice, $http) {

    $scope.options = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    $http.get('js/birthday_object.json')
    .success(function(response) {  // Common
        $scope.users = response.Records
        $("#current_month").html($scope.options[cm]);
        func($scope.users, $scope.options[cm], "birthday", "common_start");
    });

    $scope.update = (function() { //Update Event
        var change_event_update = myservice.update();
        $("#month_event_name").html(change_event_update);
        func($scope.users, $scope.options[cm], change_event_update, "event_updated");
    });

    $scope.change_month = (function() { //Update Month
        $("#current_month").html($scope.options[myservice.change_month()]);
        func($scope.users, $scope.options[myservice.change_month()], "birthday", "update_month");
    });

    $scope.change_name = (function(){ // Change Name
       var updated_name = myservice.change_name();
       func($scope.users,$scope.options[cm],updated_name,"change_by_name"); 
    });
});

// /*Providers*/
// app.provider('dateProvider',function(){
//  return{
//      $get : function(){
//          return{
//              showDate : function(){
//                  var showTime = new Date();
//                  if(showTime.getHours() > 5 && showTime.getHours() < 12){
//                      return "Good morning,because its "+showTime.getHours()
//                  }
//                  else if(showTime.getHours() > 12 && showTime.getHours() < 16){
//                      return "Good Afternoon,because its "+showTime.getHours()
//                  }
//                  else if(showTime.getHours() > 16 && showTime.getHours() < 21){
//                      return "Good Evening,because its "+showTime.getHours()
//                  }
//                  else{
//                      return "Good Night,because its "+showTime.getHours()    
//                  }
//              }
//          }
//      }
//  }
// });