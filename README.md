# spring-erp

## Installation 

Clone repository from Github, details of steps can refer to [Github's guideline](https://help.github.com/articles/fork-a-repo/).

Before next step, ensure you have installed [node](https://nodejs.org/dist/v4.3.2/) (v4.3.2) and latest NPM (v3.7.2) in your PC / Mac.

Open one cmd / terminal window in your PC / Mac and goto the root of this repository you just clone from
 Github. Type below command to build frontend resource.

For windows, please use below command:
```shell
$ gradlew webpack
```

For Mac, please use below command instead:
```shell
$ ./gradlew webpack
```

Once frontend resource are built (if you run it the first time, it will spend more time on downloading the necessary modules and packages, e.g. The NPM modules mentioned in ./src/main/webapp/package.json), you can run
following command to start the server.

For windows, please use below command:
```shell
$ gradlew boot-run
```

For Mac, please use below command instead:
```shell
$ ./gradlew boot-run
```

Once the server is successfully started, goto url [http:://localhost:8080](http:://localhost:8080) in your browser (chrome is recommended) to try.

This repository is kept updating, you could use below git commands to pull the latest update to your local repository then rerun above gradle commands to try the updates.
```shell
$ git fetch origin master:temp

$ git merge tmp
```
