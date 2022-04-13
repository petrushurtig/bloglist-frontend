describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('contains login form', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
  //   describe('Login', function() {
  //     it('succeeds with correct credentials', function() {
  //       cy.contains('login').click()
  //       cy.get('#username').type('testuser')
  //       cy.get('#password').type('password')
  //       cy.get('#login-button').click()

  //       cy.contains('Test User logged in')
  //     })
  //     it('fails with wrong credentiasl', function(){
  //       cy.contains('login').click()
  //       cy.get('#username').type('testuser')
  //       cy.get('#password').type('wrong')
  //       cy.get('#login-button').click()

  //       cy.contains('wrong credentials')
  //     })
  //   })
  //   describe('When logged in', function() {
  //     beforeEach(function () {
  //       cy.contains('login').click()
  //       cy.get('#username').type('testuser')
  //       cy.get('#password').type('password')
  //       cy.get('#login-button').click()

  //       cy.contains('Test User logged in')
  //     })
  //     it('A blog can be created', function() {
  //       cy.contains('new blog').click()
  //       cy.get('#title').type('test blog post')
  //       cy.get('#author').type('test author')
  //       cy.get('#url').type('www.test.com')
  //       cy.contains('save').click()

  //       cy.contains('test blog post')
  //     })
  //     it('A blog post can be liked', function() {
  //       cy.contains('new blog').click()
  //       cy.get('#title').type('test blog post')
  //       cy.get('#author').type('test author')
  //       cy.get('#url').type('www.test.com')
  //       cy.contains('save').click()

  //       cy.contains('test blog post')

  //       cy.contains('view more info').click()
  //       cy.contains('likes 0')
  //       cy.contains('like').click()
  //       cy.contains('likes 1')
  //     })
  //   })
  describe('When logged in and created a blog', function() {
    beforeEach(function () {
      //login
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')

      //creating a blog
      cy.contains('new blog').click()
      cy.get('#title').type('test blog post')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.contains('save').click()
      cy.contains('test blog post')
    })
    it('that blog can be removed', function() {
      cy.contains('view more info').click()
      cy.contains('remove').click()
      cy.contains('test blog post').should('not.exist')
    })
  })
  describe('When there is multiple blogs', function() {
    beforeEach(function () {
      //login
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')

      //creating three blogs
      cy.contains('new blog').click()
      cy.get('#title').type('test blog post')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.contains('save').click()
      cy.contains('test blog post')

      cy.wait(5000)

      cy.contains('new blog').click()
      cy.get('#title').type('test blog post 2')
      cy.get('#author').type('test author 2')
      cy.get('#url').type('www.test2.com')
      cy.contains('save').click()
      cy.contains('test blog post 2')

      cy.wait(5000)
      cy.contains('new blog').click()
      cy.get('#title').type('test blog post 3')
      cy.get('#author').type('test author 3')
      cy.get('#url').type('www.test3.com')
      cy.contains('save').click()
      cy.contains('test blog post 3')
    })
    it('they are sorted correctly', function() {
      cy.contains('view more info').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
      cy.contains('like').click()
      cy.contains('likes 2')

      cy.get('.blogs').children('li').then( items => {
        expect(items[0]).to.contain.text(2)
      })
    })
  })
})