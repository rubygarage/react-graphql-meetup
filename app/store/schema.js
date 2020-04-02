import { schema } from 'normalizr';

// profile
export const profile = new schema.Entity('profile');

// movies
export const movies = new schema.Entity('movies');

// cast
export const cast = new schema.Entity('cast');

// crew
export const crew = new schema.Entity('crew');

// movie
export const schemaMovie = new schema.Entity('movie', {
  credit: {
    cast: [cast],
    crew: [crew],
  }
});

// lists
export const lists = new schema.Entity('lists');
