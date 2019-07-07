/// <reference types="Cypress" />

import { isValidXML } from '../support'

const XML_MIME_TYPE = 'application/xml'

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
      expect(response.status).to.equal(200)
      expect(response.headers['content-type']).to.include(XML_MIME_TYPE)
      expect(isValidXML(response.body)).to.equal(true)
    })
  })
})

context('Sitemap', () => {
  /**
   * Test case
   *
   * Requesting XML sitemap should yield a response where:
   * - status = 200
   * - headers contain correct content type 'text/xml'
   * - body contains valid RSS data
   */
  it('should be a valid XML document', () => {
    cy.request('/sitemap.xml').then(response => {
      expect(response.status).to.equal(200)
      expect(response.headers['content-type']).to.include(XML_MIME_TYPE)
      expect(isValidXML(response.body)).to.equal(true)
    })
  })
})
