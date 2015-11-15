// Otherwise `let` doesn't work:
// Uncaught SyntaxError: Block-scoped declarations (let, const, function, class)
// not yet supported outside strict mode
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//"use strict";

// Based on
// https://en.wikipedia.org/wiki/Levenshtein_distance#Recursive

// performance.now()
// https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
// http://stackoverflow.com/a/1975103/974795

// It takes quite a long time with long string, ex. computing the distance
// between
// vanglad
// and
// British Indian Ocean Territory
// or
// vanglade
// and
// Bonaire, Sint Eustatius and Saba


// #TODO Implement my own Levenshtein, first recursively and then with the
// matrix (see explanation in
// https://en.wikipedia.org/wiki/Levenshtein_distance#Iterative_with_full_matrix )
// https://github.com/gf3/Levenshtein/blob/master/lib/levenshtein.js
//
// It may not be necessary to compute the whole matrix...
// "If you first fill the matrix with -1 to indicate the corresponding edit
// distance between the prefixes has not been evaluated, and recursively
// calculate d[l1][l2], using the cached value of a needed d[i][j] if it has
// already been computed, computing it recursively and storing its value if
// not, some regions of the matrix may remain untouched. Possibly large
// regions if there are many pairs of equal characters [only the diagonal
// will be evaluated if the two words are equal], only small regions if any
// if there are few pairs of equal characters.
//
// In the generic case, most of the matrix is needed to compute d[l1][l2],
// so then it is faster to compute the matrix completely using the simple
// algorithm than to recur and compute only the actually required values."
// http://stackoverflow.com/a/13980874

// function computeLevenshteinDistance(s1, s2) {
//   if (s1.length === 0) {
//     return s2.length;
//   }
//   if (s2.length === 0) {
//     return s1.length;
//   }

//   // https://github.com/airbnb/javascript#references
//   const s1ButLast = s1.substr(0, s1.length - 1);
//   const s2ButLast = s2.substr(0, s2.length - 1);
//   return Math.min(
//     // Deletion
//     computeLevenshteinDistance(s1ButLast, s2) + 1,
//     // Insertion
//     computeLevenshteinDistance(s1, s2ButLast) + 1,
//     // Substitution
//     computeLevenshteinDistance(s1ButLast, s2ButLast)
//       + (s1.charAt(s1.length - 1) === s2.charAt(s2.length - 1) ? 0 : 1)
//   );
// }


// Based on
// https://en.wikipedia.org/wiki/Levenshtein_distance#Iterative_with_full_matrix
//
// function LevenshteinDistance(char s[1..m], char t[1..n]):
//   // for all i and j, d[i,j] will hold the Levenshtein distance between
//   // the first i characters of s and the first j characters of t;
//   // note that d has (m+1)*(n+1) values
//   declare int d[0..m, 0..n]
 
//   set each element in d to zero
 
//   // source prefixes can be transformed into empty string by
//   // dropping all characters
//   for i from 1 to m:
//       d[i, 0] := i
 
//   // target prefixes can be reached from empty source prefix
//   // by inserting every character
//   for j from 1 to n:
//       d[0, j] := j
 
//   for j from 1 to n:
//       for i from 1 to m:
//           if s[i] = t[j]:
//             d[i, j] := d[i-1, j-1]              // no operation required
//           else:
//             d[i, j] := minimum(d[i-1, j] + 1,   // a deletion
//                                d[i, j-1] + 1,   // an insertion
//                                d[i-1, j-1] + 1) // a substitution
 
//   return d[m, n]


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


  // [] vs new Array(m)
  // http://stackoverflow.com/a/3132371
  // but
  // Use the literal syntax for array creation.
  // https://github.com/airbnb/javascript#4.1
  // If you must mutate references, use let instead of var.
  // https://github.com/airbnb/javascript#references
  let distances = [[0]];
  // source prefixes can be transformed into empty string by dropping all
  // characters
  // So source is at the left column
  // (here source is the top row
  //  http://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Fall2006/Assignments/editdistance/Levenshtein%20Distance.htm
  // but I think usuallyi is at the left
  // https://en.wikipedia.org/wiki/Levenshtein_distance#Iterative_with_full_matrix
  //  )

  // let-declared iteration variables in for loops and for-in loops
  // http://www.2ality.com/2015/02/es6-iteration.html

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
      // string.charAt(x) or string[x]?
      // http://stackoverflow.com/questions/5943726/string-charatx-or-stringx
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

// Diagram
// "The above steps are shown as the yellow blocks below with the solid red
// arrows pointing in the opposite direction from the process above:"
// https://www.clear.rice.edu/comp130/12spring/editdist/


// #Applications
// There are lots of applications of Levenshtein distance. It is used in
// biology to find similar sequences of nucleic acids in DNA or amino acids
// in proteins. It is used in some spell checkers to guess at which word
// (from a dictionary) is meant when an unknown word is encountered. Wilbert
// Heeringa's dialectology project uses Levenshtein distance to estimate the
// proximity of dialect pronunciations. And some translation assistance
// projects have used the alignment capability of the algorithm in order to
// discover (the approximate location of) good translation equivalents. This
// application, using potentially large texts, requires optimisations to run
// effectively.
// http://www.let.rug.nl/~kleiweg/lev/levenshtein.html