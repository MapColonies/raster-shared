import type { Position } from 'geojson';

export const firstAndLastPositionsEquality = (positions: Position[]): boolean => {
  const first = positions.at(0);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const last = positions.at(-1);
  return first?.length === last?.length && (first?.every((coordinate, index) => coordinate === last?.at(index)) ?? false);
};
