import { Document } from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Pokemon extends Document {
    // id : string // mongo lo da 
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

    @Prop({
        default: false
    })
    isCaptured: boolean;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)