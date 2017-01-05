function varsel(text){
    if (window === this) {
        return new varsel(text);
	}
    console.log(text);
    return this;
}

varsel.prototype = {
    hide: function () {
        console.log("Hide function called");
    }
}
