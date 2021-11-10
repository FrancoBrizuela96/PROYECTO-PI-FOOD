const request = require('supertest');
const app = require('../../src/app.js');
const { Recipes } = require('../../src/db.js');

describe('FOOD API', () => {
    beforeEach(() => Recipes.sync({ force: true }));
    it('POST /recipes --> Create new recipe on DB', () => {
      return request(app)
        .post('/api/recipes')
        .send({
          title: 'testingTitle',
          summary: 'description',
          score: 99.5,
          healthScore: 48.4,
          image:'https://w7.pngwing.com/pngs/129/440/png-transparent-dbz-son-goku-goku-gohan-blu-ray-disc-dvd-dragon-ball-dragon-ball-z-orange-fictional-character-cartoon.png',
          diets: ['Vegan, Vegetarian']
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              title: 'testingTitle',
              score: expect.any(Number),
            })
          );
        });
    });
  });