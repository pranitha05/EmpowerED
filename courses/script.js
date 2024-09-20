
const courses = {
  java: {
    name: "Java for Beginners",
    image: "java.jpg",
    instructor: "Code Academy",
    duration: "16 Hours",
    overview: "This course introduces you to the basics of Java programming. You will learn syntax, object-oriented programming, and basic algorithms.",
    outcomes: [
      "Understand Java syntax and structure",
      "Write and execute Java programs",
      "Grasp the basics of object-oriented programming"
    ],
    link: "https://www.codecademy.com/learn/learn-java"
  },
  python: {
    name: "Python Course",
    image: "python.jpg",
    instructor: "Mr. Bharani Akella",
    duration: "6 weeks",
    overview: "Learn Python from scratch, including how to work with data structures, functions, and libraries.",
    outcomes: [
      "Understand Python syntax and functions",
      "Work with Python libraries",
      "Develop and execute Python projects"
    ],
    link: "https://www.mygreatlearning.com/academy/learn-for-free/courses/python-fundamentals-for-beginners"
  },
  cpp: {
    name: "Introduction to C++",
    image: "c++.jpg",
    instructor: "Michael Johnson",
    duration: "5 weeks",
    overview: "Learn the fundamentals of C++ programming, including syntax, data structures, and memory management.",
    outcomes: [
      "Understand C++ syntax and structure",
      "Develop and compile C++ programs",
      "Understand memory management in C++"
    ],
    link: "https://www.learncpp.com/"
  },
  frontend: {
    name: "Front-End Development",
    image: "front-end.jpg",
    instructor: "Mr. Faizan Parvez",
    duration: "8 weeks",
    overview: "This course covers HTML, CSS, and JavaScript, allowing you to build responsive and interactive web pages.",
    outcomes: [
      "Build responsive websites with HTML and CSS",
      "Add interactivity using JavaScript",
      "Understand modern web development tools and frameworks"
    ],
    link: "https://www.mygreatlearning.com/academy/learn-for-free/courses/front-end-development-html"
  },
  datascience: {
    name: "Data Science Course",
    image: "datascience.jpg",
    instructor: "SkillUp ",
    duration: "7 Hours",
    overview: "Learn the essentials of data science, including data analysis, visualization, and machine learning techniques.",
    outcomes: [
      "Understand data analysis and visualization",
      "Implement machine learning algorithms",
      "Work with large datasets using Python"
    ],
    link: "https://www.simplilearn.com/data-science-free-course-for-beginners-skillup"
  },
  communication: {
    name: "Communication Skills",
    image: "communication.jpg",
    instructor: "Dr. Emily Richards",
    duration: "3 weeks",
    overview: "This course enhances your communication skills, covering verbal, non-verbal, and written communication techniques.",
    outcomes: [
      "Master verbal and non-verbal communication",
      "Improve written communication skills",
      "Learn public speaking and presentation techniques"
    ],
    link: "https://www.coursera.org/learn/communication-skills"
  }
};

// Function to extract query parameters
function getQueryParams() {
  //windo.location.search query string return krta
  //URLSearchParams query string ko aik object mn chnage krdeta humare case mn courseid:python
  //phir hum us mn se courseif ki value le len gn
  const params = new URLSearchParams(window.location.search);
  return params.get('courseId');
}
// Display course details based on the courseId from the URL
function displayCourseDetails() {
  const courseId = getQueryParams();

  if (courses[courseId]) {
    const course = courses[courseId];

    // Update course details in HTML
    document.getElementById('course-name').textContent = course.name;
    document.getElementById('course-image').src = course.image;
    document.getElementById('course-instructor').textContent = course.instructor;
    document.getElementById('course-duration').textContent = course.duration;
    document.getElementById('course-overview').textContent = course.overview;

    // Learning outcomes
    const outcomesList = document.getElementById('learning-outcomes');
    outcomesList.innerHTML = '';
    course.outcomes.forEach(outcome => {
      const li = document.createElement('li');
      li.textContent = outcome;
      outcomesList.appendChild(li);
    });

    // Set course link
    document.getElementById('course-link').href = course.link;
  } else {
    // Handle error if courseId is invalid
    document.body.innerHTML = '<h1>Course not found</h1>';
  }
}

// Call the function to display the course details on page load
displayCourseDetails();