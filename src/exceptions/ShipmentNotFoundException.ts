/**
 * @author: ntwari egide
 * @description: shipment not found exception handler implementation
 */

import { HttpException, HttpStatus } from "@nestjs/common";

export class ShipmentNotFoundException extends HttpException{
    constructor(message: String){
        super({
            status: HttpStatus.NOT_FOUND,
            error: message
        },HttpStatus.NOT_FOUND)
    }
}