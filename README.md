# cells-js
1D Cellular Automata in JavaScript.

## Usage


`ElementaryCA` is a constructor for the 256 elementary cellular automata.

Use `r22 = new ElementaryCA(22)` to create rule 22.

`r22.update("00100")` will apply the rule once, yielding "01110".

`r22.update("01110")` will apply the rule again, yielding "10001".

This 3-step process can be automated with `r22.repeatupdate("00100",3)`.

## Codes

I am developing a code system for CA that my program can run.

`"e-22"` is the code for rule 22.

`e` is the group for elementary CAs.

You can get an object of a CA from its code using `fromRuleCode`.

`ASCIIDrawCA(code,iter,str)` runs a CA and displays its output using `#` and ` `.

## Future projects

I am currently working on adding 3+ color totalistic CA.


Please report bugs and suggestions
