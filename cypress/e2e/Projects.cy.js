/// <reference types="cypress" />

describe("<Projects />", () => {
    it("<Projects />, Test the functionality to create a new project as user authenticated", () => {
        cy.visit("/")

        // User auth
        cy.get("[data-cy=email-input]").type("test@correo.com")
        cy.get("[data-cy=password-input]").type("123456")
        cy.get("[data-cy=submit-login]").click()

        cy.get("[data-cy=new-project-input]")
        .should("exist")
        .click()

        cy.get("[data-cy=new-project-input]").click()
        cy.get("[data-cy=new-project]").click()

        cy.get("[data-cy=alert]")
        .should("exist")
        .should("have.text", "Todos los campos son obligatorios")

        cy.get("[data-cy=project-name-input]").type("test")
        cy.get("[data-cy=project-description-input]").type("lorem ipsum")
        cy.get("[data-cy=project-date-input]").type("2025-01-01")
        cy.get("[data-cy=project-client-input]").type("test")
        cy.get("[data-cy=new-project]").click()

        cy.get("[data-cy=alert]")
        .should("exist")
        .should("have.text", "Proyecto Creado Correctamente")

    })
 
})