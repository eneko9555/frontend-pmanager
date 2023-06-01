/// <reference types="cypress" />

describe('<Register />', () => {

    it('<Register /> Validation', () => {
        cy.visit('/registrar')

        cy.get("[data-cy=submit-input]").click()

        cy.get("[data-cy=alert]")
            .should("exist")
            .should("have.text", "Todos los campos son obligatorios")

        cy.get("[data-cy=name-input]").type("Hola Mundo")
        cy.get("[data-cy=email-input]").type("correo222222@correo.com")
        cy.get("[data-cy=password-input]").type("123")
        cy.get("[data-cy=password2-input]").type("123")

        cy.get("[data-cy=submit-input]").click()

        cy.get("[data-cy=alert]")
        .should("exist")
        .should("have.text", "La contraseña es muy corta, mínimo 6 caracteres")

        cy.get("[data-cy=password-input]").clear().type("123456")
        cy.get("[data-cy=password2-input]").clear().type("123456")

        cy.get("[data-cy=submit-input]").click()

        cy.get("[data-cy=alert]")
        .should("exist")
        .should("have.text", "Usuario creado Correctamente, Revisa tu Email")

        cy.visit('/')

        cy.get("[data-cy=email-input]").type("correo222222@correo.com")
        cy.get("[data-cy=password-input]").type("123456")
        cy.get("[data-cy=submit-login]").click()

        cy.get("[data-cy=alert]")
        .should("exist")
        .should("have.text", "Tu cuenta no ha sido confirmada")
    })
})  