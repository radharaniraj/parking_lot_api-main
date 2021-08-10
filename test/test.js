var supertest = require("supertest");
var should = require("should");


var server = supertest.agent("http://localhost:3000");


describe("create parking lot test",function(){
  it("should return created parking lot",function(done){
    server
    .get("/create_parking_lot?number=3")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.text.should.equal(`Created a parking lot with 3 size`)
      done();
    });
  });
});

describe("park a car test",function(){
    it("should return car parked at slot",function(done){
      server
      .get("/park?colour=white&carnumber=KA1234")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal(`Car parked at 1`)
        done();
      });
    });
  
});

describe("status of parking lot after 1 car",function(){
    it("should return status of parking lot",function(done){
      server
      .get("/status")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal('Slot No. &emsp; Registartion no. &emsp; Colour <br>1&emsp; &emsp; &emsp; &emsp; KA1234&emsp; &emsp; &emsp; &emsp;white<br>')
        done();
      });
    });
});

describe("park 2nd car test",function(){
    it("should return car parked at slot",function(done){
      server
      .get("/park?colour=blue&carnumber=KA1456")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal(`Car parked at 2`)
        done();
      });
    });
  
});

describe("park 3rd car test",function(){
    it("should return car parked at slot",function(done){
      server
      .get("/park?colour=blue&carnumber=KA3498")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal(`Car parked at 3`)
        done();
      });
    });
});

describe("park 4th car test",function(){
    it("should return parking lot is full",function(done){
      server
      .get("/park?colour=black&carnumber=KA5678")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal("Sorry, Parking lot is full")
        done();
      });
    });
});

describe("unpark 2nd pos car",function(){
    it("should return slot 2 is free",function(done){
      server
      .get("/leave?position=2")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal("Slot 2 is free")
        done();
      });
    });
});

describe("park 4th car again test",function(){
    it("should park car at 2",function(done){
      server
      .get("/park?colour=blue&carnumber=KA5678")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal("Car parked at 2")
        done();
      });
    });
});

describe("status of parking lot after 3 cars",function(){
    it("should return status of parking lot",function(done){
      server
      .get("/status")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal('Slot No. &emsp; Registartion no. &emsp; Colour <br>1&emsp; &emsp; &emsp; &emsp; KA1234&emsp; &emsp; &emsp; &emsp;white<br>2&emsp; &emsp; &emsp; &emsp; KA5678&emsp; &emsp; &emsp; &emsp;blue<br>3&emsp; &emsp; &emsp; &emsp; KA3498&emsp; &emsp; &emsp; &emsp;blue<br>')
        done();
      });
    });
});

describe("slot number for regn number test",function(){
    it("should return correct slot number",function(done){
      server
      .get("/slot_number_for_regn_number?number=KA5678")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.text.should.equal("Slot Number is 2")
        done();
      });
    });
});

describe("Registration number of Car for given colour",function(){
     it("should return correct registration number",function(done){
      server
      .get("/registration_number_of_cars_with_colour?colour=blue")
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
          res.text.should.equal(" Registartion no. <br>KA1456 , KA3498 , KA5678 ,")
        done();
      });
    });
})