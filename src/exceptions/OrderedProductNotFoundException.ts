/**
 * @author: ntwari egide
 * @description: ordered product not found exception handler implementation
 */

import { HttpException, HttpStatus } from "@nestjs/common";

export class OrderedProductNotFoundException extends HttpException{
    constructor(message: String){
        super({
            status: HttpStatus.NOT_FOUND,
            error: message
        },HttpStatus.NOT_FOUND)
    }
}