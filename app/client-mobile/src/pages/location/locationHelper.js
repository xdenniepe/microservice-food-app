const FindDistance = (latlngA, latlngB, isMiles) => {
  const squared = (x) => x * x;
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth’s mean radius in km

  const dLat = toRad(latlngB[0] - latlngA[0]);
  const dLon = toRad(latlngB[1] - latlngA[1]);

  const dLatSin = squared(Math.sin(dLat / 2));
  const dLonSin = squared(Math.sin(dLon / 2));

  const a =
    dLatSin +
    Math.cos(toRad(latlngA[0])) * Math.cos(toRad(latlngB[0])) * dLonSin;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c;

  if (isMiles) distance /= 1.609344;

  return distance;
};

export const temporaryLocations = [
  {
    address: "Miami Beach North Dakota 58563",
    latitude: 14.599512,
    longitude: 120.984222,
  },
  {
    address: "Noah Tonkin 86 Baker St.North Sydney NSW 2156Australia",
    latitude: 15.018039,
    longitude: 120.703266,
  },
  {
    address: "Calista Wise  7292 Dictum Av.San Antonio MI 47096",
    latitude: 14.988856,
    longitude: 120.601575,
  },
  {
    address: "Forrest Ray  191-103 Integer Rd.Corona New Mexico 08219",
    latitude: 15.020692,
    longitude: 130,
  },
  { 
    address: "Jesus is Lord Colleges, Bocaue, Bulacan",
    latitude: 14.7864,
    longitude: 120.931,
  },
  {
    address: "SM Baliwag, Bulacan",
    latitude: 14.9448,
    longitude: 120.89,
  },
  {
    address: "Robinsons Place Malolos, Bulacan",
    latitude: 14.8419,
    longitude: 120.812,
  },
];

export default FindDistance;

