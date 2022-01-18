/**
 * @author: ntwari egide
 * @description: User service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.interface';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/exceptions/UserNotFoundException';

@Injectable()
export class UserService {

  constructor(  
    @Inject('USER_MODEL')
    private userModal: Model<User>
  ){}

  private readonly logger = new Logger(UserService.name)

  async create(createUserDto: CreateUserDto): Promise<User> {

    const saltOrRounds = 10;

    let createUser = new this.userModal(createUserDto)

    createUser.password =  await bcrypt.hash(createUser.password, saltOrRounds);

    return createUser.save()
  }

  async findAll(): Promise<User[]> {

    this.logger.log('Getting list of all users')

    return this.userModal.find().exec()

  }

  checkUserExistance = (id: String) : User => {
    let user : any
    try {
      user = this.userModal.findById(id).exec()

      this.logger.log('Getting user with id : '+id)
      
    } catch (error) {

      this.logger.log('Getting user with id: '+id+" has failed")

      throw new UserNotFoundException('User with id '+id+ ' is not found')

    }

    return user
  }

  async findOne(id: String): Promise<User> {

    return this.checkUserExistance(id)

  }

  async update(id: String, updateUserDto: UpdateUserDto): Promise<User> {
    
    this.checkUserExistance(id)

    this.logger.log('Updating user with id : '+id)
    return this.userModal.findByIdAndUpdate(id,updateUserDto).exec()

  }

  async remove(id: String) {
    
    this.checkUserExistance(id)

    this.logger.log('Deleting user with id : '+id)

    return this.userModal.findByIdAndRemove(id).exec()

  }
}
