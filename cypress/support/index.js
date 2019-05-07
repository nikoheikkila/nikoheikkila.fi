/* eslint no-unused-vars: 0 */

import 'gatsby-cypress/commands'
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => false)
