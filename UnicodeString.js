


function UnicodeString(str){
if (typeof str === 'string'){
  //str.split(/.{0,0});
  //[...str];
  let arr = Array.from(str);
  arr.forEach((x,i)=>{
    Object.defineProperty(this, i, {get:()=>x})});
  Object.defineProperty(this, "length", {get:()=>arr.length});
};

}

UnicodeString.prototype.charAt = function(i){
  if ((i<this.length)&&(parseInt(i, 10) == i)) return this[i];
}


UnicodeString.prototype.toString = function(){
  if (this.length>0){
  return Array.apply(null, Array(this.length)).map((x,i)=>this[i]).join('');
  };
}

UnicodeString.prototype.toJSON = function()
{return this.toString();}



UnicodeString.prototype.split = function(s){
  if (s==='')
    return Array.apply(null, Array(this.length)).map((x,i)=>this[i])
  else return String.prototype.split.apply(this.toString(), arguments);  
};

a = new UnicodeString("\u{1d11e}\u{462}\u{1d11d}")

g = {name: a, splitted: a.split(''), first:a.charAt(0)}
alert(JSON.stringify(g));
