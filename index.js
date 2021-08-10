var express = require('express');
var app = express();

cars = []
let parking_lot_size;
let colour_to_regn_and_slot_numbers = {}
let regn_number_to_slot_number = {}
let empty_slots;
app.get('/create_parking_lot', function (req, res) {
	parking_lot_size = req.query.number
	empty_slots = parking_lot_size
	for (let i = 0; i < parking_lot_size; i++) {
		cars[i] = {}
	}
  res.send(`Created a parking lot with ${parking_lot_size} size`);
});

app.get('/status', function (req, res) {
	ans = "Slot No. &emsp; Registartion no. &emsp; Colour <br>"
	cars.forEach(function (item, index){
		if(item['car_number']){
			ans+=(index+1)+"&emsp; &emsp; &emsp; &emsp; "+item.car_number+"&emsp; &emsp; &emsp; &emsp;"+item.car_colour+"<br>"
		}
	})
	res.send(ans);
})

app.get('/park', function (req, res) {
	let car_colour = req.query.colour
	let car_number = req.query.carnumber
	if(empty_slots===0){
		res.send("Sorry, Parking lot is full")
	}
	else{
		empty_slots = empty_slots - 1
		let allocated_slot;
		for(var i=0; i<parking_lot_size; i++){
			if(!cars[i]['car_number']){
				allocated_slot = i+1
				cars[i] = {
					'car_number': car_number,
					'car_colour': car_colour
				}
				
				

				regn_number_to_slot_number[car_number] = allocated_slot
				if(colour_to_regn_and_slot_numbers[car_colour]){
					obj = {
						'slot_number': allocated_slot,
						'car_number': car_number
					}
					colour_to_regn_and_slot_numbers[car_colour].push(obj)
				}
				else{
					obj = {
						'slot_number': allocated_slot,
						'car_number': car_number
					}
					colour_to_regn_and_slot_numbers[car_colour] = []
					colour_to_regn_and_slot_numbers[car_colour].push(obj)
				}
			}
			if(allocated_slot){
				break;
			}
		}
		res.send(`Car parked at ${allocated_slot}`)
	}
})

app.get('/leave', function (req, res){
	position_to_leave = req.query.position
	i = position_to_leave;
	car_to_leave = cars[i-1]
	car_to_leave_number = car_to_leave['car_number']
	car_to_leave_colour = car_to_leave['car_colour']
	obj = {
		'slot_number': i,
		'car_number': car_to_leave_number
	}
	colour_to_regn_and_slot_numbers[car_to_leave_colour] = colour_to_regn_and_slot_numbers[car_to_leave_colour].filter(function(value){
		return value !== obj
	})
	empty_slots = empty_slots - 1
	regn_number_to_slot_number[car_to_leave_number] = -1
	cars[i-1] = {}
	res.send(`Slot ${position_to_leave} is free`)
})

app.get('/slot_number_of_cars_with_colour', function (req, res){
	colour = req.query.colour 
	console.log(colour)
	ans = "Slot number . <br>"
	console.log(colour_to_regn_and_slot_numbers)
	if(colour_to_regn_and_slot_numbers[colour]!==undefined){
	colour_to_regn_and_slot_numbers[colour].forEach(function(clr){
		ans+=clr.slot_number;
		ans+=" , ";
	})	
	res.send(ans);
}
	else{
		res.send(`There is no Car available of ${colour} Colour`)
	}
	
})

app.get('/registration_number_of_cars_with_colour', function (req, res){
	colour = req.query.colour
	ans = " Registartion no. <br>"
	console.log(colour_to_regn_and_slot_numbers)
	if (colour_to_regn_and_slot_numbers[colour] !== undefined) {
		colour_to_regn_and_slot_numbers[colour].forEach(function (clr) {
			ans+= clr.car_number;
			ans+=" , "
		})
		res.send(ans);
	}
	else {
		res.send(`There is no Car available of ${colour} Colour`)
	}
})

app.get('/slot_number_for_regn_number', function (req, res){
	number = req.query.number
	ans="Slot Number is "
	ans+=regn_number_to_slot_number[number];
	res.send(ans);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
