//require express
var express = require('express');
var path = require('path');
var PythonShell = require('python-shell');

PythonShell.defaultOptions = { scriptPath: '/home/pi/Desktop/pythonScripts' };
 
var sliderPosition = 0;
var sliderWantedPosition = 0;
var automateBlinds = 0;
var openBlinds = 0;
var manualValueForward = 0;
var manualValueBackwards = 0;

//router
var router = express.Router();

//export router
module.exports = router;

//route for homepage
router.get('/', function(req,res){
	res.sendFile(path.join(__dirname,'../index.html'));
});

//route for About
router.get('/about',function(req,res){
	res.sendFile(path.join(__dirname,'../about.html'));
});

router.get('/manual-blinds/:sliderValue', function(req,res){
	 var manualValue = req.params.sliderValue;    
	 sliderWantedPosition = manualValue;	 
	if(sliderPosition < manualValue){		
		sliderWantedPosition = manualValue - sliderPosition;
		var uri='http://localhost:8080/forward-blinds/'+sliderWantedPosition;
		res.redirect(uri);		
		console.log(uri,sliderPosition, manualValue, sliderWantedPosition);
		sliderPosition = manualValue;
		console.log(sliderPosition);		
	}	else{
		manualValueBackwards = sliderPosition - manualValue;
		var uri='http://localhost:8080/backwards-blinds/'+manualValueBackwards;
		res.redirect(uri);
		sliderPosition = manualValue;
		console.log(uri,sliderPosition, manualValue, sliderWantedPosition);		
	}	
});

router.get('/forward-blinds/:sliderValue', function(req, res){
	var manualValue =  req.params.sliderValue;
	var options = {
  					mode: 'text',
  					scriptPath: '/home/pi/Desktop/pythonScripts',
 	 				args: manualValue
			};
	PythonShell.run('StepperForwardArguments.py', options, function (err) {
  		if (err) throw err;
  		res.send('Stepper-Forward with Arguments finished executing');
		console.log('Stepper-Forward with Arguments finished executing', manualValue);
		});
});

router.get('/backwards-blinds/:sliderValue',function(req, res){
	var manualValue =  req.params.sliderValue;
	var options = {
  					mode: 'text',
  					scriptPath: '/home/pi/Desktop/pythonScripts',
 	 				args: manualValue
			};
	PythonShell.run('StepperBackwardsArguments.py', options, function (err) {
  		if (err) throw err;
  		res.send('Stepper-Backwards with Arguments finished executing');
		console.log('Stepper-Backwards with Arguments finished executing');
				});
});






