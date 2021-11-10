/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
// const { response } = require('../../src/app.js');
const app = require('../../src/app.js');
// const { Recipe, conn } = require('../../src/db.js');

// const agent = request(app);
// const recipe = {
//   name: 'Milanea a la napolitana',
// };

describe('Recipe routes TEST', () => {
  it('GET /recipes deberia traer TODAS las recetas', () => {
    return request(app)
    .get('/api/recipes')
    .expect('Content-Type', /json/)
    .expect(200)
    .then( response => {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            image: expect.any(String),
            score: expect.any(Number),
            summary: expect.any(String),
            healthScore: expect.any(Number),
            diets: expect.any(Array)
          }),
        ])
      )
    })
  })

  it('GET /recipes by name deberia traer las recetas que coincidan con el nombre deseado', () => {
    return request(app)
    .get('/api/recipes?title=ravioles')
    .expect('Content-Type', /json/)
    .expect(200)
    .then( response => {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            image: expect.any(String),
            score: expect.any(Number),
            summary: expect.any(String),
            healthScore: expect.any(Number),
          }),
        ])
      )
    })
  })
})  


// describe('Recipe routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Recipe.sync({ force: true })
//     .then(() => Recipe.create(recipe)));
//   describe('GET /recipes', () => {
//     it('should get 200', () =>
//       agent.get('/recipes').expect(200)
//     );
//   });
// });
