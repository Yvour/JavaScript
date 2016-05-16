"use strict";
var Human = function (data) {
	var key = '';
	this.data = Object.create(null);
	if (data) {
		for (key in data)
			this.data[key] = data[key];
		if (data.name)
			this.name = data.name;
		if (data.surname)
			this.surname = data.surname
			if (data.manor)
				this.manor = data.manor;
	}
	this._the_names = [];
}

Human.prototype = Object.create(null);
Human.prototype.constructor = Human;
Human.prototype.getName = function () {
	return this.name + ' ' + this.surname;
}

Object.defineProperty(Human.prototype, 'nameset',
		      {
			      configurable : true, get : function () {
				      if (this._the_names) {
					      return this._the_names.join(' ');
				      }
				      else
					      return '';
			      },
		      set : function (value) {
			      this._the_names = value.split(/\s+/);
		      }
		      });

var Sir = function (data) {
	Human.apply(this, arguments);
	this.isSir = true;
	this.title = '';
	if (data.title)
		this.title = data.title;
}

Sir.prototype = Object.create(Human.prototype);
Sir.prototype.constructor = Sir;
Sir.prototype.getFullTitle = function () {
	"use strict";
var res = []
if (this.isSir);
res.push('Sir');
if (this.name)
	res.push(this.name);
if (this.surname){
	res.push(this.surname);
}
if (this.title){
	res.push(this.title);
}
if (this.manor){
	res.push('of');
	res.push(this.manor)
}

return res.join(' ');
}  
