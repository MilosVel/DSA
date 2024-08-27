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
//         var newNode = new Node(val);
//         if (!this.head) {
//             this.head = newNode;
//             this.tail = this.head;
//         } else {
//             this.tail.next = newNode;
//             this.tail = newNode;
//         }
//         this.length++;
//         return this;
//     }
// }

// var list = new SinglyLinkedList()
// // list.push("HELLO")
// // list.push("GOODBYE")

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////



class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        // this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        var newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;

            // this.tail = newNode
            // this.head = newNode
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
}

var list = new SinglyLinkedList()
list.push("HELLO")
list.push("GOODBYE")
list.push("Zdravo")
list.push("cao")
list.push("pozdrav")
console.log(list)
// list.tail.val = 'VELUKIIIIIII'
// console.log(list.head.next.next.next.next.val)



let x = 21;
let girl = function () {
    console.log(x);
    // let x = 20;
};
girl();

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////










/////////////////            VEZBA         ////////////////
/////////////////            VEZBA         ////////////////
/////////////////            VEZBA         ////////////////

// let obj1 = {
//     ime: 'Milos',
//     hobi: ['Sah', 'Sport']
// }

// let obj2 = obj1

// // obj2 = { prezime: 'Velickovic' }
// // console.log(obj2)


// obj1 = { noov: 'NOVOOO' }
// console.log('Objekat 2 je: ', obj2)




/////////////////            VEZBA         ////////////////
/////////////////            VEZBA         ////////////////
/////////////////            VEZBA         ////////////////



// let izvorniObj = { ime: 'Milos' }
// let obj1 = izvorniObj
// let obj2 = obj1


// izvorniObj.ime = "VELICKOVIC"
// izvorniObj = { ime: 'Vel Milos' }
// console.log('Objekat 1: ', obj1)
// obj1 = { prezime: 'Milos   Vel' }
// console.log('Objekat 2 je: ', obj2)
// console.log(obj1)

/////////////////            VEZBA         ////////////////
/////////////////            VEZBA         ////////////////
/////////////////            VEZBA         ////////////////



// let izvorniObj = { ime: 'Milos' }
// let obj1 = izvorniObj
// let obj2 = obj1


// obj2.ime = "VELICKOVIC M."
// izvorniObj = { prezimeIime: 'Vel Milos' }
// console.log('Objekat 1: ', obj1, ' OBJEKAT 2: ', obj2)
