var expect = chai.expect;
var should = chai.should();

describe("Varsel ", function(){
    var settings = varsel.settings.clone();

    it("Varsel exists", function() {
        expect(varsel).to.not.be.null.and.to.not.be.undefined;
    });
})

describe("Title", function(){
    it("Set title to String", function() {
        var title = "Test";
        expect(varsel(title).settings.title).to.be.equal(title);
    });

    it("Set title to list", function() {
        var title = ["Title 1", "Title 2"];
        var v1 = varsel(title);
        expect(v1.settings.title).to.be.equal(title[0]);
        expect(v1.settings.text).to.be.eql([title[1]]);
    });

    it("Set title from Object", function() {
        var obj1 = {title: "Test 1"};
        var obj2 = {title: ["Title 1", "Title 2"]};
        var obj3 = {text: ["Title 1", "Title 2"]};
        var v1 = varsel(obj1);
        var v2 = varsel(obj2);
        var v3 = varsel(obj3);
        expect(v1.settings.title).to.be.equal(obj1.title);
        expect(v2.settings.title).to.be.equal(obj2.title[0]); //This needs to be fixed to do the same as the "Set title to list" test.
        expect(v3.settings.title).to.be.eql(obj3.text[0]);
    });

    it("Set title to Function", function() {
        var title = function(){console.log("hello")};
        expect(varsel(title).settings.onDismiss).to.be.equal(title);
    });
})

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
        expect(v2.settings.text).to.be.eql([text]);
    });

    it("Set text to Function", function() {
        var text = function(){console.log("hello")};
        expect(varsel("placeHolder", text).settings.onDismiss).to.be.equal(text);
    });
})

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
})

describe("Timeout", function(){
    it("Set timeout to 3", function() {
        var timeout = 3;
        var v1 = varsel("placeHolder", "placeHolder", "success", timeout);
        var v2 = varsel({timeout: timeout});
        expect(v1.settings.timeout).to.be.eql(timeout);
        expect(v2.settings.timeout).to.be.eql(timeout);
    });
})

describe("onDismiss", function(){
    it("Set onDismiss", function() {
        var onDismiss = function(){console.log("Hello")};
        var v1 = varsel("placeHolder", "placeHolder", "success", 3, onDismiss);
        var v2 = varsel({onDismiss: onDismiss});
        expect(v1.settings.onDismiss).to.be.eql(onDismiss);
        expect(v2.settings.onDismiss).to.be.eql(onDismiss);
    });
})
