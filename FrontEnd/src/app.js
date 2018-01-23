class App {
  static init() {
    App.createAllExistingUsers();
    App.pageElements();
    App.loginSignupElements();
    App.loginSignupListeners();
    App.pageListeners();
  }

  static createAllExistingUsers() {
    Adapter.getUsers().then( usersData => usersData.forEach( userData => new User(userData)))
  }

  static pageElements() {
    App.notebookContainer = document.getElementById("notebook")
    App.masterContainer = document.getElementById("master")
    App.menuContainer = document.getElementById("menu")
  }

  static pageListeners() {
    App.menuContainer.addEventListener('click', event => App.lectureClickEvent(event))
  }

  static lectureClickEvent(event) {

    if (event.target.dataset.action === "click-lecture") {
      event.preventDefault()
      const selectedLecture = Lecture.all().find(lecture => lecture.id == event.target.dataset.lectureid)
      const currentNotebook = Notebook.all().find(notebook => notebook.lecture === selectedLecture)
      debugger;
      App.notebookContainer.innerHTML = currentNotebook.renderNotebookForNotebookContainer();

      //Create functionality to display Users in MenuContainer,
      //App.menuContainer.innerHTML = selectedLecture.users

    }
    else if (event.target.dataset.action === "create-a-lecture") {
      event.preventDefault()
      App.createNewLecture()
    }
  }

  static loginSignupElements() {
    App.loginForm = document.getElementById("login-form")
    App.loginName = document.getElementById("login-name")
    App.signupButton = document.getElementById("signup-button")
  }

  static loginSignupListeners() {
    App.loginForm.addEventListener('submit', event => App.loginEvent(event))
    App.signupButton.addEventListener('click', event => App.signupEvent(event))
    //fetch users once user is return render user with instance method renderWelcomeForMenur
  }

  static loginEvent(event) {
    event.preventDefault()
    App.setCurrentUser(App.loginName.value)
    App.renderWelcomeForMenuContainer()
    App.createAllNotebooks()
    App.createAllCurrentUserLectures()
  }

  static setCurrentUser(loginValue) {
    App.currentUser = User.all().find(user => user.name === loginValue)
  }

  static renderWelcomeForMenuContainer() {
    App.menuContainer.innerHTML = App.currentUser.renderForWelcomeForMenuContainer()
  }

  static createAllCurrentUserLectures() {
    Adapter.getCurrentUsersLectures().then( lecturesData => lecturesData.forEach( lectureData => new Lecture(lectureData))).then(event => App.renderCurrentUserLecturesForMenuContainer())
  }

  static renderCurrentUserLecturesForMenuContainer() {
    App.menuContainer.innerHTML += `${Lecture.all().map( lecture => lecture.renderLectureForMenuContainer() ).join('')}`
    App.menuContainer.innerHTML += `${App.currentUser.renderNewLectureButtonForMenuContainer()}`
  }

  static createAllNotebooks() {
    Adapter.getNotebooks().then( notebooksData => notebooksData.forEach( notebookData => new Notebook(notebookData)))
  }

  static signupEvent(event) {
    event.preventDefault()
    console.log("NOT IMPLEMENTED");
  }



  // static methods for creating a new lecture

  static createNewLecture(){
    App.menuContainer.innerHTML = Lecture.renderCreateLectureFormForNotebookContainer()
    App.newLectureSubmitButton = document.getElementById("new-lecture-button-submit")
    App.newLectureTitle = document.getElementById("new-lecture-title")
    App.newLectureDate = document.getElementById("new-lecture-date")

    App.newLectureSubmitButton.addEventListener("click", (event)=>{
      Adapter.createLectures(App.newLectureTitle.value, App.newLectureDate.value, App.currentUser.id).then( data => new Lecture(data))
    })


    // App.newLectureTitle = document.getElementById("new-lecture-title")
    // App.newLectureDate = document.getElementById("new-lecture-date")
  }



}
