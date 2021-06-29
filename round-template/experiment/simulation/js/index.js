var canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 500;
//to create 2d graphics------------------------------------------------
var c = canvas.getContext('2d');
// ----------------------------------------------------------------------
//Initiating the global values
var frequency = Number(5)// var time_period = Number(5);
var y_pos = Number(0);
var amp = Number(30);
var x_pos = Number(0);
var count = 1; //INITIALISING cro_BUTTON COUNT
var xycount = 1; ///INITIALISING XY toggle BUTTON COUNT
var focus_count = 1; ///INITIALISING focus toggle BUTTON COUNT
var count_fg = 0; ///INITIALISING FG  toggle BUTTON COUNT
var on = 0; // cro on state
var xy_on = 0; // xy on state
var focus = 0; //focus on state
var on_fg = 0; //Function generator on state
var signal_no = 1;
var connect = 0; //Connect button click count
var tour_on = 0; //tour button click count
var dialog;
var dialog_out;
var y_div = 1;
var x_div = 0.001;
const pi = 3.14;
var quest_no = 0;
var peak_value = 0;
var avg_value = 0;
var q1_count = 0; //for question to be asked once this feature is added
var q2_count = 0;
var q3_count = 0;
var q4_count = 0;
var q5_count = 0;
var tour_check  = 0;
// plotAxes();-----------------------------------------------------
function plotAxes() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = "black";
  //vertical line and y-axis markings
  for (var i = 0; i < 2000; i = i + 50) {
    c.beginPath();
    c.moveTo(i, 0);
    c.lineTo(i, 600);
    c.stroke();
    if (i == 500) {
      for (var j = 0; j < canvas.height; j = j + 10) {
        c.beginPath();
        c.moveTo(canvas.width / 2 - 8, j);
        c.lineTo(canvas.width / 2 + 8, j);
        c.stroke();
      }
    }
  }
  //Horizontal line and x-axis markings
  for (var i = 0; i < 1000; i = i + 50) {
    c.beginPath();
    c.moveTo(0, i);
    c.lineTo(1500, i);
    c.stroke();
    if (i == 250) {
      for (var j = 0; j < canvas.width; j = j + 10) {
        c.beginPath();
        c.moveTo(j, canvas.height / 2 - 8);
        c.lineTo(j, canvas.height / 2 + 8);
        c.stroke();
      }
    }
  }
}
//Creating Signals waves--------------------------------------------------------
function plotfunc() {
  plotAxes();
  c.strokeStyle = "blue";
  c.beginPath();
  var y = (canvas.height / 2);
  c.moveTo(x_pos, y);
  for (i = x_pos; i < 2000; i++) {
    if (signal_no == 1) { //Sine wave
      y = ((canvas.height / 2) + ((Math.sin(((i) - x_pos) * frequency * x_div * 6.4)) * (-amp) * (y_div)) - (y_pos * 1));
    } else if (signal_no == 2) { //Cos wave
      y = ((canvas.height / 2) + ((Math.cos(((i) - x_pos) * frequency * x_div * 6.4)) * (-amp) * (y_div)) - (y_pos * 1));
    } else if (signal_no == 3) { //Sawtooth signal
      y = ((canvas.height / 2) + ((-2 * amp * y_div) / pi) * (Math.atan((1 / (Math.tan(pi * (i - x_pos) * (frequency) * x_div))))) - (y_pos * 1));
    } else if (signal_no == 4) { //triangle signal
      y = ((canvas.height / 2) + ((2 * (-amp * y_div)) / pi) * (Math.acos(((Math.cos(pi * (i - x_pos) * (2 * frequency) * x_div))))) - (y_pos * 1));
    } else if (signal_no == 5) { //Sqaure wave
      y = ((canvas.height / 2) + Math.sign(((Math.sin(2 * pi * (i - x_pos) * 1.03 * frequency * x_div)) * (amp) * y_div)) * (amp * y_div * 1) - (y_pos * 1));
    }
    c.lineTo(i, y);
  }
  c.stroke();
}

