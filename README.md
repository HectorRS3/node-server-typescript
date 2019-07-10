# Node Server Typescript
## Node server boilerplate written in Typescript.

This is the version 2 of the Node Server Boilerplate project. In order to use this template, just run these commands:

```sh
git clone https://github.com/juan1003/node-server-typescript.git
mv <new-name>/ node-server-typescript/
cd <new-name>
npm install
npm run prod
```
If you want to start a new repository, then type this:

```sh
rm -rf .git/
git init
git remote add origin <your-remote-repository>
```

You will need to create an ormconfig.json that goes this way:

```json
{
    "type": "mysql",
    "host": <your-host>,
    "port": 3306,
    "username": <your-db-username>,
    "password": <your-db-password>,
    "database": <your-db-name>,
    "entities": [
      "src/Entity/**/*.ts"
    ],
    "autoSchemaSync": true
}
```

And now you are set! 
-