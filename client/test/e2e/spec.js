describe('Days Since SignUp Page', function() {
  	it('Loads with sign in link', function() {
    	browser.get('http://127.0.0.1:3000');
    	var signInLink = element(by.id('signIn'));
    	expect(signInLink.isPresent()).toBe(true);
    });

    it('Allows you to signin with twitter', function (){
    	browser.get('http://127.0.0.1:3000');
    	var signInLink = element(by.id('signIn'));
    	signInLink.click();
    });
});