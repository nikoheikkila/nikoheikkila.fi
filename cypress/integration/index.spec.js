/// <reference types="Cypress" />

context('Homepage', () => {

    /**
     * Before each test load the main page.
     */
    beforeEach(() => {
        cy.visit('http://localhost:8000')
    })

    /**
     * Test Case
     *
     * Main page should contain a collection of one or more post links.
     */
    it('should contain index of posts', () => {
        cy.get('.post-title').should(p => {
            expect(p).to.have.length.above(0)
        })
    })

    /**
     * Test Case
     *
     * Side menu should pop open by clicking the hamburger button on the side
     * of the screen. The menu should be hidden when the crossed button is
     * clicked from the menu.
     */
    it('should open the side menu on click', () => {
        cy.get('.bm-burger-button > button').click()
        cy.get('.site-menu').should('be.visible')

        cy.get('.bm-cross-button > button').click()
        cy.get('.site-menu').should('not.be.visible')
    })

    /**
     * Test Case
     *
     * First, we reveal the sidebar by clicking a burger button. Then we click
     * the theme switcher and assert that theme has changed to 'dark'.
     * Next, we repeat the above step and finally assert that the theme has
     * changed to 'light' again.
     */
    it('should support switching themes', () => {
        cy.get('.bm-burger-button > button').click()

        cy.get('.react-toggle-thumb').click().should(() => {
            expect(localStorage.getItem('theme')).to.deep.equal('dark')
        })

        cy.get('body').should(element => {
            expect(element).to.have.class('dark')
            expect(element).to.not.have.class('light')
        })

        cy.get('.react-toggle-thumb').click().should(() => {
            expect(localStorage.getItem('theme')).to.deep.equal('light')
        })

        cy.get('body').should(element => {
            expect(element).to.have.class('light')
            expect(element).to.not.have.class('dark')
        })
    })

})
