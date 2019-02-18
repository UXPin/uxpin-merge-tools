import { SpawnOptions } from 'child_process';

export function getSpawnOptions():SpawnOptions {
  return {
    detached: true,
    shell: true,
  };
}
