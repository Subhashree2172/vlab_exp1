var value_arr = [0,0,0,0,0,0,0]

// POPup question function
for (i = 0; i < document.querySelectorAll(".answer1").length; i++) {
  document.querySelectorAll(".answer1")[i].addEventListener("click", function() {
    var value = this.value;
    value_arr[0] = Number(value) ;
  });
}

for (i = 0; i < document.querySelectorAll(".answer2").length; i++) {
  document.querySelectorAll(".answer2")[i].addEventListener("click", function() {
    var value = this.value;
    value_arr[1] =Number(value) ;
  });
}
for (i = 0; i < document.querySelectorAll(".answer3").length; i++) {
  document.querySelectorAll(".answer3")[i].addEventListener("click", function() {
    var value = this.value;
    value_arr[2] = Number(value) ;
  });
}
for (i = 0; i < document.querySelectorAll(".answer4").length; i++) {
  document.querySelectorAll(".answer4")[i].addEventListener("click", function() {
    var value = this.value;
    value_arr[3] = Number(value) ;
  });
}
for (i = 0; i < document.querySelectorAll(".answer5").length; i++) {
  document.querySelectorAll(".answer5")[i].addEventListener("click", function() {
    var value = this.value;
    value_arr[4] = Number(value) ;
  });
}
for (i = 0; i < document.querySelectorAll(".answer6").length; i++) {
  document.querySelectorAll(".answer6")[i].addEventListener("click", function() {
    var value = this.value;
    value_arr[5] = Number(value) ;
  });
}
for (i = 0; i < document.querySelectorAll(".answer7").length; i++) {
  document.querySelectorAll(".answer7")[i].addEventListener("click", function() {
    var value = this.value;
    value_arr[6] = Number(value) ;
  });
}

function submit_it() {
  // alert(value_arr[0] + "value2"+value_arr[1]+ "value3"+value_arr[2]+ "value4"+value_arr[3]+ "value5"+value_arr[4])
   if(value_arr[0] === 1){
     document.getElementById("question_1").innerHTML = "Correct answer!";
   }else{
     document.getElementById("question_1").innerHTML = "Wrong answer! "+"  "+"Correct answer:b. through shift controls";
     document.getElementById("question_1").style.color = "red";
   }
   if(value_arr[1] === 1){
     document.getElementById("question_2").innerHTML = "Correct answer!";
   }else{
     document.getElementById("question_2").innerHTML = "Wrong answer! "+" "+"Correct answer:c. using peak to peak value";
     document.getElementById("question_2").style.color = "red";
   }
   if(value_arr[2] === 1){
     document.getElementById("question_3").innerHTML = "Correct answer!";
   }else{
     document.getElementById("question_3").innerHTML = "Wrong answer! "+"  "+"Correct answer:c. T = number of divisions occupied by 1 cycle×(time⁄division)";
     document.getElementById("question_3").style.color = "red";
   }
   if(value_arr[3] === 1){
     document.getElementById("question_4").innerHTML = "Correct answer!";
   }else{
     document.getElementById("question_4").innerHTML = "Wrong answer! "+"  "+"Correct answer:d. inversely proportional";
     document.getElementById("question_4").style.color = "red";
   }
   if(value_arr[4] === 1){
     document.getElementById("question_5").innerHTML = "Correct answer!";
   }else{
     document.getElementById("question_5").innerHTML = "Wrong answer! "+"  "+"Correct answer:a. True";
     document.getElementById("question_5").style.color = "red";
   }
   if(value_arr[5] === 1){
     document.getElementById("question_6").innerHTML = "Correct answer!";
   }else{
     document.getElementById("question_6").innerHTML = "Wrong answer! "+"  "+"Correct answer:b. False";
     document.getElementById("question_6").style.color = "red";
   }
   if(value_arr[6] === 1){
     document.getElementById("question_7").innerHTML = "Correct answer!";
   }else{
     document.getElementById("question_7").innerHTML = "Wrong answer! "+"  "+"Correct answer:a. 3";
     document.getElementById("question_7").style.color = "red";
   }
   document.getElementById("submit_button").disabled = true;
}
