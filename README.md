#Varsel

###Varsel is a javascript library for adding notifications to the browser

This library has taken great inspiration from the notifications in the Atom editor. 
[Atom notifications repo](https://github.com/atom/notifications)

[Demo of Varsel](http://varsel.freelunch.no)

###Varsel in action
![](https://github.com/ogdans3/varsel/blob/master/videos/demo.gif)

###Usage
`varsel(title, text, type, timeout, onDismiss)` 

This is the normal varsel function. You can choose to give varsel an object instead:
`varsel({Object})`

Each argument to varsel is optional, not giving any arguments will not display any notification

Each argument can be replaced for the `onDismiss` function.

The `title` argument can be a `String`, `[Array]` of strings or `{Object}`. The `{Object}` specification is given below.

The `text` argument can be a `String` or `[Array]` of strings.

The `type` argument can a `String`.

The `timeout` argument can be a `Number`, `float` or `false`.



###Examples
If nothing is specified then the notification will dismiss itself after two seconds. The explanation for each example is below the given code.

```javascript
varsel("Good job!");
```
Shows a simple success notification to the user.

```javascript
varsel({text: "I have a sectret to tell you!", type: "info"});
varsel({text: "Trump is president!", type: "warning"});
varsel({text: "Cannot compute", type: "error"});
```
Shows three notifications, each a different type.

```javascript
varsel({timeout: -1, text: "No timeout!"});
varsel({timeout: false, text: "No timeout!"});
```
Shows a notification which will *not* dismiss itself.

```javascript
varsel(["This is a title", "This is the explanation", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines"]);
varsel({text: ["This is a title", "This is the explanation", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines"]});
```
Shows a message with multiple input lines. Both methods accomplish the same task, and the output is the same.

```javascript
varsel({title: "Math joke incoming", type: "warning", onDismiss: function(){
    varsel({text: "3", type: "warning", timeout: 1, onDismiss: function(){
        varsel({text: "2", type: "warning", timeout: 1, onDismiss: function(){
            varsel({text: "1", timeout: 1, type: "warning", onDismiss: function(){
                varsel("Pi said to i", function(){
                    varsel("Be real", function(){
                        varsel("i was offended by this and replied", "Be rational!", function(){
                            varsel("Math jokes always makes me crack up", ":D");
                        });
                    });
                });
            }});
        }});
    }});
}});
```
Shows a math joke, one notification will appear after the last one is dismissed (either because of the timeout or the user clicking the x button)


```javascript
var list = [{
    title: "Chaining the alphabet",
    text: "Here we go"
    }, {
        title: "a"
    }, {
        title: "b",
        type: "info"
    }, {
        title: "c",
        type: "warning"
    }, {
        title: "d",
        text: "Different timeout",
        type: "error",
        timeout: 1,
        onDismiss: function(){
            //Uncomment this line to stop on this element
            //return false;
        }
    }, {
        title: "e",
        timeout: 2,
        text: "Waiting 500 milliseconds before displaying next, example of ajax request",
        onBeforeDismiss: function(varselObj, cb){
            setTimeout(function(){
                //First callback wins, i.e: If we first call the callback function with true the notifications will continue even if we call it with false right after and vice versa.
                cb(); //Continue again or 
                //cb(false); //Stop execution
            }, 500)
            return false;
        }
    }
];
var alphabet = "fghijklmnopqrstuvwxyx";
list = list.concat(alphabet.split(""));
varsel.queue({queue: list, timeout: .5});
```
Shows the alphabet, one notification at a time. When one is dismissed then the next will appear, each element in the list can be configured as a normal varsel object. Or you can simple give a list of strings, a single string or a list of strings and/or objects. 

You can also give the queue function a different timeout than the normal default setting, this will give every notification in the queue that timeout, it will be overwritten if a timeout is given in the varsel object.

###Configuration
Configuration of a varsel object (the object given to the varsel function, not the actual parameters given. Please view the Usage section above)

| Argument         | Default value    | Description   |
|------------------|------------------|---------------|
| `title`          | `""`             | No special styles contra the text element, but will always be the first line in the notification  |
| `text`           | `[]`             | An array of strings or a single string. Each new element in the resulting list will become a seperate line in the notification|
| `type`           | `"success"`      | The type of notification to show. Possible values: `"success"`, `"info"`, `"warning"`, `"error"` |
| `timeout`        | 2                | The number of seconds to wait before automatically dismissing a notification. Any number, float or false. If false or a negative number is given the notification will not automatically dismiss and the user will have to manually click the x button|
| `onBeforeDismiss`| `null`           | Function to be called when the notification is about to be dismissed, either because of timeout or because of user interaction. The arguments given to the function is the varsel object and a callback function. When the callback is called the notification will be dismissed, if the callback is called with `false` then the notification will not be dismissed.|
| `onDismiss`      | `null`   | What to do after the notification has been dismissed. The arguments given to the function will be the varsel object |

###Methods
| Method           |  Description     |
|------------------|------------------|
| `varsel.settings.get()`| Returns the global settings (default values) for all varsel objects |
| `varsel.settings.set(key, value)`| Sets a specific key value pair in the settings. The settings are cloned when creating a new notification but deep copy is not used. It is therefore recommended that `value` is not a deep object (object within object) and so. |
| `varsel.queue({Object} or [Array] or String)`| Sets a list of notifications to show after each other (when one is dismissed then the next will show). Each element in the array is its own varsel object, or a single string. If a object is given, there should be a queue key in the object to specify the list of notifications to show. A default timeout can also be given to the notifications in the queue. See usage example above|

###Properties
| Property         | Default value    | Description   |
|------------------|------------------|---------------|
| `container`      | `null`           | Holds the DOM container element for the notification |
| `settings`       | `{Object}`       | The local settings for this notification, this value will be populated with the global settings object upon creation |
| `dismissalReason`| `null`           | The reason for the notification being dismissed. Takes one of the following values: `"timeout"`, `"button"` (the user clicked the dismissal button).