function plot_condn() {
  if (on == 1 && on_fg == 1 && connect == 1) {
    result();
    if (xy_on == 1 && focus == 0) {
      window.requestAnimationFrame(plotLine);
    } else if (focus == 1 && xy_on == 0 && on_fg == 1) {
      window.requestAnimationFrame(plot_focus);
    } else if (focus == 0 && xy_on == 0) {
      window.requestAnimationFrame(plotfunc);
    }
  } else if (on == 1) {
    window.requestAnimationFrame(plotAxes);
  }
}
// CRO  PARAMETERS----------------------------------------
//Time period-------------------------------------------------------------------
function timeperiod() {
  if (on == 1 && on_fg == 1) {
    time_period = Number(document.getElementById("time_division").value);
    x_div = time_period;
    plot_condn();
  }
  if (tour_on == 8) { //For demo purpose
    dialog.close();
    dialog = document.getElementById('yposition_cro_demo');
    dialog.show();
    tour_on = 9;
  }
}
// // Position of Y changing----------------------------------------------------
function yposition() {
  if (on == 1 && on_fg == 1) {
    y_pos = Number(document.getElementById("yposition").value);
    plot_condn();
  }
  if (tour_on == 9) { //For demo purpose
    dialog.close();
    dialog = document.getElementById('ydivision_cro_demo');
    dialog.show();
    tour_on = 10;
  }
}
// //Position of X-Axis---------------------------------------------------------
function xposition() {
  if (on == 1 && on_fg == 1) {
    x_pos = Number(document.getElementById("xposition").value);
    plot_condn();
  }
  if (tour_on == 7 ){  //For demo purpose
    dialog.close();
    dialog = document.getElementById('xdivision_cro_demo');
    dialog.show();
    tour_on = 8;
  }
}
//Changing the amplitude-----------------------------------------------------
function ydivision() {
  if (on == 1 && on_fg == 1) {
    y_div = 1 / Number(document.getElementById("ydivision_input").value);
    plot_condn();
  }
  if (tour_on == 10){ //For demo purpose
    dialog.close();
    dialog = document.getElementById('xy_cro_demo');
    dialog.show();
    tour_on = 11;
  }
}
//ON/OFF switch--------------------------------------------------
function on_off_cro() {
  if (tour_on == 2) { //For demo purpose
    dialog.close();
    dialog = document.getElementById('onoff_fg_demo');
    dialog.show();
    tour_on = 3
  }
  count = count + 1;
  if (count % 2 == 0) {
    on = 1;
    document.getElementById("canvas").style.backgroundColor = "rgba(0,255,0,0.6)"
    if (on_fg == 1) {
      window.requestAnimationFrame(plotfunc);
    } else {
      window.requestAnimationFrame(plotAxes);
    }
    result();
  } else {
    on = 0;
    document.getElementById("canvas").style.backgroundColor = "rgba(0,255,0,0.1)"
    c.clearRect(0, 0, canvas.width, canvas.height);
    result();
  }

}
//X-Y-----------------------------------------------------------------------------
function plotLine() {
  plotAxes();
  c.strokeStyle = "black";
  var ay = ((canvas.height / 2) - ((1) * (-amp) * (y_div)) - (y_pos * 1));
  var y = ((canvas.height / 2) + ((1) * (-amp) * (y_div)) - (y_pos * 1));

  c.beginPath();
  c.moveTo((canvas.width / 2) + x_pos - 20, ay);
  c.lineTo((canvas.width / 2) + x_pos - 20, y);
  c.stroke();

}

