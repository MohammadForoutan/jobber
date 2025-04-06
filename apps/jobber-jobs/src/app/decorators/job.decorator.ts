import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { JobMetadata } from '../interfaces/job-metadata.interface';

export const JOB_METADATA_KEY = 'job';

export const Job = (meta: JobMetadata) =>
  applyDecorators(
    SetMetadata(JOB_METADATA_KEY, meta),
    // We use Injectable to make sure that the job class is treated as a class by the nestjs DI system
    // This allows us to inject other dependencies into the job class
    Injectable()
  );
