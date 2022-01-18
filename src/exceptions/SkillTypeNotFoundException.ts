/**
 * @author: ntwari egide
 * @description: skill type not found exception handler implementation
 */

import { HttpException, HttpStatus } from "@nestjs/common";

export class SkillsTypeNotFoundException extends HttpException{
    constructor(message: String){
        super({
            status: HttpStatus.NOT_FOUND,
            error: message
        },HttpStatus.NOT_FOUND)
    }
}