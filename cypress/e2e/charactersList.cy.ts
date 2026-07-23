import { CharacterResponse, PageData } from '@shared/domain';

describe('Characters list', () => {
  type ListResponse = PageData<CharacterResponse>;

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        pathname: '**/api/character'
      },
      {
        statusCode: 200,
        fixture: 'charactersList/success.json'
      }
    ).as('getCharacters');

    cy.fixture('charactersList/success.json').as('characters');

    cy.intercept(
      {
        method: 'GET',
        pathname: '**/api/character',
        query: { name: 'rick' }
      },
      {
        statusCode: 200,
        fixture: 'charactersList/successFiltered.json'
      }
    ).as('getCharactersFiltered');

    cy.fixture('charactersList/successFiltered.json').as('charactersFiltered');

    cy.visit('/');
  });

  it('Check characters count', function () {
    cy.wait('@getCharacters').its('response.statusCode').should('eq', 200);

    const response: ListResponse = this.characters;
    cy.get('.list__content')
      .find('.list__item')
      .should('have.length', response.results.length);
  });

  it('Check characters names', function () {
    cy.wait('@getCharacters').its('response.statusCode').should('eq', 200);

    const response: ListResponse = this.characters;
    const characters = response.results;

    const cards = cy.get('.list__content').find('.character-card');
    cards.should('have.length', characters.length);

    cards.each((item, index) => {
      const { name } = characters[index];
      cy.wrap(item).within(() => {
        cy.get('.character-card__title').should('have.text', name);
      });
    });
  });

  it('Check filter', function () {
    cy.wait('@getCharacters').its('response.statusCode').should('eq', 200);

    let response: ListResponse = this.characters;
    cy.get('.list__content')
      .find('.list__item')
      .should('have.length', response.results.length);

    const field = cy.get(
      '.list__filter.character-filter .input-field:nth-child(1)'
    );
    const fieldInput = field.get('input.input-field__value');
    fieldInput.clear().type('Rick');

    cy.wait('@getCharactersFiltered')
      .its('response.statusCode')
      .should('eq', 200);

    response = this.charactersFiltered;
    cy.get('.list__content')
      .find('.list__item')
      .should('have.length', response.results.length);
  });
});
