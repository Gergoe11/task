import careerpage_selectors from '../selectors/careerpage_selectors'
import careerdata from '../data/careerdata'

describe('EPAM Careers', () => {
    beforeEach(() => {
        cy.visit(careerpage_selectors.url);
        cy.acceptConsentPopup();
    });

    
    it('should display the header of the careers page', () => {
        cy.get(careerpage_selectors.header).should('be.visible');
    });

    it('should display the search filters of the careers page', () => {
        cy.get(careerpage_selectors.searchKeyBox).should('be.visible');
        cy.get(careerpage_selectors.locationFilter).should('be.visible');
        cy.get(careerpage_selectors.skillFilter).should('be.visible');
    });

    it('should display the refining search filters of the careers page', () => {
        cy.get(careerpage_selectors.refiningFilters).should('be.visible')
            .should('have.length', 3);
    });

    it('should display the chosen search term', () => {
        cy.get(careerpage_selectors.searchKeyBox).type(careerdata.validJob);

        cy.get(careerpage_selectors.searchKeyBox)
            .should('have.value', careerdata.validJob);
    });

    it('should search with valid search term and show list of jobs', () => {
        cy.get(careerpage_selectors.searchKeyBox).type(careerdata.validJob);

        cy.get(careerpage_selectors.submitButton)
            .click();

        cy.get(careerpage_selectors.searchResultItems)
            .should('not.have.length', 0)

        cy.url().should('contain', careerdata.validJob)
    });


    it('should should show error message when typing invalid search term', () => {
        cy.get(careerpage_selectors.searchKeyBox).type(careerdata.invalidJob);

        cy.get(careerpage_selectors.submitButton)
            .click();

        cy.get(careerpage_selectors.errorMessage)
            .should('be.visible')

        cy.get(careerpage_selectors.errorMessage)
            .contains(careerdata.errorText)

        cy.get(careerpage_selectors.searchResultItems)
            .should('not.exist')
    });

    it('should should show error message when typing special characters', () => {
        cy.get(careerpage_selectors.searchKeyBox).type(careerdata.specialChars);

        cy.get(careerpage_selectors.submitButton)
            .click();

        cy.get(careerpage_selectors.errorMessage)
            .should('be.visible')

        cy.get(careerpage_selectors.searchResultItems)
            .should('not.exist')
    });
    
})