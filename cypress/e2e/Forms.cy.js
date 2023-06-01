/// <reference types="cypress" />



describe('Forms', () => {

  it('<Login />', () => {
    cy.visit('/')

    // Test the form of Login Page
    cy.get("[data-cy=title]")
      .invoke("text").should("equal", "Inicia Sesión y Administra tus Proyectos")

    cy.get("[data-cy=login-form]")
      .should("exist")

    cy.get("[data-cy=email-input]")
      .should("exist")

    cy.get("[data-cy=password-input]")
      .should("exist")

    cy.get("[data-cy=submit-login]")
      .should("exist")
      .invoke("text").should("equal", "Iniciar Sesión")

    cy.get("[data-cy=register-link]")
      .should("exist")
      .invoke("text").should("equal", "¿No tienes una cuenta? Registrate")

    cy.get("[data-cy=recover-password-link]")
      .should("exist")
      .invoke("text").should("equal", "Recuperar Contraseña")

  })

  it('<Register />', () => {
    cy.visit("/registrar")

    // Test the form of Register Page
    cy.get("[data-cy=title]")
      .invoke("text").should("equal", "Crea una Cuenta y Administra tus Proyectos")

    cy.get("[data-cy=register-form]")
      .should("exist")

    cy.get("[data-cy=name-input]")
      .should("exist")

    cy.get("[data-cy=email-input]")
      .should("exist")

    cy.get("[data-cy=password-input]")
      .should("exist")
      .should("have.prop", "type").should("equal", "password")

    cy.get("[data-cy=password2-input]")
      .should("exist")
      .should("have.prop", "type").should("equal", "password")

    cy.get("[data-cy=submit-input]")
      .should("exist")
      .invoke("val").should("equal", "Crear Cuenta")

    cy.get("[data-cy=login-link]")
      .should("exist")
      .invoke("text").should("equal", "¿Ya tienes una cuenta? Inicia Sesión")

    cy.get("[data-cy=recover-password-link]")
      .should("exist")
      .invoke("text").should("equal", "Recuperar Contraseña")


  })

})