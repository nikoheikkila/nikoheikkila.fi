/* eslint no-unused-vars: 0 */
import 'gatsby-cypress/commands'

Cypress.on('uncaught:exception', (err, runnable) => false)

/* Helper functions */
export const isValidXML = body => {
    const parser = new DOMParser()
    const errors = parser
        .parseFromString(body, 'text/xml')
        .getElementsByTagName('parsererror')

    return errors.length === 0
}
