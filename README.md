Question and Answers:

1) What is the difference between var, let, and const?
-> var: The variable can be used from anywhere in the code.

let: The variable can only be used inside the block. It can not be accessed outside the block or from anywhere of the code.

const: The variable can only be used insise the block but once it get assigned the value it can not be changed automatically. Also it can not be used anywhere from the code.

2) What is the difference between map(), forEach(), and filter()?
->map(): It is used to perfrom actions on each element of an array and return a new array of the same length as previous with the new values.

forEach(): It is used to loop through each elements of an array to perfom certain actions. It does not returns a new array rather it is used to perform taks through each elements only.

filter(): It is used to select certain elements of an array based on certain conditions. It retuens an array with only those elements which fulfills the given conditions.

3) What are arrow functions in ES6?
-> Arrow functions are a clean and advanced way to write functions in JavaScript. But it can not take object as their arguments.

4) How does destructuring assignment work in ES6?
->Destructuring assignment in ES6 allows user to extract values from arrays or objects and assign them to variables in a single statement which helps to make code easier to understand.

5) Explain template literals in ES6. How are they different from string concatenation?
-> Template literals are ES6 strings enclosed in backticks (`) that allow embedding variables and expressions using ${} and support multi-line text, making string handling simpler and more readable than concatenation. where in the string concatanation we can only use single line strings. To write multi line strings in concatanation method it becomes more lentghy and difficult to understand the code. 