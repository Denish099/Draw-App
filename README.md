1. intialized turboRepo
2. deleted the docs folder
3. intialized the http-backend and ws backend
4. added package.json on both http-backend and ws-backend
5. added tsconfig files to both and imported from @repo/typescript-config/base.json
6. added @repo/typescript-config/base.json as a dependency

7. added a build ,start,dev script to both
8. updated turbo.config
9. added express and ws

10. create a signup, signin, create-room endpoints
11. write middleware that decode the token and create room
12. decode the token in ws server and send the token as a query params to ws server as of now

13. add a db package
14. add a common package where we can add zod schema and enviroment variables
15. use db package in http layer
