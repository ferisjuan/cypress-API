/// <reference types="Cypress" />

describe('REST API Test with Cypress', () => {
	it('API Test - Valllidate Headers', () => {
		cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
		cy.get('@pokemon')
			.its('headers')
			.its('content-type')
			.should('include', 'application/json; charset=utf-8')
	})

	it('API test - Validate Status Code', () => {
		cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
		cy.get('@pokemon').its('status').should('equal', 200)
	})

	it('API test - Validate Name Value', () => {
		cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
		cy.get('@pokemon').its('body').should('include', { name: 'pikachu' })
	})

	it('API test - Validate Negative Status Code', () => {
		cy.request({
			method: 'GET',
			url: 'https://pokeapi.co/api/v2/pokemon/1000',
			failOnStatusCode: false,
		}).as('pokemon')
		cy.get('@pokemon').its('status').should('equal', 404)
	})

	it('API test - Validate Chuck Norris Jokes API', () => {
		cy.request({
			method: 'GET',
			url: 'https://api.chucknorris.io/jokes/random',
		}).as('joke')
		cy.get('@joke').its('status').should('equal', 200)
	})
})
