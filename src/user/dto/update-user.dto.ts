import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
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