function xy() {
  if (tour_on == 11) {
    dialog.close();
    dialog = document.getElementById('focus_cro_demo');
    dialog.show();
    tour_on = 12
  }
  xycount = xycount + 1;
  if (xycount % 2 == 0) {
    xy_on = 1;
    plot_condn();
    result();
  } else {
    xy_on = 0;
    plot_condn();
    result();
  }
}
//Focus -----------------------------------------------------
function plot_focus() {
  plotAxes();
  c.strokeStyle = "blue";
  c.beginPath();
  var y = (canvas.height / 2) - 5;
  c.moveTo(x_pos, y);
  for (i = x_pos; i < 2000; i++) {
    y = ((canvas.height / 2) - (y_pos * 1));
    c.lineTo(i, y);
  }
  c.stroke();
  result();
}

function myfunc() {
  focus_count = focus_count + 1;
  if (focus_count % 2 == 0) {
    focus = 1;
    plot_condn();
    result();
  } else {
    focus = 0;
    plot_condn();
    result();
  }
  if (tour_on == 12) {
    tour_on = 13;
    dialog.close();
    dialog = document.getElementById('remove_wire_demo');
    dialog.show();
  }
}
// Wire Connection
function connect_wire() {
  document.getElementById("wire").style.top = "175px";
  connect = 1;
  plot_condn();
  if (tour_on == 1) {
    dialog.close();
    dialog = document.getElementById('onoff_cro_demo');
    dialog.show();
    tour_on = 2
  }
  q1_count = q1_count +1;
  if( q1_count == 1 && tour_check == 0){
    dialog_out = document.getElementById('pop_up_quest_1');
    dialog_out.show();
    quest_no = 1;
  }
}

function remove_wire() {
  document.getElementById("wire").style.top = "225px";
  connect = 0;
  plot_condn();
  if (tour_on == 13) {
    tour_on = 0;
    dialog.close();
    tour_check = 0;
  }
  result();
  q5_count = q5_count +1;
  if( q5_count == 1 && tour_check == 0){
    dialog_out = document.getElementById('pop_up_quest_5');
    dialog_out.show();
    quest_no = 5;
  }
}
//FUNCTION GENERATOR----------------------------------------------------------------------\
var display = document.getElementById("display_canvas");
var disp = display.getContext("2d");
var func = "Sin";
var amp_disp = 30;
var freq_disp = 5;

function display_fg() {
  disp.clearRect(0, 0, canvas.width, canvas.height);
  disp.font = "20px Arial";
  disp.fillText(func, 10, 20);
  disp.fillText(amp + " V", 10, 45);
  disp.fillText(freq_disp + " Hz", 120, 45)
}

function amplitude() {
  if (on_fg == 1) {
    amp = Number(document.getElementById("amplitude").value);
    amp_disp = amp;
    display_fg();
  }
  if (on == 1) {
    plot_condn();
    result();
  }
  if (tour_on == 6 ){ //For demo purpose
    dialog.close();
    dialog = document.getElementById('xposition_cro_demo');
    dialog.show();
    tour_on = 7;
  }
  q4_count = q4_count +1;
  if( q4_count == 1 && tour_check == 0){
    dialog_out = document.getElementById('pop_up_quest_4');
    dialog_out.show();
    quest_no = 4;
  }
}

function freq() {
  if (on_fg == 1) {
    freq_disp = Number(document.getElementById("frequency").value);
    frequency = freq_disp;
    display_fg();
  }
  if (on == 1) {
    plot_condn();
    result();
  }
  if (tour_on == 5 ){  //For demo purpose
    dialog.close();
    dialog = document.getElementById('amplitude_fg_demo');
    dialog.show();
    tour_on = 6;
  }
  q3_count = q3_count +1;
  if( q3_count == 1 && tour_check == 0){
    dialog_out = document.getElementById('pop_up_quest_3');
    dialog_out.show();
    quest_no = 3;
  }
}

function on_off_fg() {
  if (count_fg % 2 == 0) {
    document.getElementById("display_canvas").style.backgroundColor = "rgba(0,255,0,0.6)"
    display_fg();
    on_fg = 1;
    plot_condn();
  } else {
    on_fg = 0;
    disp.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("display_canvas").style.backgroundColor = "rgba(0,255,0,0.1)"
    result();
    plot_condn();
  }
  count_fg = count_fg + 1;
  if (tour_on == 3) { //For demo purpose
    dialog.close();
    dialog = document.getElementById('signal_select_demo');
    dialog.show();
    tour_on = 4
  }
}

