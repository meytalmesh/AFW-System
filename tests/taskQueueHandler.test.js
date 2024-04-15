const TaskQueueHandler = require('../src/taskQueueHandler');

// Mocking the `loadJSONFile` function to avoid file system operations during testing
// jest.mock('fs', () => ({
//     readFileSync: jest.fn().mockReturnValue(JSON.stringify({
//         ruleID: "string",
//         timeOfCreation: "string",
//         affectedCells: ["string"],
//         action: "string",
//         objectsToModify: [{
//             cell: "string",
//             objectID: "string"
//         }]
//     }))
// }));

// describe('TaskQueueHandler', () => {
//     let taskQueueHandler;

//     beforeEach(() => {
//         taskQueueHandler = new TaskQueueHandler();
//     });

//     test('addTask method adds task to the queue', () => {
//         taskQueueHandler.addTask([{ suggestion: 'test' }], 1);
//         expect(taskQueueHandler.taskQueue.isEmpty()).toBe(false);
//     });

//     test('processTasks method processes tasks in the queue', async () => {
//         taskQueueHandler.addTask([{ suggestion: 'test1' }], 1);
        
//         await taskQueueHandler.processTasks();

//         // Ensure tasks have been processed 
//         expect(taskQueueHandler.taskQueue.isEmpty()).toBe(true);
//     }, 5000);

//     test('rejects suggestion with invalid structure', async () => {
//         const invalidSuggestion = {
//             //missing fields
//             ruleID: "123",
//             action: "add",
//             objectsToModify: [{ cell: "source", objectID: "123" }]
//         };

//         const isValid= taskQueueHandler.validateSuggestionStructure(invalidSuggestion)
//         await taskQueueHandler.processTasks();

//         expect(isValid).toBe(false);
//         expect(taskQueueHandler.taskQueue.isEmpty()).toBe(true);
//     }, 5000);

//     test('rejects suggestions with conflicts', async () => {
//         // Create conflicting suggestions
//         const task = [{
//             ruleID: "123",
//             action: "add",
//             objectsToModify: [{ cell: "source", objectID: "123" }]
//         },
//          {
//             ruleID: "123",
//             action: "remove", // Conflicting action with suggestion1
//             objectsToModify: [{ cell: "source", objectID: "123" }]
//         }];

//         taskQueueHandler.addTask(task);

//         await taskQueueHandler.processTasks();

//         const conflict = taskQueueHandler.checkConflicts(task, {
//             ruleID: "123",
//             action: "add",
//             objectsToModify: [{ cell: "source", objectID: "123" }]
//         });

//         expect(conflict).toBe(true);
//         expect(taskQueueHandler.taskQueue.isEmpty()).toBe(true);
//     }, 5000);

//     test('rejects suggestions with outdatedness', async () => {
//         const task = [{
//             ruleID: "123",
//             timeOfCreation: "2024-01-01T00:00:00.000Z", 
//             action: "add",
//             objectsToModify: [{ cell: "source", objectID: "123" }]
//         },
//          {
//             ruleID: "123",
//             timeOfCreation: "2024-01-02T00:00:00.000Z", // Newer timestamp
//             action: "remove", 
//             objectsToModify: [{ cell: "source", objectID: "123" }]
//         }];

//         taskQueueHandler.addTask(task, 1);

//         await taskQueueHandler.processTasks();

//         expect(taskQueueHandler.taskQueue.isEmpty()).toBe(true);
//     }, 5000);

//});
