/// <reference types="Cypress" />

context('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000')
    })

    it('contains index of posts', () => {
        cy.get('.post-title').should(p => {
            expect(p).to.have.length.above(0)
        })
    })

    it('toggle changes between themes', () => {
        cy.get('.bm-burger-button > button').click()

        cy.get('#theme-switcher').click()
        cy.get('body').should('not.have.class', 'light')
        cy.get('body').should('have.class', 'dark')

        cy.get('#theme-switcher').click()
        cy.get('body').should('not.have.class', 'dark')
        cy.get('body').should('have.class', 'light')
    })

    it('renders articles', () => {
        cy.get('.post-title > a').first().click()
        cy.url().should('match', /\/blog\/[\w-/]+/)
    })
})
