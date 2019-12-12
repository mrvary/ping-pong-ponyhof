const dummyPlayers = [
  {
    id: 'PLAYER1',
    person: {
      birthyear: '1971',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'ESV SF Neuaubing',
      'club-nr': '311062',
      firstname: 'Gerhard',
      'internal-nr': 'NU2099417',
      lastname: 'Brandl',
      'licence-nr': '311062281',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '986'
    },
    type: 'single'
  },
  {
    id: 'PLAYER2',
    person: {
      birthyear: '1971',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'SC Baldham-Vaterstetten',
      'club-nr': '311006',
      firstname: 'Achim',
      'internal-nr': 'NU1012534',
      lastname: 'Fiesler',
      'licence-nr': '311006257',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1590'
    },
    type: 'single'
  },
  {
    id: 'PLAYER3',
    person: {
      birthyear: '1980',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TTC Friedberg',
      'club-nr': '309036',
      firstname: 'Ulrich',
      'internal-nr': 'NU1535004',
      lastname: 'Hartmann',
      'licence-nr': '309036278',
      region: 'Schwaben-Nord',
      sex: '1',
      'sub-region': 'Schwaben-Nord',
      ttr: '1474'
    },
    type: 'single'
  },
  {
    id: 'PLAYER4',
    person: {
      birthyear: '2003',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TTC Perlach',
      'club-nr': '311066',
      firstname: 'Jonas Karl',
      'internal-nr': 'NU1831615',
      lastname: 'Hofmann',
      'licence-nr': '311066398',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1034'
    },
    type: 'single'
  },
  {
    id: 'PLAYER5',
    person: {
      birthyear: '1962',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TuS Bad Aibling',
      'club-nr': '416006',
      firstname: 'Hermann',
      'internal-nr': 'NU1620366',
      lastname: 'Hoppe',
      'licence-nr': '416006353',
      region: 'Oberbayern-Ost',
      sex: '1',
      'sub-region': 'Oberbayern-Ost',
      ttr: '1198'
    },
    type: 'single'
  },
  {
    id: 'PLAYER6',
    person: {
      birthyear: '1996',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'MTV München von 1879',
      'club-nr': '311050',
      firstname: 'Georg',
      'internal-nr': 'NU1998215',
      lastname: 'Kohl',
      'licence-nr': '311050018',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1120'
    },
    type: 'single'
  },
  {
    id: 'PLAYER7',
    person: {
      birthyear: '1988',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TSV Waldtrudering',
      'club-nr': '311082',
      firstname: 'Udo',
      'internal-nr': 'NU1395365',
      lastname: 'Mardaus',
      'licence-nr': '311082250',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1325'
    },
    type: 'single'
  },
  {
    id: 'PLAYER8',
    person: {
      birthyear: '1953',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'FT München-Blumenau 1966',
      'club-nr': '311052',
      firstname: 'Robert',
      'internal-nr': 'NU1034205',
      lastname: 'Motschenbach',
      'licence-nr': '311052103',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1198'
    },
    type: 'single'
  },
  {
    id: 'PLAYER9',
    person: {
      birthyear: '1977',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TSC München-Maxvorstadt',
      'club-nr': '311055',
      firstname: 'Ali',
      'internal-nr': 'NU1968031',
      lastname: 'Poyan',
      'licence-nr': '311055215',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1222'
    },
    type: 'single'
  },
  {
    id: 'PLAYER10',
    person: {
      birthyear: '1964',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'SV-DJK Taufkirchen',
      'club-nr': '311076',
      firstname: 'Silvo',
      'internal-nr': 'NU1045240',
      lastname: 'Schaller',
      'licence-nr': '311076238',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1405'
    },
    type: 'single'
  },
  {
    id: 'PLAYER11',
    person: {
      birthyear: '1964',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'Gautinger SC',
      'club-nr': '312020',
      firstname: 'Michael',
      'internal-nr': 'NU1579327',
      lastname: 'Schedel',
      'licence-nr': '312020378',
      region: 'Oberbayern-Süd',
      sex: '1',
      'sub-region': 'Oberbayern-Süd',
      ttr: '1190'
    },
    type: 'single'
  },
  {
    id: 'PLAYER12',
    person: {
      birthyear: '1952',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TSV Zorneding 1920',
      'club-nr': '311084',
      firstname: 'Adel',
      'internal-nr': 'NU1052100',
      lastname: 'Shalaby',
      'licence-nr': '311084231',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1183'
    },
    type: 'single'
  },
  {
    id: 'PLAYER13',
    person: {
      birthyear: '1984',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TTC Perlach',
      'club-nr': '311066',
      firstname: 'Michael',
      'internal-nr': 'NU1065390',
      lastname: 'Weisbein',
      'licence-nr': '311066243',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1559'
    },
    type: 'single'
  },
  {
    id: 'PLAYER14',
    person: {
      birthyear: '1974',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TSV Alteglofsheim',
      'club-nr': '413003',
      firstname: 'Gerald',
      'internal-nr': 'NU1063940',
      lastname: 'Weiß',
      'licence-nr': '413003050',
      region: 'Oberpfalz-Süd',
      sex: '1',
      'sub-region': 'Oberpfalz-Süd',
      ttr: '1585'
    },
    type: 'single'
  },
  {
    id: 'PLAYER15',
    person: {
      birthyear: '1981',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'SV Helfendorf',
      'club-nr': '311025',
      firstname: 'Matthias',
      'internal-nr': 'NU1928190',
      lastname: 'Wurm',
      'licence-nr': '311025183',
      region: 'Oberbayern-Mitte',
      sex: '1',
      'sub-region': 'Oberbayern-Mitte',
      ttr: '1098'
    },
    type: 'single'
  },
  {
    id: 'PLAYER16',
    person: {
      birthyear: '1993',
      'club-federation-nickname': 'ByTTV',
      'club-name': 'TSV Alteglofsheim',
      'club-nr': '413003',
      firstname: 'Tino',
      'internal-nr': 'NU1062931',
      lastname: 'Wötzel',
      'licence-nr': '413003170',
      region: 'Oberpfalz-Süd',
      sex: '1',
      'sub-region': 'Oberpfalz-Süd',
      ttr: '1543'
    },
    type: 'single'
  }
];

export default dummyPlayers;
