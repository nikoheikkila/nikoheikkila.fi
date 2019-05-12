/// <reference types="Cypress" />

context('RSS Feed', () => {

    /**
     * Before each test load the RSS feed.
     */
    beforeEach(() => {
        cy.visit('http://localhost:8000')
    })

    /**
     * Test case
     *
     * Requesting RSS feed should yield a response where:
     * - status = 200
     * - headers contain correct content type 'text/xml'
     * - body contains valid RSS data
     */
    it('should be a valid XML document', () => {
        cy.request('/rss.xml').then(response => {
            const parser = new DOMParser()
            const result = parser.parseFromString(response.body, 'text/xml')

            expect(response.status).to.eq(200)
            expect(response.headers['content-type']).to.include('text/xml')
            expect(result.getElementsByTagName('parsererror').length).to.eq(0)
        })
    })

})
