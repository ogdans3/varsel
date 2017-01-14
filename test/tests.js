var expect = chai.expect;
var should = chai.should();

describe("Varsel ", function(){
    var settings = varsel.settings.clone();

    it("Varsel exists", function() {
        expect(varsel).to.not.be.null.and.to.not.be.undefined;
    });
});

describe("Title", function(){
    it("Set title to String", function() {
        var title = "Test";
        var v1 = varsel(title);
        console.log(v1);
        expect(v1.settings.title).to.be.eql([title]);
    });

    it("Set title to list", function() {
        var title = ["Title 1", "Title 2"];
        var v1 = varsel(title);
        expect(v1.settings.title).to.be.eql(title);
    });

    it("Set title from Object", function() {
        var obj1 = {title: "Test 1"};
        var obj2 = {title: ["Title 1", "Title 2"]};
        var obj3 = {text: ["Title 1", "Title 2"]};
        var v1 = varsel(obj1);
        var v2 = varsel(obj2);
        var v3 = varsel(obj3);
        expect(v1.settings.title).to.be.eql([obj1.title]);
        expect(v2.settings.title).to.be.eql(obj2.title);
    });

    it("Set title to Function", function() {
        var title = function(){console.log("hello")};
        expect(varsel(title).settings.onDismiss).to.be.equal(title);
    });
});

describe("Text", function(){
    it("Set text to String", function() {
        var text = "Test";
        var v1 = varsel("placeHolder", text);
        var v2 = varsel({title: "placeHolder", text: text});
        expect(v1.settings.text).to.be.eql([text]);
        expect(v2.settings.text).to.be.eql([text]);
    });

    it("Set text to list", function() {
        var text = ["Title 1", "Title 2"];
        var v1 = varsel("placeHolder", text);
        var v2 = varsel({title: "placeHolder", text: text});
        expect(v1.settings.text).to.be.eql(text);
        expect(v2.settings.text).to.be.eql(text);
    });

    it("Set text to Function", function() {
        var text = function(){console.log("hello")};
        expect(varsel("placeHolder", text).settings.onDismiss).to.be.equal(text);
    });
});

describe("Type", function(){
    it("Set type to success", function() {
        var type = "success";
        var v1 = varsel("placeHolder", "placeHolder", type);
        var v2 = varsel({type: type});
        expect(v1.settings.type).to.be.eql(type);
        expect(v2.settings.type).to.be.eql(type);
    });

    it("Set type to info", function() {
        var type = "info";
        var v1 = varsel("placeHolder", "placeHolder", type);
        var v2 = varsel({type: type});
        expect(v1.settings.type).to.be.eql(type);
        expect(v2.settings.type).to.be.eql(type);
    });

    it("Set type to warning", function() {
        var type = "warning";
        var v1 = varsel("placeHolder", "placeHolder", type);
        var v2 = varsel({type: type});
        expect(v1.settings.type).to.be.eql(type);
        expect(v2.settings.type).to.be.eql(type);
    });

    it("Set type to error", function() {
        var type = "error";
        var v1 = varsel("placeHolder", "placeHolder", type);
        var v2 = varsel({type: type});
        expect(v1.settings.type).to.be.eql(type);
        expect(v2.settings.type).to.be.eql(type);
    });

    it("Set type to Function", function() {
        var type = function(){console.log("hello")};
        expect(varsel("placeHolder", "placeHolder", type).settings.onDismiss).to.be.equal(type);
    });
});

describe("Timeout", function(){
    it("Set timeout to 3", function() {
        var timeout = 3;
        var v1 = varsel("placeHolder", "placeHolder", "success", timeout);
        var v2 = varsel({timeout: timeout});
        expect(v1.settings.timeout).to.be.eql(timeout);
        expect(v2.settings.timeout).to.be.eql(timeout);
    });
});

describe("onDismiss", function(){
    it("Set onDismiss", function() {
        var onDismiss = function(){console.log("Hello")};
        var v1 = varsel("placeHolder", "placeHolder", "success", 3, onDismiss);
        var v2 = varsel({onDismiss: onDismiss});
        expect(v1.settings.onDismiss).to.be.eql(onDismiss);
        expect(v2.settings.onDismiss).to.be.eql(onDismiss);
    });
});

describe("Queue", function(){
    it("Init queue", function(){
        var notifications = ["Not 1", "Not 2"];
        var q1 = varsel.queue(notifications);
        expect(q1.length).to.be.eql(2);
    });

    it("Title", function(){
        var notifications = [{title: "Title 1"}];
        var q1 = varsel.queue(notifications);
        expect(q1[0].settings.title).to.be.eql([notifications[0].title]);
    });

    it("Text", function(){
        var notifications = [{text: "Text 1"}, "Text 2"];
        var q1 = varsel.queue(notifications);
        expect(q1[0].settings.text).to.be.eql([notifications[0].text]);
        //When calling the queue with a list it will change the contents of the list instead of making a copy of the list.
        //It should maybe clone the object instead.
        expect(q1[1].settings.text).to.be.eql([notifications[1].text]);
    });

    it("Type", function(){
        var notifications = [{title: "Title 1", type: "success"}, {title: "Title 1", type: "info"}, {title: "Title 1", type: "warning"}, {title: "Title 1", type: "error"}];
        var q1 = varsel.queue(notifications);
        expect(q1[0].settings.type).to.be.eql(notifications[0].type);
        expect(q1[1].settings.type).to.be.eql(notifications[1].type);
        expect(q1[2].settings.type).to.be.eql(notifications[2].type);
        expect(q1[3].settings.type).to.be.eql(notifications[3].type);
    });

    it("Timeout", function(){
        var notifications = [{title: "Title 1", timeout: 2}, {title: "Title 1", timeout: -1}];
        var q1 = varsel.queue(notifications);
        expect(q1[0].settings.timeout).to.be.eql(notifications[0].timeout);
        expect(q1[1].settings.timeout).to.be.eql(notifications[1].timeout);
    });
});
