import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { catchError } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
  const pokemon = await this.pokemonModel.create( createPokemonDto );
  return pokemon; 
    }catch(error){

      if( error.code === 11000){
        throw new BadRequestException(`El pokemon ya existe en la db ${ JSON.stringify( error.keyValue )}`
      );
      }
      console.log(error);
      throw new InternalServerErrorException('No se puede crear un pokemon - revise el log')
    }
}

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(id: string) {
    return await this.pokemonModel.findById(id);
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonModel.findByIdAndUpdate(id, updatePokemonDto, { new: true });
  }

  async remove(id: string) {
    return await this.pokemonModel.findByIdAndDelete(id);
  }

  async capture(id: string) {
  return this.pokemonModel.findByIdAndUpdate(
    id,
    { isCaptured: true },
    { new: true }
  );
}

async release(id: string) {
  return this.pokemonModel.findByIdAndUpdate(
    id,
    { isCaptured: false },
    { new: true }
  );
}
}