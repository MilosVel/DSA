// // piece of data - val
// //reference to next node - next

// class Node {
//     constructor(val) {
//         this.val = val;
//         this.next = null;
//     }
// }

// class SinglyLinkedList {
//     constructor() {
//         this.head = null;
//         this.tail = null;
//         this.length = 0;
//     }
//     push(val) {

//     }
// }

// var first = new Node("Hi")
// first.next = new Node("there")
// first.next.next = new Node("how")
// first.next.next.next = new Node("are")
// first.next.next.next.next = new Node("you")

// console.log(first)

// // var list = new SinglyLinkedList()
// // list.push("HELLO")
// // list.push("GOODBYE")


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// piece of data - val
//reference to next node - next

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}


var first = new Node("Hi")
let second = new Node('There')
let third = new Node('Third Time')
let forth = new Node('Forth Time')

first.next = second
console.log(first)
second.next = third
third.next = forth
console.log(first.next.next.next)
second.val = 'NOVA VREDNOST'