const genres = ["classic", "pop", "classic", "classic", "pop"];
const plays = [500, 600, 150, 800, 2500];
const checkUniqueGenres = genres.filter(
  (item, index) => genres.indexOf(item) === index
);

function solution(genres, plays) {
  let findPopIndex = [];
  let findClassicIndex = [];
  let findPopValue = [];
  let findClassicValue = [];
  let pops = genres.indexOf("pop");
  let classics = genres.indexOf("classic");
  let sumPlayedPop = 0;
  let sumPlayedClassic = 0;
  let answer = [];
  while (pops != -1) {
    findPopIndex.push(pops);
    pops = genres.indexOf("pop", pops + 1);
  }
  while (classics != -1) {
    findClassicIndex.push(classics);
    classics = genres.indexOf("classic", classics + 1);
  }
  for (let valuePop of findPopIndex) {
    sumPlayedPop += plays[valuePop];
    findPopValue.push(plays[valuePop]);
  }
  for (let valueClassic of findClassicIndex) {
    sumPlayedClassic += plays[valueClassic];
    findClassicValue.push(plays[valueClassic]);
  }

  for (let i = 0; i < findClassicValue.length; i++) {
    if (findClassicValue[i] === Math.min.apply(null, findClassicValue)) {
      findClassicValue.splice(i, 1);
      findClassicIndex.splice(i, 1);
    }
  }

  if (plays[findPopIndex[0]] < plays[findPopIndex[1]]) {
    [findPopIndex[0], findPopIndex[1]] = [findPopIndex[1], findPopIndex[0]];
  }
  if (plays[findClassicIndex[0]] < plays[findClassicIndex[1]]) {
    [findClassicIndex[0], findClassicIndex[1]] = [
      findClassicIndex[1],
      findClassicIndex[0]
    ];
  }

  return (answer = findPopIndex.concat(findClassicIndex));
}

console.log(solution(genres, plays));



function solution2(genres, plays) {
  const answer = [];
  const songs = genres.map((item, index) => {
    return { genres: item, plays: plays[index], id: index };
  });
  console.log(songs);
  const uniqGenres = genres.reduce((acc, currValue) => {
    /*
      check currValue is listed in acc
      if currValue is not listed in acc, returns -1
      after that push the currValue in acc
    */
    if (acc.indexOf(currValue) < 0) acc.push(currValue);
    return acc;
  }, []);
  console.log(uniqGenres);

  const sumPlays = uniqGenres.map(genres => {
    /*
      Create tempGenres to retrieve all plays value to accumulate
      tempGenres divides(filters) by same genres listed arrays for classics and pop
    */
    const tempGenres = songs.filter(song => song.genres === genres);
    console.log(tempGenres);
    const sum = tempGenres.reduce((acc, currValue) => {
      return acc + currValue.plays;
    }, 0);
    return { genres, plays: sum };
  });
  console.log(sumPlays);

  /* Sort by played time */

  sumPlays.sort(function(a, b) {
    if (a.plays > b.plays) {
      /* a is bigger, a comes first */
      return -1;
    }
    if (a.plays < b.plays) {
      /* b is bigger, b comes first */
      return 1;
    }
    return 0;
  });
  /* sumPlays[0] genres is now most played genres = plays highest */
  console.log(sumPlays);
  console.log(songs);
  const mostPopularSongs = sumPlays.map(genres => {
    return (
      songs
        /*
        check(filter) song's objects order is matches with target(sumPlays) objects order
        Most played genres' song should be placed in first
        */
        .filter(song => song.genres === genres.genres)
        /*
        check out sorting the order based on played count along with ids
        */
        .sort(function(a, b) {
          if (a.plays > b.plays) {
            return -1;
          }
          if (a.plays < b.plays) {
            return 1;
          }
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        })
        /*
        cut(filter) the arrays item till remain two elements
        */
        .filter((song, index) => index < 2)
    );
  });

  mostPopularSongs.forEach(genres => {
    genres.forEach(song => {
      answer.push(song.id);
    });
  });
  return answer
}

console.log(solution2(genres, plays));
