function varsel(obj){
    if (window === this) {
        return new varsel(obj);
	}

    //Default values to show
    var title = "";
    var texts = [];
    var type = "success";
    var timeout = 2;
    
    if(obj.constructor === Array){
        texts = obj;
    }else if(typeof obj === "string"){
        texts.push(obj);
    }else if(obj !== null && typeof obj === "object"){
        title = obj.title;
        type = obj.type || type;
        timeout = obj.timeout || timeout;
        
        //When we get a text element we still need to see if its an array or just a string.
        if(obj.text.constructor === Array)
            texts = obj.text;
        else if(typeof obj.text === "string")
            texts.push(obj.text);
    }
    
    this.texts = texts;
    this.type = type;
    this.timeout = timeout;

    this.create();

    return this;
}

varsel.prototype = {
    container: null,
    
    hide: function () {
        console.log("Hide function called");
        var element = this.container;
        console.log(this);
        if(element){
            var destroy = function(event){
                console.log("Transition complete");
                //Remove the element from the DOM after the destroy animation has played
                event.target.parentNode.removeChild(event.target);
            };
            
            element.addEventListener("animationend", destroy, false);
            element.className = element.className + " varsel-destroy-animation";
        }
    },
    
    create: function(){
        var self = this;
        var texts = this.texts;
        
        var createContainer = function(type){
            var container = document.createElement("div");
            container.className = "varsel-container";
            switch(type){
                case "success":
                    container.className = container.className + " varsel-type-success";
                    break;
            }
            return container;
        };
        
        var createCloseButton = function(){
            var closeButton = document.createElement("div");
            closeButton.className = "varsel-close-button";
            closeButton.addEventListener("click", function(){
                self.hide();
            })
            return closeButton;
        }
        
        var createIcon = function(){
            var icon = document.createElement("div");
            icon.className = "varsel-icon";
            return icon;
        }
        
        var createBody = function(text){
            var body = document.createElement("div");
            body.className = "varsel-body";
            for(var i = 0; i < texts.length; i++){
                var text = texts[i];
                console.log("Text", text)
                var line = document.createElement("div");
                line.className = "varsel-body-line";
                line.innerHTML = text;
                body.appendChild(line);            
            }
            return body;
        }
        
        var createMainContainer = function(){
            var container = document.createElement("div");
            container.className = "varsel-main varsel-container";
            container.id = "varsel-mainContainer";
            document.body.appendChild(container);
            return container;
        }
        
        var append = function(element){
            var mainContainer = document.getElementById("varsel-mainContainer");
            if(mainContainer === null){
                mainContainer = createMainContainer();
            }
            mainContainer.appendChild(element);
        }
        
        var container = createContainer("success");
        var closeButton = createCloseButton();
        var icon = createIcon();
        var body = createBody(this.text);
        
        container.appendChild(icon);
        container.appendChild(body);
        container.appendChild(closeButton);
        append(container);
        
        if(this.timeout != null && this.timeout != undefined && this.timeout > -1){
            console.log("Timeout", this.timeout)
            setTimeout(function(){
                self.hide();
            }, this.timeout * 1000);            
        }
        
        this.container = container;
    }
}
