

"use strict";

function ElementaryCA(n) {								// The 256 elementary CA.
	this.ruleint = n;
	this.rulecode = "e-"+n;
}

ElementaryCA.prototype.update = function(str) {			// Update a string.
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

ElementaryCA.prototype.repeatupdate = function(str,int) {// Repetitively update a string.
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
	} else {
		throw new Error("cells-js: Invalid code "+code);
	}
}

function ASCIIDrawCA(code,iter,str) {
	return fromRuleCode(code).repeatupdate(str,iter).map(a=>a.split("1").join("#").split("0").join(" ")).join("\n")
}