function signal_selection() {
  if (on_fg == 1) {
    signal_no = document.getElementById("signal_select").value;
    if (signal_no == 1) {
      func = "Sin";
    } else if (signal_no == 2) {
      func = "Cos";
    } else if (signal_no == 3) {
      func = "Sawtooth";
    } else if (signal_no == 4) {
      func = "Triangle";
    } else if (signal_no == 5) {
      func = "Square"
    }
    display_fg();
    result();
  }
  if (on == 1) {
    window.requestAnimationFrame(plotfunc);
  }
  if (tour_on == 4 ){
    dialog.close();
    dialog = document.getElementById('frequency_fg_demo');
    dialog.show();
    tour_on = 5;
  }
  q2_count = q2_count +1;
  if( q2_count == 1 && tour_check == 0){
    dialog_out = document.getElementById('pop_up_quest_2');
    dialog_out.show();
    quest_no = 2;
  }
}
// Tour guide
function tour() {
  tour_on = 1;
  tour_check = 1;
  dialog = document.getElementById('connect_demo');
  dialog.show();
}
// Result
function result() {
  if(func == "Sin" || func == "Cos"){
    peak_value = amp * 0.707;
    avg_value = amp* 0.637;
  }
  else if (func=="Square") {
    peak_value = amp;
    avg_value = amp;
  }
  else{
    peak_value = amp*0.577;
    avg_value = amp*0.5;
  }
  if (on == 1 && on_fg == 1 && connect == 1) {
    document.getElementById("timeperiod_result").textContent = ":" + (1 / frequency) + "s"
    document.getElementById("ptop_voltage_result").textContent = ":" + amp * 2 + "V";
    document.getElementById("rms_voltage_result").textContent = ":" + peak_value + "V";
    document.getElementById("average_volatge_result").textContent = ":" + avg_value + "V";
    document.getElementById('peak_voltage_result').textContent = ":" + amp + "V";
  }
  else{
    document.getElementById("timeperiod_result").textContent = ":" ;
    document.getElementById("ptop_voltage_result").textContent = ":";
    document.getElementById("rms_voltage_result").textContent = ":";
    document.getElementById("average_volatge_result").textContent = ":" ;
    document.getElementById('peak_voltage_result').textContent = ":" ;
  }
}

// POPup question function
for(i=0;i<document.querySelectorAll(".answer").length;i++){
  document.querySelectorAll(".answer")[i].addEventListener("click", function(){
    var value = this.value;
    ans_display(Number(value),quest_no);
  } ); }
function ans_display(ans,quest_no){
  if(ans == 1){
    alert("Correct answer!");
  }
  else{
    switch(quest_no){
      case 1:
      alert("Wrong answer!"+" \nCorrect answer: Peak Voltage/√2");
      break;

      case 2:
      alert("Wrong answer!"+"\nCorrect answer: 21.21V \nPeak Voltage = Peak-to-peak/2 = 30V \nRMS voltage = Peak Voltage/√2 =30/√2 = 21.21 V");
      break;

      case 3:
      alert("Wrong answer!"+"\nCorrect answer: 0.1s \n Timeperiod = 1/Frequency \n T = 1/10 = 0.1s");
      break;

      case 4:
      alert("Wrong answer!"+"\n Correct answer: Average Value");
      break;

      case 5:
      alert("Wrong answer!"+"\nCorrect answer: 11.54V\nRMS value of sawtooth wave=Peak value/√3 = 20/√3 =11.54V");
      quest_no = 0;
      break;
    }
  }
 dialog_out.close();
 quest_answered = 1;
}
function measurement_guide() {
  alert("Each division in CRO is 10 units.After taking the reading from the display multiply with the X-Division,Y-Division if X,Y related parameter is calculated.Press the Tour button to get familiarize with the functionality of CRO and function generator");
}
