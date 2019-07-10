import { createConnection, Connection } from "typeorm"
import { User } from "../Entity/User";
import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete, Req, Res } from "routing-controllers";

@JsonController()
export class UserController {

  /**
   * Get an array of all users action method.
   * @param req 
   * @param res 
   */
  @Get("/users")
  @OnUndefined(404)
  public getAllUsers(@Req() req: any, @Res() res: any) {
    createConnection().then(async (connection: Connection) => {
      let userRepository = connection.getRepository(User)
      let users = await userRepository.find()
      return users
    })
    .catch(error => console.error(error))
  }

  /**
   * Get selected user action method.
   * @param req 
   * @param res 
   * @param id 
   */
  @Get("/user/:id")
  @OnUndefined(404)
  public getUserAction(@Req() req: any, @Res() res: any, @Param('id') id: number) {
    createConnection().then(async (connection: Connection) => {
      let userRepository = connection.getRepository(User)
      let user  = await userRepository.findOne(id)
      return user
    })
    .catch(error => console.error(error))
  }

  /**
   * Create user action method.
   * @param req 
   * @param res 
   * @param firstName 
   * @param lastName 
   * @param age 
   */
  @Post("/user/create")
  public createUserAction(@Req() req: any, @Res() res: any, @Body() firstName: string, lastName: string, age: number) {
    createConnection().then(async (connection: Connection) => {
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

  /**
   * Update user action method.
   * @param req 
   * @param res 
   * @param id 
   * @param firstName 
   * @param lastName 
   * @param age 
   */
  @Put("/user/:id")
  @OnUndefined(404)
  public updateUserAction(@Req() req: any, @Res() res: any, @Param('id') id: number, @Body() firstName: string, lastName: string, age: number) {
    createConnection().then(async (connection: Connection) => {
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

  /**
   * Delete user action method.
   * @param req 
   * @param res 
   * @param id 
   */
  @Delete("/user/:id")
  @OnUndefined(404)
  public deleteUserAction(@Req() req: any, @Res() res: any, @Param('id') id: number) {
    createConnection().then(async (connection: Connection) => {
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