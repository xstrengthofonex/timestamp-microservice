

var chai = require("chai");
var chaiHTTP = require("chai-http");
var app = require("../app");

var expect = chai.expect;

chai.use(chaiHTTP);

describe("Timestamp Microservice", function(){
    describe("timestamp", function(){
        it("given invalid string should resond with invalid date message", function(done){
            chai.request(app)
                .get("/api/timestamp/invalid")
                .end(function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body.unix).to.equal(null);
                    expect(res.body.utc).to.equal("Invalid Date");
                    done();
                })
        })
    
        it("given empty string should respond with new Date", function(done){
            chai.request(app)
                .get("/api/timestamp/")
                .end(function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body.unix).not.to.be.null;
                    expect(res.body.utc).not.to.equal("Invalid Date");
                    done();
                });
        });

        it("given valid utc date", function(done){
            chai.request(app)
                .get("/api/timestamp/2016-11-20")
                .end(function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body.unix).to.equal(1479600000000);
                    expect(res.body.utc).to.include("Sun, 20 Nov 2016"); 
                    done();
                });
        });

        it("given valid unix date", function(done){
            chai.request(app)
                .get("/api/timestamp/1479663089000")
                .end(function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body.unix).to.equal(1479663089000);
                    expect(res.body.utc).to.equal("Sun, 20 Nov 2016 17:31:29 GMT"); 
                    done();
                });
        });

    });

});