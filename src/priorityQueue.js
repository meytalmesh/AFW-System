class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(taskID, task, priority) {
        this.queue.push({ taskID, task, priority: priority || 0 }); // Default priority to 0 if not provided
        this.sortQueue();
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.queue.shift().task;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }

    setPriority(taskID, task, newPriority) { //remove from the queue and add it and sort.
      const taskToRemove = this.queue.indexOf(taskID);
      if (taskToRemove !== -1) {
        queue.splice(taskToRemove, 1);
      } 
      this.enqueue(taskID, task,newPriority);
      this.sortQueue();
    }

    sortQueue() {
      this.queue.sort((a, b) => b.priority - a.priority);
    }
  }
  
  module.exports = PriorityQueue;
  