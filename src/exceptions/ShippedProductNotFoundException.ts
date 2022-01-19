/**
 * @author: ntwari egide
 * @description: shipped product not found exception handler implementation
 */

import { HttpException, HttpStatus } from "@nestjs/common";

export class ShippedProductNotFoundException extends HttpException{
    constructor(message: String){
        super({
            status: HttpStatus.NOT_FOUND,
            error: message
        },HttpStatus.NOT_FOUND)
    }
}