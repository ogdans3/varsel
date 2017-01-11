function varsel(title, text, type, timeout, callback){
    var self = this;
    if (window === self) {
        return new varsel(title, text, type, timeout, callback);
	}
    self.init(title, text, type, timeout, callback);
    return self;
}

//Default values to show. This does not perform deep copy, so if there is a nested object then it will reference the settings object.
varsel.settings = {
    _settings: {
        title: [],
        text: [],
        type: "success",
        timeout: 2,
        onDismiss: function(){},
        onBeforeDismiss: function(obj, cb){cb()}
    },

    get: function(){
        return this.clone();
    },

    set: function(key, value){
        this._settings[key] = value;
    },

    clone: function(){
        var self = this;

        var obj = {};
        var keys = Object.keys(self._settings);
        for(var i = 0; i < keys.length; i++){
            obj[keys[i]] = self._settings[keys[i]];
        }
        return obj;
    }
}

varsel.queue = function(obj){
    var queue;
    var timeout;

    console.log(obj);
    if(obj === null || obj === undefined){
        return;
    }else if(obj.constructor === String){
        queue = [obj];
    }else if(obj.constructor === Array){
        queue = obj;
    }else if(obj.constructor === Object){
        if(obj.queue.constructor === String)
            queue = [obj.queue];
        else if(obj.queue.constructor === Array)
            queue = obj.queue;
        timeout = obj.timeout;
    }
    var next = function(i){
        if(i > queue.length - 1)
            return;
        if(queue[i].constructor !== Object){
            queue[i] = {text: queue[i]};
        }
        if(timeout != null && timeout != undefined && timeout !== false && timeout >= 0 && !(queue[i].timeout !== undefined && queue[i].timeout !== null && queue[i].timeout.constructor === Number))
            queue[i].timeout = timeout;
        varsel(queue[i], function(varselObj){
            if(queue[i].onDismiss && queue[i].onDismiss){
                var continueQueue = queue[i].onDismiss(varselObj, function(continueQueue){
                    if(continueQueue === false)
                        return;
                    next(i + 1);
                });
                if(continueQueue === false)
                    return;
            }
            next(i + 1);
        });
    }
    next(0);
}

varsel.prototype = {
    container: null,
    settings: null,
    dismissalReason: null,

    init: function(title, text, type, timeout, callback){
        var self = this;

        //Set the default settings, these can safely be overwritten (aslong as there is no nested objects)
        self.settings = varsel.settings.get();

        var setSettings = function(obj){
            var keys = Object.keys(obj);
            for(var i = 0; i < keys.length; i++){
                if(keys[i] == "text"){
                    self.settings.text = self.settings.text.concat(obj[keys[i]]);
                }else{
                    self.settings[keys[i]] = obj[keys[i]];
                }
            }
        }

        if(title === undefined || title === null){
        }else if(title.constructor === String || title.constructor === Array){
            self.settings.title = title;
        }else if(title.constructor === Object){
            setSettings(title);
        }else if(typeof title === "function"){
            self.settings.onDismiss = title;
        }

        if(text === undefined || text === null){
        }else if(text.constructor === String){
            self.settings.text = self.settings.text.concat([text]);
        }else if(text.constructor === Array){
            self.settings.text = self.settings.text.concat(text);
        }else if(typeof text === "function"){
            self.settings.onDismiss = text;
        }

        if(type === undefined || type === null){
        }else if(type.constructor === String){
            self.settings.type = type;
        }else if(typeof type === "function"){
            self.settings.onDismiss = type;
        }

        if(timeout === undefined || timeout === null){
        }else if(timeout.constructor === Number){
            self.settings.timeout = timeout;
        }else if(typeof timeout === "function"){
            self.settings.onDismiss = timeout;
        }

        if(typeof callback === "function"){
            self.settings.onDismiss = callback;
        }

//        if(!self.settings.title)
//            return;
        if(self.settings.title.constructor !== Array){
            self.settings.title = [self.settings.title];
        }
        self.create();
    },

    show: function(){
        this.create();
    },

    hide: function (reason) {
        var self = this;
        self.dismissalReason = reason;

        var element = self.container;
        if(element){
            var destroy = function(event){
                //Remove the element from the DOM after the destroy animation has played
                event.target.parentNode.removeChild(event.target);
                self.settings.onDismiss(self);
                self.container = null;
            };

            //Call this function before we dismiss the notification
            self.settings.onBeforeDismiss(self, function(dismiss){
                //If dismiss is false then the notification will not be dismissed, will have
                if(dismiss === false){
                    self.dismissalReason = null;
                    return;
                }
                element.addEventListener("animationend", destroy, false);
                element.className = element.className + " varsel-destroy-animation";
            });
        }
    },

    getSettings: function(){
        return this.settings;
    },

    create: function(){
        var self = this;
        if(self.container !== null)
            return;

        var title = self.settings.title;
        var text = self.settings.text;
        var type = self.settings.type;
        var timeout = self.settings.timeout;

        var createContainer = function(type){
            var container = document.createElement("div");
            container.className = "varsel-container " + "varsel-type-" + type;
            var tempClassName = container.className;

            container.className = container.className + " varsel-create-animation";
            container.addEventListener("animationend", function(){
                container.className = tempClassName;
            }, false);

            return container;
        };

        var createIcon = function(){
            var icon = document.createElement("div");
            icon.className = "varsel-icon";
            return icon;
        }

        var createBody = function(){
            var body = document.createElement("div");
            body.className = "varsel-body";
            var bodyLine = function(text){
                var text = text;
                var line = document.createElement("div");
                line.className = "varsel-body-line";
                line.innerHTML = text;
                return line;
            }
            for(var i = 0; i < title.length; i++){
                body.appendChild(bodyLine(title[i]));
            }
            for(var i = 0; i < text.length; i++){
                body.appendChild(bodyLine(text[i]));
            }
            return body;
        }

        var createCloseButton = function(){
            var closeButton = document.createElement("div");
            closeButton.className = "varsel-close-button";
            closeButton.addEventListener("click", function(){
                self.hide("button");
            })
            return closeButton;
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

        var container = createContainer(type);
        var closeButton = createCloseButton();
        var icon = createIcon();
        var body = createBody();

        container.appendChild(icon);
        container.appendChild(body);
        container.appendChild(closeButton);
        append(container);

        if(timeout != null && timeout != undefined && timeout !== false && timeout >= 0){
            setTimeout(function(){
                self.hide("timeout");
            }, timeout * 1000);
        }

        self.container = container;
    }
}
