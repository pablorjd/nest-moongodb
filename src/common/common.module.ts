import { Module } from '@nestjs/common';
import { AxiosAdapter } from './http-adapter/axios.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
