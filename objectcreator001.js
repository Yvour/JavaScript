function getUltraObject(param_set) {
  // Urvanov Ivan 2016
  // A creator of complex object version 1
  "use strict";
  var param = {
  };
  if (param_set == undefined)
    param = {
    };
  else
    param = JSON.parse(JSON.stringify(param_set));
  if (param == undefined)
    param = {
    };
  if (param.structname == undefined)
    param.structname = '___data';
  if (param.names == undefined) {
    param.names = 'Feature Property Attribute ExtraAttr Val'.split(' ');
  }
  if (param.single_space_properties == undefined) {
    param.single_space_properties = [];
  }
  
  var structname = param.structname;
  var single_space_properties = param.single_space_properties;
  
  function object() {
    Object.defineProperty(this, structname,
			  {
			    configurable : true, enumerable : false, writable : true, value : Object.create(null)
			  });
    
  };
  
  var names1 = param.names;
  var names2 = param.names;
  var simplename = 'simple';
  var complexname = 'complex';
  
  function init_struct(obj, propname, complexpropname) {
    if (!obj[structname][simplename])
      obj[structname][simplename] = Object.create(null)
      
      if (propname != undefined) {
	if (!obj[structname][simplename][propname])
	  obj[structname][simplename][propname] = Object.create(null);
      }
      if (!obj[structname][complexname])
	obj[structname][complexname] = Object.create(null);
      if (complexpropname != undefined) {
	if (!obj[structname][complexname][complexpropname])
	  obj[structname][complexname][complexpropname] = [];
      }
      
  }
  
  for (var i = 0;i < single_space_properties.length;i++) {
    (function () {
      var property_name = single_space_properties[i];
      
      Object.defineProperty(object.prototype, property_name,
			    {
			      enumerable : true, configurable : false, get : function () {
				init_struct(this, undefined, property_name);
				return this[structname][complexname][property_name].join(' ');
			      },
			    set : function (value) {
			      init_struct(this);
			      this[structname][complexname][property_name] = ('' + value).split(/\s+/);
			    }
			    
			    })
    })();
  }
  
  for (var i = 0;i < names1.length;i++) {
    (function () {
      var propname = '___' + names2[i].toLowerCase();
      
      Object.defineProperty(object.prototype, 'set' + names1[i],
			    {
			      enumerable : false, configurable : false, value : function (name, value) {
				init_struct(this, propname);
				
				this[structname][simplename][propname][name] = value;
			      }
			      
			    });
      
      Object.defineProperty(object.prototype, 'get' + names1[i],
			    {
			      enumerable : false, configurable : false, value : function (name) {
				if (!this[structname][simplename][propname]) {
				  this[structname][simplename][propname] = Object.create(null);
				}
				return this[structname][simplename][propname][name];
			      }
			    });
      
      Object.defineProperty(object.prototype, 'get' + names2[i] + 'Set',
			    {
			      enumerable : false, configurable : false, value : function () {
				if (!this[structname][simplename][propname]) {
				  this[structname][simplename][propname] = Object.create(null);
				}
				return JSON.parse(JSON.stringify(this[structname][simplename][propname]));
			      }
			    });
      
    })();
    
  }
  return object;
}

obj = getUltraObject( {
  single_space_properties : ['fullname', 'description_text']
});

var o = new obj();
o.setVal('name', 'Sir Walter');
o.setAttribute('name', 'Sir Walter');
o.fullname = 'Sir Walter\t\tScott\nof\nAbborsford'

alert(JSON.stringify(o, null, 2));


