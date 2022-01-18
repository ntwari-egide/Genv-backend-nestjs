/**
 * @author: ntwari egide
 * @description: product not found exception handler implementation
 */

import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNotFoundException extends HttpException{
    constructor(message: String){
        super({
            status: HttpStatus.NOT_FOUND,
            error: message
        },HttpStatus.NOT_FOUND)
    }
}