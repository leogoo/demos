import { SetMetadata } from '@nestjs/common';
export const CustomClass = (...args: string[]) => SetMetadata('meta-a', args);
