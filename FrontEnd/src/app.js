class App {
  static init() {
    App.pageContainers();
    App.loginContainers();
    App.loginListeners();
    App.signupListeners();
  }

  static pageContainers() {
    App.notebookContainer = document.getElementById("notebook")
    App.masterContainer = document.getElementById("master")
    App.menuContainer = document.getElementById("menu")
  }

  static loginContainers() {
    App.loginForm = document.getElementById("login-form")
    App.loginName = document.getElementById("login-name")
    App.signupButton = document.getElementById("signup-button")
  }

  static loginListeners() {
    App.loginForm.addEventListener('submit', event => App.loginEvent(event))
    //fetch users once user is return render user with instance method renderWelcomeForMenu
  }

  static loginEvent(event) {
    event.preventDefault()
    console.log(event)
  }

  static signupListeners() {
    App.signupButton.addEventListener('click', event => App.signupEvent(event))
  }

  static signupEvent(event) {
    event.preventDefault()
    console.log(event)
  }




}
