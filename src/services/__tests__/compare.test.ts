import { compareStats } from '@/services/compare';

function stats(hp: number, attack: number, defense: number) {
  return [
    { name: 'hp', value: hp },
    { name: 'attack', value: attack },
    { name: 'defense', value: defense },
  ];
}

describe('compareStats', () => {
  it('gives the winner of each stat', () => {
    const { rows } = compareStats(stats(35, 55, 40), stats(45, 49, 40));

    expect(rows).toEqual([
      { name: 'hp', left: 35, right: 45, winner: 'right' },
      { name: 'attack', left: 55, right: 49, winner: 'left' },
      { name: 'defense', left: 40, right: 40, winner: 'tie' },
    ]);
  });

  it('adds a total row with its own winner', () => {
    const { total } = compareStats(stats(35, 55, 40), stats(45, 49, 40));

    expect(total).toEqual({ name: 'total', left: 130, right: 134, winner: 'right' });
  });

  it('gives a tie when the totals are equal', () => {
    const { rows, total } = compareStats(stats(50, 60, 40), stats(60, 50, 40));

    expect(rows.map((row) => row.winner)).toEqual(['right', 'left', 'tie']);
    expect(total).toEqual({ name: 'total', left: 150, right: 150, winner: 'tie' });
  });

  it('compares the six stats of two real Pokémon', () => {
    const pikachu = [35, 55, 40, 50, 50, 90];
    const bulbasaur = [45, 49, 49, 65, 65, 45];
    const names = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    const toStats = (values: number[]) => names.map((name, index) => ({ name, value: values[index] }));

    const { rows, total } = compareStats(toStats(pikachu), toStats(bulbasaur));

    expect(rows.map((row) => row.winner)).toEqual(['right', 'left', 'right', 'right', 'right', 'left']);
    expect(total).toEqual({ name: 'total', left: 320, right: 318, winner: 'left' });
  });

  it('matches stats by name, not by position', () => {
    const right = stats(45, 49, 49).reverse();

    const { rows } = compareStats(stats(35, 55, 40), right);

    expect(rows.map((row) => row.right)).toEqual([45, 49, 49]);
  });
});
