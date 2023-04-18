# Testing Framework Documentation

## Overview

This document outlines the testing framework used for Subquery projects. The testing framework provides an easy way to test the behavior of mapping handlers and validate the data being indexed.

## Usage

To use the testing framework, you need to:

1. Create test files with the naming convention *.test.ts and place them in the src/tests folder. Each test file should contain test cases for specific mapping handlers.
2. Run the testing service using the command: `subql-node test`.

## Writing Test Cases

Test cases should be written using the `subqlTest()` function with the following parameters:

- **name**: A string containing the name of the test.
- **blockHeight**: The height of the block used in the test.
- **dependentEntities**: An array of entities that are required for the test to run.
- **expectedEntities**: An array of entities that are expected after the mapping handler has run.
- **handler**: The name of the mapping handler function to test.

### Example test case

```javascript

// Example handleEvent function
/*
export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  //Retrieve the record by its ID
  const record = await StarterEntity.get(
    event.block.block.header.hash.toString()
  );
  record.field2 = account.toString();
  //Big integer type Balance of a transfer event
  record.field3 = (balance as Balance).toBigInt();
  await record.save();
}

*/

subqlTest(
    "handleEvent test", // test name
    1000003, // block height to process
    [
      StarterEntity.create({
        id: '0x0ca3c88eaa25af380f243273e83ba2e161b207d935357af063e2bd5b8a2e9c40', // Replace this with the actual block hash for block 103
        field1: 1000003,
        field2: null,
        field3: null,
        field4: null,
        field5: null,
      }),
    ], // dependent entities
    [
      StarterEntity.create({
        id: '0x0ca3c88eaa25af380f243273e83ba2e161b207d935357af063e2bd5b8a2e9c40', // Replace this with the actual block hash for block 103
        field1: 1000003,
        field2: '23M5ttkmR6KcoTAAE6gcmibnKFtVaTP5yxnY8HF1BmrJ2A1i', 
        field3: BigInt(2303515439), 
        field4: null,
        field5: null,
      }),
    ], // expected entities
    'handleEvent', //handler name
  );
```

## Running Tests

To run the tests, execute the subql-node test command. The testing service will discover and import test files, run the tests, and log the results.

Example output:

Passing test:

![image](https://user-images.githubusercontent.com/40036742/232681495-969e28eb-6ff4-442f-b006-2e92548e9ef9.png)

Failing test:

![image](https://user-images.githubusercontent.com/40036742/232679045-1571a9c0-2854-494c-a790-6e1b0c22a8b1.png)

The output will include a summary of the total tests run, passing tests, and failing tests. If any tests fail, a detailed summary of the failed tests will be displayed:

![image](https://user-images.githubusercontent.com/40036742/232679166-ff681318-e619-461f-ad95-a513e48127f4.png)

## What you should not use it for (and any other limitations)

While the testing framework is a powerful tool for testing the behavior of mapping handlers and validating the data being indexed in Subquery projects, there are certain limitations and use cases that are not suitable for this framework.

### Limitations
- *Integration and end-to-end testing*: The testing framework is specifically designed for testing individual mapping handlers. It is not suitable for testing the integration of multiple components or the end-to-end functionality of your Subquery project.

- *State persistence*: The testing framework does not persist state between test cases. This means that any state changes made during a test case will not carry over to subsequent test cases. If your mapping handlers rely on previous state changes, the testing framework may not be suitable.

### What You Should Not Use It For
- *Performance testing*: The testing framework is not designed to test the performance of your mapping handlers or the overall Subquery project. It focuses on the correctness of the data being indexed but does not measure the speed or efficiency of the data processing.

## Conclusion

The testing framework provides a convenient way to test mapping handlers and validate the data being indexed in Subquery projects. It ensures that the data processing logic works as expected and helps to catch errors early in the development process. By providing detailed summaries of failed tests, developers can quickly identify and resolve issues, improving the overall quality and reliability of the Subquery project.

