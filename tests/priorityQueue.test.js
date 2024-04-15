const PriorityQueue = require('../src/priorityQueue');

describe('PriorityQueue', () => {
    let priorityQueue;

    beforeEach(() => {
        priorityQueue = new PriorityQueue();
    });

    test('enqueueing and dequeueing tasks with priority', () => {
        priorityQueue.enqueue("t1",['task1'], 1);
        priorityQueue.enqueue("t2",['task2'], 2);
        priorityQueue.enqueue("t3",['task3'], 1);

        expect(priorityQueue.dequeue()).toEqual(['task2']); // Highest priority task
        expect(priorityQueue.dequeue()).toEqual(['task1']); // Task with lower priority
        expect(priorityQueue.dequeue()).toEqual(['task3']); // Another task with the same priority
    });

    test('enqueueing tasks without explicit priority', () => { // Default priority is 0
        priorityQueue.enqueue("t1",['task1']);
        priorityQueue.enqueue("t2",['task2']);
        priorityQueue.enqueue("t3",['task3']);

        expect(priorityQueue.dequeue()).toEqual(['task1']); 
        expect(priorityQueue.dequeue()).toEqual(['task2']);
        expect(priorityQueue.dequeue()).toEqual(['task3']);
    });

    test('isEmpty method', () => {
        expect(priorityQueue.isEmpty()).toBe(true);

        priorityQueue.enqueue(['task1'], 1);
        expect(priorityQueue.isEmpty()).toBe(false);

        priorityQueue.dequeue();
        expect(priorityQueue.isEmpty()).toBe(true);
    });

    test('changing priority of a task', () => {
        // Enqueue tasks with different priorities
        priorityQueue.enqueue("t1", ['task1'], 3);
        priorityQueue.enqueue("t2", ['task2'], 2);
        priorityQueue.enqueue("t3", ['task3'], 1);
    
        // Change priority of task t1
        priorityQueue.setPriority("t3", ['task3'], 4);
    
        // Dequeue tasks and check their order
        expect(priorityQueue.dequeue()).toEqual(['task3']); // t3 has the highest priority now
        expect(priorityQueue.dequeue()).toEqual(['task1']); 
        expect(priorityQueue.dequeue()).toEqual(['task2']); 
    });
});
