import type { PokemonStat } from '@/services/pokemon';

export type Winner = 'left' | 'right' | 'tie';

export type StatComparison = {
  name: string;
  left: number;
  right: number;
  winner: Winner;
};

function getWinner(left: number, right: number): Winner {
  if (left === right) {
    return 'tie';
  }
  return left > right ? 'left' : 'right';
}

function sum(stats: PokemonStat[]): number {
  return stats.reduce((total, stat) => total + stat.value, 0);
}

// One row per stat of the left Pokémon, matched by name, plus the total of the six.
export function compareStats(
  left: PokemonStat[],
  right: PokemonStat[],
): { rows: StatComparison[]; total: StatComparison } {
  const rows = left.map((stat) => {
    const rightValue = right.find((other) => other.name === stat.name)?.value ?? 0;
    return { name: stat.name, left: stat.value, right: rightValue, winner: getWinner(stat.value, rightValue) };
  });
  const leftTotal = sum(left);
  const rightTotal = sum(right);
  return {
    rows,
    total: { name: 'total', left: leftTotal, right: rightTotal, winner: getWinner(leftTotal, rightTotal) },
  };
}
