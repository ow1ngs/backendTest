import { musicSchema } from "./getSongs/schema";

export const mockedUsers = [
  {
    userId: 1,
    name: 'Juan Diego',
    email: 'jd.sg1@hotmail.com',
    password: 'Password123!'
  },
  {
    userId: 2,
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: 'Password456#'
  }
];

export const mockedSongs: musicSchema[] = [
  {
    id: 1,
    artist: 'Depeche Mode',
    songName: 'Enjoy the Silence',
    year: '1990',
    album: 'Violator',
    visibility: 'private',
    createdBy: 'john.doe@email.com'
  },
  {
    id: 2,
    artist: 'The Cure',
    songName: 'Lovesong',
    year: '1989',
    album: 'Disintegration',
    visibility: 'private',
    createdBy: 'jd.sg1@hotmail.com'
  },
  {
    id: 3,
    artist: 'Pet shop boys',
    songName: 'West end girls',
    year: '1986',
    album: 'Please',
    visibility: 'private',
    createdBy: 'john.doe@email.com'
  },
  {
    id: 4,
    artist: 'R.E.M',
    songName: 'Losing my religion',
    year: '1991',
    album: 'Out of Time',
    visibility: 'private',
    createdBy: 'jd.sg1@hotmail.com'
  },
  {
    id: 5,
    artist: 'The Police',
    songName: 'Every breath you take',
    year: '1983',
    album: 'Synchronicity',
    visibility: 'private',
    createdBy: 'john.doe@email.com'
  },
  {
    id: 6,
    artist: 'Depeche Mode',
    songName: 'Personal jesus',
    year: '1989',
    album: 'Die internationalen Top Hits aus den Hitparaden 1989 Extra',
    visibility: 'public'
  },
  {
    id: 7,
    artist: 'The Police',
    songName: 'Walking on the moon',
    year: '1979',
    album: 'Reggatta de Blanc',
    visibility: 'public'
  },
  {
    id: 8,
    artist: 'Guns N` Roses',
    songName: 'Sweet child O`Mine',
    year: '1987',
    album: 'Appetite for Destruction',
    visibility: 'public'
  },
  {
    id: 9,
    artist: 'Bon Jovi',
    songName: 'Livin` on a Prayer',
    year: '1986',
    album: ' Slippery When Wet',
    visibility: 'public'
  },
  {
    id: 10,
    artist: 'AC/DC',
    songName: 'Back in Black',
    year: '1980',
    album: 'Back in Black',
    visibility: 'public'
  }
]
