import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.logError(error);
      if (error.code === 11000) throw new BadRequestException(error.message);
      throw new InternalServerErrorException(
        `Error creating Pokemon - Check your logs`,
      );
    }
  }

  async findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // MongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      await this.pokemonModel.updateOne(updatePokemonDto);
      return pokemon;
    } catch (error) {
      this.logError(error);
      if (error.code === 11000) throw new BadRequestException(error.message);
      throw new InternalServerErrorException(
        `Error creating Pokemon - Check your logs`,
      );
    }
  }

  async remove(id: string) {
    const pokemon = await this.findOne(id);
    // return pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const result = await this.pokemonModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new BadRequestException(
        `Error delete Pokemon - Check your logs ${id}`,
      );
    }
    return result;
  }

  logError(message: any) {
    console.log('🚀 ~ PokemonService ~ create ~ error:', message);
  }

  populateDB() {
    const primeros150Pokemon: CreatePokemonDto[] = [
      { name: 'bulbasaur', no: 1 },
      { name: 'ivysaur', no: 2 },
      { name: 'venusaur', no: 3 },
      { name: 'charmander', no: 4 },
      { name: 'charmeleon', no: 5 },
      { name: 'charizard', no: 6 },
      { name: 'squirtle', no: 7 },
      { name: 'wartortle', no: 8 },
      { name: 'blastoise', no: 9 },
      { name: 'caterpie', no: 10 },
      { name: 'metapod', no: 11 },
      { name: 'butterfree', no: 12 },
      { name: 'weedle', no: 13 },
      { name: 'kakuna', no: 14 },
      { name: 'beedrill', no: 15 },
      { name: 'pidgey', no: 16 },
      { name: 'pidgeotto', no: 17 },
      { name: 'pidgeot', no: 18 },
      { name: 'rattata', no: 19 },
      { name: 'raticate', no: 20 },
      { name: 'spearow', no: 21 },
      { name: 'fearow', no: 22 },
      { name: 'ekans', no: 23 },
      { name: 'arbok', no: 24 },
      { name: 'pikachu', no: 25 },
      { name: 'raichu', no: 26 },
      { name: 'sandshrew', no: 27 },
      { name: 'sandslash', no: 28 },
      { name: 'nidoran♀', no: 29 },
      { name: 'nidorina', no: 30 },
      { name: 'nidoqueen', no: 31 },
      { name: 'nidoran♂', no: 32 },
      { name: 'nidorino', no: 33 },
      { name: 'nidoking', no: 34 },
      { name: 'clefairy', no: 35 },
      { name: 'clefable', no: 36 },
      { name: 'vulpix', no: 37 },
      { name: 'ninetales', no: 38 },
      { name: 'jigglypuff', no: 39 },
      { name: 'wigglytuff', no: 40 },
      { name: 'zubat', no: 41 },
      { name: 'golbat', no: 42 },
      { name: 'oddish', no: 43 },
      { name: 'gloom', no: 44 },
      { name: 'vileplume', no: 45 },
      { name: 'paras', no: 46 },
      { name: 'parasect', no: 47 },
      { name: 'venonat', no: 48 },
      { name: 'venomoth', no: 49 },
      { name: 'diglett', no: 50 },
      { name: 'dugtrio', no: 51 },
      { name: 'meowth', no: 52 },
      { name: 'persian', no: 53 },
      { name: 'psyduck', no: 54 },
      { name: 'golduck', no: 55 },
      { name: 'mankey', no: 56 },
      { name: 'primeape', no: 57 },
      { name: 'growlithe', no: 58 },
      { name: 'arcanine', no: 59 },
      { name: 'poliwag', no: 60 },
      { name: 'poliwhirl', no: 61 },
      { name: 'poliwrath', no: 62 },
      { name: 'abra', no: 63 },
      { name: 'kadabra', no: 64 },
      { name: 'alakazam', no: 65 },
      { name: 'machop', no: 66 },
      { name: 'machoke', no: 67 },
      { name: 'machamp', no: 68 },
      { name: 'bellsprout', no: 69 },
      { name: 'weepinbell', no: 70 },
      { name: 'victreebel', no: 71 },
      { name: 'tentacool', no: 72 },
      { name: 'tentacruel', no: 73 },
      { name: 'geodude', no: 74 },
      { name: 'graveler', no: 75 },
      { name: 'golem', no: 76 },
      { name: 'ponyta', no: 77 },
      { name: 'rapidash', no: 78 },
      { name: 'slowpoke', no: 79 },
      { name: 'slowbro', no: 80 },
      { name: 'magnemite', no: 81 },
      { name: 'magneton', no: 82 },
      { name: "farfetch'd", no: 83 },
      { name: 'doduo', no: 84 },
      { name: 'dodrio', no: 85 },
      { name: 'seel', no: 86 },
      { name: 'dewgong', no: 87 },
      { name: 'grimer', no: 88 },
      { name: 'muk', no: 89 },
      { name: 'shellder', no: 90 },
      { name: 'cloyster', no: 91 },
      { name: 'gastly', no: 92 },
      { name: 'haunter', no: 93 },
      { name: 'gengar', no: 94 },
      { name: 'onix', no: 95 },
      { name: 'drowzee', no: 96 },
      { name: 'hypno', no: 97 },
      { name: 'krabby', no: 98 },
      { name: 'kingler', no: 99 },
      { name: 'voltorb', no: 100 },
      { name: 'electrode', no: 101 },
      { name: 'exeggcute', no: 102 },
      { name: 'exeggutor', no: 103 },
      { name: 'cubone', no: 104 },
      { name: 'marowak', no: 105 },
      { name: 'hitmonlee', no: 106 },
      { name: 'hitmonchan', no: 107 },
      { name: 'lickitung', no: 108 },
      { name: 'koffing', no: 109 },
      { name: 'weezing', no: 110 },
      { name: 'rhyhorn', no: 111 },
      { name: 'rhydon', no: 112 },
      { name: 'chansey', no: 113 },
      { name: 'tangela', no: 114 },
      { name: 'kangaskhan', no: 115 },
      { name: 'horsea', no: 116 },
      { name: 'seadra', no: 117 },
      { name: 'goldeen', no: 118 },
      { name: 'seaking', no: 119 },
      { name: 'staryu', no: 120 },
      { name: 'starmie', no: 121 },
      { name: 'mr. mime', no: 122 },
      { name: 'scyther', no: 123 },
      { name: 'jynx', no: 124 },
      { name: 'electabuzz', no: 125 },
      { name: 'magmar', no: 126 },
      { name: 'pinsir', no: 127 },
      { name: 'tauros', no: 128 },
      { name: 'magikarp', no: 129 },
      { name: 'gyarados', no: 130 },
      { name: 'lapras', no: 131 },
      { name: 'ditto', no: 132 },
      { name: 'eevee', no: 133 },
      { name: 'vaporeon', no: 134 },
      { name: 'jolteon', no: 135 },
      { name: 'flareon', no: 136 },
      { name: 'porygon', no: 137 },
      { name: 'omanyte', no: 138 },
      { name: 'omastar', no: 139 },
      { name: 'kabuto', no: 140 },
      { name: 'kabutops', no: 141 },
      { name: 'aerodactyl', no: 142 },
      { name: 'snorlax', no: 143 },
      { name: 'articuno', no: 144 },
      { name: 'zapdos', no: 145 },
      { name: 'moltres', no: 146 },
      { name: 'dratini', no: 147 },
      { name: 'dragonair', no: 148 },
      { name: 'dragonite', no: 149 },
      { name: 'mewtwo', no: 150 },
    ];
    primeros150Pokemon.forEach(async (p) => {
      await this.create(p);
    });

    console.log(primeros150Pokemon);
  }
}
