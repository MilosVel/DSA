// Heap - pravilo kod min heapa je da cildren uvek budu veci od parenta, na vrhu piramide je namanji clan - root. Izmedju cildrena ne postoji nikakva relacija. Samo parent dobija uvek left cildren pa onda right, ali ne postoji pravilo koji cildren je veci a koji manji. 

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() { // ovim metodom se lement koji je postavljena na kraju niza postalja na pravo mesto u heapu-piramidi
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {  // ako je index 0 onda je element na vrhu piramide i to je kraj tu treba prekinuti petlju
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break; // ovom se izlazi iz petlje
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() { // ovim metodom se uklanja root i na njegovo mesto se dodaje poslednji element iz niza.
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {  // Ovom metodom se elementu koji je bio poslednji u nizu i koji je otisao u root trazi adekvatno mesto.
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

let ER = new PriorityQueue();
ER.enqueue("common cold", 5)
ER.enqueue("gunshot wound", 1)
ER.enqueue("high fever", 4)
ER.enqueue("broken arm", 2)
ER.enqueue("glass in foot", 3)






