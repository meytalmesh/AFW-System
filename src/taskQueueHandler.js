const { log } = require('console');
const PriorityQueue = require('./priorityQueue');
const fs = require('fs');
const path = require('path');

class TaskQueueHandler  {
    constructor() {
        this.taskQueue = new PriorityQueue();
        //this.taskMap = new Map(); // {key: taskID, value: priority}
        // Start processing tasks automatically when an instance is created
        this.processTasks();
        this.completedSuggestions = 0;
        this.totalSuggestionsForTask = 0;
    }

    addTask(taskID, task, priority) {
        this.totalSuggestionsForTask = 0;
        this.taskQueue.enqueue(taskID, task, priority);  //new task added     
        this.totalSuggestionsForTask = task.length;
        console.log("Task added to the queue.");
    }

    async processTasks() {
        while (true) {
            if (!this.taskQueue.isEmpty()) {
                const task = this.taskQueue.dequeue();
                await this.processTask(task);
            } else {
                // Sleep for a while before checking the task queue again
                await this.sleep(1000); 
            }
        }
    }

    async processTask(task) {
        this.completedSuggestions = 0
        console.log("Processing task:", task);
        for (const suggestion of task) {
            let isValid = this.validateSuggestionStructure(suggestion);
            let noOutdatedness = this.checkOutdatedness(task, suggestion);
            let conflicts = this.checkConflicts(task, suggestion);

            if (isValid && noOutdatedness && !conflicts) {
                console.log("Accepted suggestion:", suggestion);
                this.completedSuggestions++;
                await this.sleep(5000);
            } 
            // else {
            //     console.log("Invalid suggestion:", suggestion);  //NOT IN THE REQUIREMENTS
            // }

        }
        console.log("finish processing this task");
    }
   
    validateSuggestionStructure(suggestion) {
        const suggestionStructure = JSON.parse(fs.readFileSync(path.resolve(__dirname, './suggestion.json'), 'utf8'));
        const objKeys = Object.keys(suggestion);
        const structureKeys = Object.keys(suggestionStructure);

        if (!objKeys.every(key => structureKeys.includes(key))) {
            return false;
        }
    
        if (!structureKeys.every(key => objKeys.includes(key))) {
            return false;
        }

        for (const key of objKeys) {
            if (Array.isArray(suggestion[key]) && !Array.isArray(suggestionStructure[key])) {
                return false;
                
            } else if (typeof suggestion[key] !== suggestionStructure[key] && typeof suggestion[key] !== 'object') {
                    return false;
            }
        }
        return true;
    }

    checkOutdatedness(task, currentSuggestion) {
        return !(task.some(suggestion => suggestion.ruleID === currentSuggestion.ruleID && suggestion.timeOfCreation > currentSuggestion.timeOfCreation));
    }

    checkConflicts(task, currentSuggestion) {
        return task.some(suggestion => {
            if (suggestion !== currentSuggestion && suggestion.ruleID === currentSuggestion.ruleID) {
                for (const objectToModify of suggestion.objectsToModify) {
                    for (const currentObject of currentSuggestion.objectsToModify) {
                        if (objectToModify.cell === currentObject.cell &&
                            objectToModify.objectID === currentObject.objectID &&
                            ((currentSuggestion.action === 'add' && suggestion.action === 'remove') ||
                            (suggestion.action === 'remove' && currentSuggestion.action === 'add'))) {
                            return true; // Conflict found
                        }
                    }
                }
            }
            return false;
        });
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getTaskProgress(){
        return (this.completedSuggestions / this.totalSuggestionsForTask) * 100;    
    }

    async enqueueSuggestionsTask(taskID, suggestions, priority) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.addTask(taskID, suggestions, priority);
                    resolve();
                } catch (error) {
                    reject(error); 
                }
            }, 1000); 
        });
    }
}


module.exports = TaskQueueHandler;