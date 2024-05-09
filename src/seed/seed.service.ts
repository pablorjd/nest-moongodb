import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-responde.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/http-adapter/axios.adapter';
@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async populateDB() {
    this.pokemonModel.deleteMany({});

    const insertPromiseArray: any[] = [];
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=800',
    );
    data.results.forEach(async ({ name, url }) => {
      const segment = url.split('/');
      const no = +segment[segment.length - 2];
      insertPromiseArray.push(this.pokemonModel.create({ name, no }));
    });

    await Promise.all(insertPromiseArray);
    return 'Seed Executed!';
  }
}
