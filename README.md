# Dice Betting GraphQL Server

Dice Betting is a GraphQL server application that allows users to bet a certain amount of money on the roll of a dice, and it processes the payout based on the roll result.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js, npm, and optionally Docker installed on your machine.

### Installation

1. Clone the repository to your local machine:

```sh
git clone git@github.com:MateiRaduConstantin/dice.git
```

2. Navigate to the project directory:

```sh
cd dice
```

3. Install the necessary dependencies:

```sh
npm install
```

## Running the Application

You can run the application in development or production mode.

### Development Mode

Run the application in development mode using the command:

```sh
npm run start
```

### Production Mode

To run the application in production mode, you first need to build it:

```sh
npm run build
```

Then, start the application:

```sh
npm run start
```

## Running the Tests

You can run the tests using the following command:

```sh
npm run test
```

## Docker

You can also run the application using Docker.

### Building the Docker Image

Build the Docker image using the command:

```sh
docker build .
```

### Running the Docker Container

After building the Docker image, you can start the Docker container using the command:

```sh
docker-compose up
```
