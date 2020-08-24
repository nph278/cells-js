

"use strict";

function ElementaryCA(n) {								
	this.ruleint = n;
	this.rulecode = "e-"+n;
}

ElementaryCA.prototype.update = function(str) {			
	var rule = this.ruleint.toString(2);
	while(rule.length<8){
		rule = "0"+rule;
	}
	rule = rule.split("").reverse().join("");
	var newstr = rule[parseInt(str.slice(0,2),2)];
	for (var i = 1; i < str.length-1; i++) {
		newstr += rule[parseInt(str.slice(i-1,i+2),2)];
	}
	newstr += rule[parseInt(str.slice(str.length-2,str.length),2)];
	return newstr;
};

ElementaryCA.prototype.repeatupdate = function(str,int) {
	var arr = [];
	arr.push(str);
	for (var i = 1; i < int; i++) {
		str = this.update(str);
		arr.push(str);
	}
	return arr;
};

function fromRuleCode(code) {
	var n = +code.split("-")[1];
	var family = code.split("-")[0];
	if (family==="e") {
		return new ElementaryCA(n);
	} else if (family==="t3") {
		return new Totalistic3CA(n);
	} else {
		throw new Error("cells-js: Invalid code "+code);
	}
}

function ASCIIDrawCA(code,iter,str) {
	var family = code.split("-")[0];
	for (var i = 0; i < iter; i++) {
		str="0"+str+"0";
	}
	var txt;
	if (family==="e") {
		txt=fromRuleCode(code).repeatupdate(str,iter).map(a=>a.split("1").join("#").split("0").join(" ")).join("\n");
	}
	if (family==="t3") {
		txt=fromRuleCode(code).repeatupdate(str,iter).map(a=>a.split("2").join("#").split("1").join("+").split("0").join(" ")).join("\n");
	}
	while(!txt.split("\n").map(function(a) {return a[0]===" "}).includes(false)){
		txt=txt.split("\n").map(a=>a.slice(1,a.length)).join("\n");
	}
	while(!txt.split("\n").map(function(a) {return a[a.length-1]===" "}).includes(false)){
		txt=txt.split("\n").map(a=>a.slice(0,a.length-1)).join("\n");
	}
	return txt;
}

function Totalistic3CA(n) {								
	this.ruleint = n;
	this.rulecode = "t3-"+n;
}

Totalistic3CA.prototype.update = function(str) {			
	var rule = this.ruleint.toString(3);
	while(rule.length<7){
		rule = "0"+rule;
	}
	rule = rule.split("").reverse().join("");
	var newstr = rule[Number(str[0])+Number(str[1])];
	for (var i = 1; i < str.length-1; i++) {
		newstr += rule[Number(str[i-1])+Number(str[i])+Number(str[i+1])];
	}
	newstr += rule[Number(str[str.length-2])+Number(str[str.length-1])];
	return newstr;
};

Totalistic3CA.prototype.repeatupdate = function(str,int) {
	var arr = [];
	arr.push(str);
	for (var i = 1; i < int; i++) {
		str = this.update(str);
		arr.push(str);
	}
	return arr;
};
