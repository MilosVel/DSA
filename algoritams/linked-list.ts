class Nod<T> {
    data: T;
    next: Nod<T> | null;
  
  constructor(data: T) {
      this.data = data;
      this.next = null;
    }
  }


  class LinkedList<T> {
    head: Nod<T> | null;
    constructor() {
      this.head = null;
    }
    append(data: T): void {
      const newNode = new Nod(data);
      if (!this.head) {
        this.head = newNode;
        return;
      }
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }



  // Create a new linked list
const list = new LinkedList<number>();

list.append(10);
list.append(20);
list.append(30);

// Function to print the linked list
function printList<T>(list: LinkedList<T>): void {
  let current = list.head;
  while (current) {
    console.log(current.data);
    current = current.next;
  }
}

// Print the linked list
printList(list); // Output: 10, 20, 30