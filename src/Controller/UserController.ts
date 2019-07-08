import { createConnection, Connection } from "typeorm"
import { User } from "../Entity/User";
import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@JsonController()
export class UserController {

  conn: any = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "pass1234",
    database: "typeorm",
    entities: [
      "src/Entity/**/*.ts"
    ],
    autoSchemaSync: true
  }

  @Get('/users')
  @OnUndefined(404)
  getAllUsers() {
    createConnection(this.conn).then(async (connection: Connection) => {
      let userRepository = connection.getRepository(User)
      let users = await userRepository.find()
      return users
    })
    .catch(error => console.error(error))
  }

  @Get('/user/:id')
  @OnUndefined(404)
  getUserAction(@Param('id') id: number) {
    createConnection(this.conn).then(async (connection: Connection) => {
      let userRepository = connection.getRepository(User)
      let user  = await userRepository.findOne(id)
      return user
    })
    .catch(error => console.error(error))
  }

  @Post('/create/user')
  createUserAction(@Body() firstName: string, lastName: string, age: number) {
    createConnection(this.conn).then(async (connection: Connection) => {
      let user: any = new User()
      user.firstName = firstName
      user.lastName = lastName
      user.age = age

      let userRepository = connection.getRepository(User)

      await userRepository.save(user)
      return {message: "User created Successfully!", user: user}
    })
      .catch(error => console.error(error))
  }

  @Put('/user/:id')
  @OnUndefined(404)
  updateUserAction(@Param('id') id: number, @Body() firstName: string, lastName: string, age: number) {
    createConnection(this.conn).then(async (connection: Connection) => {
      let userRepository = connection.getRepository(User)
      let currentUser = await userRepository.findOne(id)
      if(currentUser) {
        currentUser.firstName = firstName
        currentUser.lastName = lastName
        currentUser.age = age
        await userRepository.save(currentUser)
        
        return { message: "User updated successfully!", user: currentUser}
      } else {
        return {message: "User not found."}
      }
    })
    .catch(error => console.error(error))
  }

  @Delete('/user/:id')
  @OnUndefined(404)
  deleteUserAction(@Param('id') id: number) {
    createConnection(this.conn).then(async (connection: Connection) => {
      let userRepository = connection.getRepository(User)
      let userToRemove = await userRepository.findOne(id)
      if(userToRemove) {
        await userRepository.remove(userToRemove)
        return { message: "User removed successfully!", user: userToRemove }
      } else {
        return { message: "User not found"}
      }
    })
    .catch(error => console.error(error))
  }
}