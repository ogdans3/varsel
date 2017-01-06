#Varsel

###Varsel is a javascript library for adding notifications to the browser

This library has taken great inspiration from the notifications in the Atom editor. 
[Atom notifications repo](https://github.com/atom/notifications)

[Demo of Varsel](http://varsel.freelunch.no)

####Varsel in action
![](https://github.com/ogdans3/varsel/blob/master/videos/demo.gif)

####Examples
If nothing is specified then the notification will dismiss itself after two seconds.

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
```
Shows a notification which will *not* dismiss itself.

```javascript
varsel(["This is a title", "This is the explanation", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines"]);
varsel({text: ["This is a title", "This is the explanation", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines", "Many lines"]});
```
Shows a message with multiple input lines. Both methods accomplish the same task, and the output is the same.

