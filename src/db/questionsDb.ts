export const questionsDb = {
    en: {
        javascript: [
            {
                id: '93b0c599-6f44-42c3-a310-2d573c8bd12a',
                order: '0001',
                question: 'What are the different data types present in javascript?',
                answer: `<p>To know the type of a JavaScript variable, we can use the <b>typeof</b> operator.</p>
                <p><strong>Primitive types</strong></p>
                <ul>
                <br><li><strong>String</strong> - It represents a series of characters and is written with quotes.</li>
                </ul>
                Example :<code>var str = "Hello World";</code>
                <ul>
                <br><li><strong>Number</strong> - It represents a number. Can be written with or without decimals.</li>
                </ul>
                <p>Example :<br><code>var x = 10;\nvar y = 9.9; //with decimal</code></p>
                <ul>
                <br><li><strong>BigInt</strong> - This data type is used to store numbers which are above the limitation of the Number data type.&nbsp;</li>
                </ul>
                <p>Example :<br><code>var bigInteger =  62846186816648264862462846284;</code></p>
                <ul>
                <br><li><strong>Boolean</strong> - It represents a logical entity and can have only two values : true or false.</li>
                </ul>
                <p>Example :<br><code>var a = 2;\nvar b = 3;\n(a == b) // returns false</code></p>
                <ul>
                <br><li><strong>Undefined</strong> - When a variable is declared but not assigned it has the value of undefined and it’s type is also undefined.</li>
                </ul>
                <p>Example :<br><code>var x; //declared but not assigned\nvar y = undefined;</code></p>
                <ul>
                <br><li><strong>Null</strong> - It represents a non-existent or a invalid value.</li>
                </ul>
                <p>Example :<br><code>var x = null;</code></p>
                <ul>
                <br><li><strong>Symbol</strong> - It is a new data type introduced in the ES6 version of javascript. It is used to store an anonymous and unique value</li>
                </ul>
                <p>Example :<br><code>var symbol1 = Symbol('symbol');</code></p>
                <br><p><strong>Non-primitive types</strong></p>
                <p>To store multiple and complex values, non-primitive data types are used.</p>
                <ul>
                <li><strong>Object</strong> - Used to store collection of data.</li>
                </ul>
                <p>Example:</p>
                <code>// Collection of data in key-value pairs\nvar obj1 = {\n   &nbsp;&nbsp;x:  "Paul",\n   &nbsp;&nbsp;y:  2020,\n   &nbsp;&nbsp;z: function(x){\n      &nbsp;&nbsp;return x;\n   &nbsp;&nbsp;}\n}</code>
                <ul>
                <br><li><strong>Array</strong> - List of collection of data.</span></li>
                </ul>
                <span>Example:</span>
                <code>// Collection of data as an ordered list\n var array = [100, "Hello World", true];</code>
                `,
                level: 'basic',
                tech: 'javascript'
            },
            {
                id: '0e485c22-f141-438e-a2a9-18ca331742f6',
                order: '0002',
                question: 'What is Hoisting?',
                answer: `<p>Hoisting is the default behavior of javascript where all the variable and function declarations are moved on top.</p>
                <p>This means the variables and functions declared are moved on top of the scope.</p>
                <ul>
                <li>Example 1:</li>
                </ul>
                <code>myVariable = 99;\nconsole.log(myVariable); // outputs 99</code>
                <ul>
                <li>Example 2:</li>
                </ul>
                <code>myFunc();  // Outputs "Hello Paul"\n   function myFunc(){\n   console.log("Hello Paul");\n}</code>
                <ul>
                <li>Example 3:</li>
                </ul>
                <code>function printName(){\n    name = "Ann";\n    console.log(name);\n    var name;\n }\nprintName(); // Outputs "Hello Ann" since the local variable “name” is hoisted inside the local scope</code>
                <ul>
                <li><strong>Important</strong>- variable initializations are not hoisted. Only variable declarations are hoisted!</li>
                </ul>
                <code>var x;\nconsole.log(x); // Outputs "undefined" because the initialization of "x" is not hoisted\nx = 23;</code>
                `,
                level: 'basic',
                tech: 'javascript'
            },
            {
                id: '7353808e-5659-4b2f-b9fa-993245fbdca2',
                order: '0003',
                question: 'Difference between “ == “ and “ === “ operators.',
                answer: `<p>Both are comparison operators. The big difference between both the operators is:</p>
                <p>“==”      is used to compare values - and behind the scenes, in this case Javascript is converting the string to a number <span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 15px;font-family: Verdana, sans-serif;">when doing the comparison</span><br>“ === “ is used to compare both value and types.</p>
                <p>Example:</p>
                <code>var x = 2;\nvar y = "2";\n(x == y)  // Returns true since the value of both x and y is the same\n(x === y) // Returns false since the typeof x is "number" and typeof y is "string"</code>`,
                level: 'basic',
                tech: 'javascript'
            },
            {
                id: 'bb2f98fc-99b5-4a09-ac97-75ea64e3e129',
                order: '0004',
                question: 'Javascript: is a statically typed or a dynamically typed language?',
                answer: `<p style="text-align:start;"><span style="color: rgb(0,0,0);font-size: medium;font-family: -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;"><strong>Dynamically</strong> typed language: the type of a variable is checked during run-time.<br><strong>Statically</strong> typed language: the type of a variable is checked during compile-time.</span></p>
                <p style="text-align:start;">JavaScript is a dynamically typed language :)</p>
                <p>Since javascript is a loosely (dynamically) typed language, variables in JS are not associated with any type. A variable can hold the value of any data type.</p>
                <p>For example, a variable that is assigned a number type can be converted to a string type:</p>
                <code>var a = 100;\nvar a = "My name is Bob";</code>`,
                level: 'basic',
                tech: 'javascript'
            },
            {
                id: 'b6a22762-0a7d-428b-8909-395e9e8a4220',
                order: '0005',
                question: 'What is NaN property?',
                answer: `<p>NaN property represents “Not-a-Number” value. It indicates a value that is not a number.</p>
                If you try typeof of a NaN (using isNaN() function) it will try to convert the value to a number and return a boolean.
                <code>NaN === NaN; // false\nNumber.NaN === NaN; // false\nisNaN(NaN); // true\nisNaN(Number.NaN); // true\nNumber.isNaN(NaN); // true\nfunction valueIsNaN(v) { return v !== v; }\nvalueIsNaN(1); // false\nvalueIsNaN(NaN); // true\nvalueIsNaN(Number.NaN); // true</code>
                Additionally, some array methods cannot find NaN, while others can.
                <code>let arr = [2, 4, NaN, 12];\narr.indexOf(NaN); // -1 (false)\narr.includes(NaN); // true\narr.findIndex(n => Number.isNaN(n)); // 2`,
                level: 'basic',
                tech: 'javascript'
            }
        ],
        react: [
            {
                id: '0ea37f71-b27a-4515-99b5-2793bc99253d',
                order: '0001',
                question: 'Question 01',
                answer: 'Answer 01',
                level: 'basic',
                tech: 'react'
            },
            {
                id: '901db663-0eaf-401a-ae24-a86eac27230b',
                order: '0002',
                question: 'Question 02',
                answer: 'Answer 02',
                level: 'intermediate',
                tech: 'react'
            },
            {
                id: 'a77dd4ab-9ed3-4ab7-a30e-4d0ee68c4a66',
                order: '0003',
                question: 'Question 03',
                answer: 'Answer 03',
                level: 'advanced',
                tech: 'react'
            }
        ]
    }
};
