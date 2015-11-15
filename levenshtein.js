export default function(source, target) {
  // Uses the Wagner-Fischer algorithm, which uses a distances matrix to avoid
  // repeating the same distance calculations multiple times, thus solving the
  // problem of a simpler but inefficient recursive algorithm.
  // https://en.wikipedia.org/wiki/Levenshtein_distance#Computing_Levenshtein_distance
  //
  // The `distances` matrix:
  //
  //        T   A   R   G   E   T
  //
  //     0 | 1 | 2 | 3 | 4 | 5 | 6   i=0
  //    ---+---+---+---+---+---+---
  // S   1 |   |   |   |   |   |     i=1
  //    ---+---+---+---+---+---+---
  // O   2 |   |   |   |   |   |     i=2
  //    ---+---+---+---+---+---+---
  // U   3 |   |   |   |   |   |     i=3
  //    ---+---+---+---+---+---+---
  // R   4 |   |   |   |   |   |     i=4
  //    ---+---+---+---+---+---+--- 
  // C   5 |   |   |   |   |   |     i=5
  //    ---+---+---+---+---+---+---  
  // E   6 |   |   |   |   |   |     i=6
  //    ---+---+---+---+---+---+--- 
  //
  //   j=0 j=1 j=2 j=3 j=4 j=5 j=6
  //
  // distances[i][j] will hold the Levenshtein distance between
  // the first i characters of source and the first j characters of target

  let distances = [[0]];

  // Imagine `source` to the left of the leftmost column
  // Distances from each of the source prefixes to an empty target string
  for (let i = 1; i <= source.length; i++) {
    distances[i] = [];
    distances[i][0] = i;
  }

  // Distances from empty string to each of the target prefixes
  for (let j = 1; j <= target.length; j++) {
    distances[0][j] = j;
  }

  for (let j = 1; j <= target.length; j++) {
    for (let i = 1; i <= source.length; i++) {
      distances[i][j] = source.charAt(i - 1) === target.charAt(j - 1)
        ? distances[i-1][j-1]
        : Math.min(
            distances[i - 1][j] + 1,  // delete char from source
            distances[i][j - 1] + 1,  // insert target char
            distances[i - 1][j - 1] + 1  // replace source char with target char
          );
    }
  }

  return distances[source.length][target.length];
}
