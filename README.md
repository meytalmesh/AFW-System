# AFW System

This system allows you to manage tasks and dynamically adjust their priorities as needed. Below are instructions on how to set up and use the system effectively.

## Getting Started

To run the system, follow these steps:

1. **Building the Docker Image**: First, build the Docker image using the provided Dockerfile. Run the following command to build the image:

   ```
   docker build -t dockerimage:latest .
   ```

2. **Starting the Container**: Once the image is built, start the container using the provided Python script. Run the following command:

   ```
   python docker_script.py start
   ```

   * This script creates and starts the container. If the container already exists, it will not be restarted. 

3. **Running tests**
   ```
   npx jest .\tests\priorityQueue.test.js
   ```

   Note: 'taskQueueHandler.test.js' will fail to run because the tests for this class are currently not included in the test suite.


## Using the Task Queue
Once the container is running, you can interact with the task queue system using HTTP endpoints.

### Accepting Suggestions
To accept suggestions and add them to the task queue, send a POST request to the endpoint:

```
http://localhost:53508/accept-suggestions
```

Include the task details in the request body. If you wish to assign a priority level to the task, specify it in the body. If no priority level is provided, the default priority is 0.

Upon successful addition of the task to the queue, the system will respond with:

```
Task added to the queue
```

### Task Show

Handle requests for displaying tasks, send a GET request to the endpoint:

```
http://localhost:53508/show-task
```

The server retrieve the task's progress from the queue and send the progress percentage as a response to the client: "progress": 0-100 (percentage)

### Processing Tasks

The system will automatically start processing tasks in the queue. It will print valid suggestions one by one and remove them from the queue.

### Adjusting Task Priorities

To dynamically adjust the priority of tasks, include the task ID and the new priority level in the request body. This allows for dynamic prioritization of tasks based on changing requirements.

### Example to Run:
```
{
  "taskID": "12",
  "suggestions": [
    {
      "ruleID": "111",
      "timeOfCreation": "2024-03-26T19:10:15.703Z",
      "affectedCells": ["src"],
      "action": "add",
      "objectsToModify": [
        {
          "cell": "src",
          "objectID": "7"
        }
      ]
    },
    {
      "ruleID": "222",
      "timeOfCreation": "2024-03-26T19:10:15.703Z",
      "affectedCells": ["src"],
      "action": "add",
      "objectsToModify": [
        {
          "cell": "src",
          "objectID": "5"
        }
      ]
    },
    {
      "ruleID": "666",
      "timeOfCreation": "2024-03-26T19:10:15.703Z",
      "affectedCells": ["src"],
      "action": "add",
      "objectsToModify": [
        {
          "cell": "src",
          "objectID": "7"
        }
      ]
    }
  ]
}
```

### Additional Notes

- The provided Python script manages container status. Use `python docker_script.py status` to check if the container is "running" or "executed".
- Ensure that the task ID is entered correctly in the request body to maintain the integrity of the task queue.
- Assuming that task can get different ruleID.

## What's Next?
- The next step is to enhance its robustness and reliability by adding tests to the system.
- Pause and Resume Functionality- Allow users to pause and resume task execution. This can be useful if a user needs to interrupt a long-running task and resume it later without losing progress.
- Historical Progress Tracking**: Implement a feature to track and display historical progress data for completed tasks. This could include charts or graphs showing the progress over time, allowing users to analyze task performance and identify areas for improvement.
- Improve Error Handling and Recovery: Enhance error handling to gracefully handle errors during task execution and provide mechanisms for recovering from failures without losing progress.
- Resource Optimization: Optimize resource usage during task execution to improve performance and reduce execution time. This could involve parallelizing task execution or optimizing algorithms used for processing suggestions.
- User Feedback Mechanism: Implement a feedback mechanism to gather user input on the task execution process. This can help identify areas for improvement and address any issues or concerns users may have.

## Conclusion

With AFW Task-Queue System, you can efficiently manage tasks, adjust priorities dynamically, and ensure smooth processing of tasks according to their priority levels. If you have any questions or need further assistance, feel free to reach out! 
Meytalmesh@gmail.com
