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
  public async getAllUsers(@Req() req: any, @Res() res: any) {
    let connection = await createConnection()
    let userRepository = await connection.getRepository(User)
    let users = await userRepository.find()
    res.send(users)
    connection.close()
  }

  /**
   * Get selected user action method.
   * @param req 
   * @param res 
   * @param id 
   */
  @Get("/user/:id")
  @OnUndefined(404)
  public async getUserAction(@Req() req: any, @Res() res: any, @Param('id') id: number) {
    let connection = await createConnection()
    let userRepository = await connection.getRepository(User)
    let user = await userRepository.findOne(id)
    res.send(user)
    connection.close()
  }

  /**
   * Create user action method.
   * @param req 
   * @param res 
   * @param body 
   */
  @Post("/user/create")
  public async createUserAction(@Req() req: any, @Res() res: any, @Body() body: User) {
    let connection  = await createConnection()
    let user: User  = new User()
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.age  = body.age
    let userRepository = await connection.getRepository(User)
    await userRepository.save(user)
    res.send({message: "User created Successfully!", user: user})
    connection.close()
  }

  /**
   * Update user action method.
   * @param req 
   * @param res 
   * @param id 
   * @param body 
   */
  @Put("/user/:id")
  @OnUndefined(404)
  public async updateUserAction(@Req() req: any, @Res() res: any, @Param('id') id: number, @Body() body: User) {
    let connection = await createConnection()
    let userRepository = await connection.getRepository(User)
    let currentUser = await userRepository.findOne(id)
    if(currentUser) {
      currentUser.firstName = body.firstName
      currentUser.lastName = body.lastName
      currentUser.age = body.age
      await userRepository.save(currentUser)
      res.send({ message: "User updated successfully!", user: currentUser})
    } else {
      res.send({message: "User not found."})
    }
    connection.close()
  }

  /**
   * Delete user action method.
   * @param req 
   * @param res 
   * @param id 
   */
  @Delete("/user/:id")
  @OnUndefined(404)
  public async deleteUserAction(@Req() req: any, @Res() res: any, @Param('id') id: number) {
    let connection = await createConnection()
    let userRepository = await connection.getRepository(User)
    let user = await userRepository.findOne(id)
    if(user) {
      await userRepository.remove(user)
      res.send({ message: "User removed successfully!", user: user })
    } else {
      res.send({ message: "User not found" })
    }
    connection.close()
  }
}