/**
 * @author: ntwari egide
 * @description: create user dto
 */

import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

  
    @ApiProperty({
        description: "User name of new user",
        default: 'usernameexample',
        type: String
    })
    username: String
  
    @ApiProperty({
        description: "Password of new user",
        default: 'Example@2021',
        minimum: 8,
        type: String
    })
    password: String
  
    @ApiProperty({
        description: "Date of signup",
        type: Date
    })
    joinedAt: Date

    @ApiProperty({
        description: "Date of profile update",
        type: Date
    })
    updatedAt: Date
    
    @ApiProperty({
        description: "Is user verified",
        type: Boolean
    })
    verified: Boolean
}
