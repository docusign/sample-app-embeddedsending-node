# Node.js and React: Embedded Sending Sample App

## Introduction

Welcome to the Embedded Sending Sample App! This application showcases Docusign embedded sending features designed for various use cases. Built using Node.js and React, Embedded Sending allows you to seamlessly integrate document signing workflows into your processes, enhancing efficiency and user experience across multiple scenarios.

## Configuring your integration

Before you can run this sample app on your local machine, you must first create a new integration key in your Docusign developer account.

### Create a new integration

1. If you don't already have one, create a [free developer account](https://go.docusign.com/o/sandbox/).
2. Log in to your developer account and navigate to [My Apps & Keys](https://admindemo.docusign.com/apps-and-keys).
3. Select **Add App and Integration Key**.
4. Create a new integration that is configured to use **JSON Web Token (JWT) Grant** and **Authorization Code Grant (ACG)**.
    You will need the **integration key** itself and its **RSA key pair**.
5. Save the **integration key** and **private RSA key pair** somewhere safe as you will need these later.
6. Add redirect URIs for your app (used in ``ACG_CALLBACK_URL_DEV`` **.env** variable) - you can specify both:
  - ``http://localhost:3000`` (if you run the app locally)
  - ``http://localhost:80`` (if you run the app in Docker)
> See our video, [**Creating an Integration Key for JWT Authentication**](https://www.youtube.com/watch?v=GgDqa7-L0yo) for a demonstration of how to create an integration key (client ID) for a user application like this example.

### Prerequisites

- A free Docusign developer account.
- Integration key and corresponding RSA key pair from the integration you created above.
- [Node.js](https://nodejs.org/) v20+
- [VS Code](https://code.visualstudio.com/)
- [Docker](https://docs.docker.com/get-docker/)

### Install dependencies locally

1. Download or clone this repository to your workstation in a new folder named **sample-app-embeddedsending-node**.
2. Navigate to that folder: **`cd sample-app-embeddedsending-node`**
3. Navigate to the **client** folder: **`cd client`**
4. Install dependencies using the [npm](https://www.npmjs.com/) package manager: **`npm install`**
5. Navigate to the **server** folder: **`cd ../server`**
6. Install dependencies: **`npm install`**
7. Connect your integration, see [the next section](#configure-environment-variables-and-private-key)

### Configure environment variables and private key
1. Rename the **.env.example** file in the root directory to **.env**, and update the followig required variables in the file:
  - ``DS_CLIENT_ID`` - an Integration key of your app (UUID). Located on the "Apps and Keys" page
  - ``DS_CLIENT_SECRET`` - ID of a secret key for your application (UUID)
  - ``JWT_USER_ID`` - a UUID unique to each user's Docusign Account, located on the "Apps and Keys" page under "My Account Information" section.

> **Note:** Protect your integration key and client secret. You should make sure that the **.env** file will not be stored in your source code repository.

2. Rename the **example_private.key** file to **private.key**, and paste your complete private RSA key into this file (including the header and footer of the key). This should be the private RSA you should have gotten when you created your Docusign account.


## Running the Embedded Sending Sample App in development mode

1. Navigate to the application folder: **`cd sample-app-embeddedsending-node`**
2. To start the server and client at the same time: **`npm run concurrently:dev`**
3. **Or,** to run the server and client separately:
    - In one terminal, run **`npm run client:dev`**
    - In a separate terminal, run **`npm run server:dev`**
4. Open a browser to **http://localhost:3000**

## Running the Embedded Sending Sample App in Docker

You can run the application in Docker locally in production mode:

1. Navigate to the application folder: **`cd sample-app-embeddedsending-node`**
2. Make sure that you configured **.env** file and saved your **private.key** in the root of the folder, as described in the [section above](#configure-environment-variables-and-private-key)
3. Make sure that you have Docker installed and Docker engine is running
4. Run **`docker compose -f docker-compose.local.yaml up -d`**
5. To stop containers, run **`docker compose -f docker-compose.local.yaml down`**
6. Open a browser to **http://localhost:80**