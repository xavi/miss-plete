// https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance

function jaro(s1, s2) {
  let shorter, longer;

  [longer, shorter] = s1.length > s2.length ? [s1, s2] : [s2, s1];

  const matchingWindow = Math.floor(longer.length / 2) - 1;
  const shorterMatches = [];
  const longerMatches = [];

  for (let i = 0; i < shorter.length; i++) {
    let ch = shorter[i];
    const windowStart = Math.max(0, i - matchingWindow);
    const windowEnd = Math.min(i + matchingWindow + 1, longer.length);
    for (let j = windowStart; j < windowEnd; j++) {
      if (longerMatches[j] === undefined && ch === longer[j]) {        
        shorterMatches[i] = longerMatches[j] = ch;
        break;
      }
    }
  }

  const shorterMatchesString = shorterMatches.join("");
  const longerMatchesString = longerMatches.join("");
  const numMatches = shorterMatchesString.length;

  let transpositions = 0;
  for (let i = 0; i < shorterMatchesString.length; i++) {
    if (shorterMatchesString[i] !== longerMatchesString[i]) {
      transpositions++;
    }
  }

  return numMatches > 0
    ? (
        numMatches / shorter.length +
        numMatches / longer.length +
        (numMatches - Math.floor(transpositions / 2)) / numMatches
      ) / 3.0
    : 0;
}

export default function(s1, s2, prefixScalingFactor = 0.2) {
  const jaroSimilarity = jaro(s1, s2);

  let commonPrefixLength = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] === s2[i]) { commonPrefixLength++; } else { break; }
  }

  return jaroSimilarity +
    Math.min(commonPrefixLength, 4) *
    prefixScalingFactor *
    (1 - jaroSimilarity);
}
