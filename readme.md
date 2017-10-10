# Online Lab Notebook
![Cloud Notebook Logo](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/public/images/Cloud_book_logo.png)

**Contributors:** Maggie Wiseman & Ingrid Majdalani

<a href="https://cloudnotebook.herokuapp.com"> See it live!</a>

## Summary:
Lab notebooks are the notoriously annoying for most high school teachers and students.  The rules such as only writing in in indelible ink, not crossing things out (no white out), only writing on one side, remembering your name and date on every page, etc. seem archaic and unjustified to many students.  Do today's scientists really use such old technology? Maybe some do, but many more are using online lab notebook systems that allow them to connect with other researchers, databases, chemical drawing tools and other features that make their work more efficient. However, high school and undergraduate students often still experience the requirement to keep paper lab notebooks. The purpose of this project was to create an online lab notebook system geared towards high school students and teachers.

## Tech Stack:
* React with Redux
* Express.js on Node.js
* Postgresql database

## Features:
* Teachers can make courses (Biology vs Chemistry and sections (A block vs B Block)

![Courses Screenshot](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/AddACourseOpen.png)

![Add A Course Modal](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/AddACourseModal.png)

* Login and Registration (students are given a code to enter into a specific section, e.g. A Block Biology, passwords are encrypted)

![Student Login](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/StudentLogin.png)


* Teachers can create custom assignments that optionally include:
    * title
    * question
    * abstract
    * hypothesis
    * variables
    * materials
    * procedures
    * data
    * calculations
    * discussion

![Shows list of students given an assignment and their status.](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/Assignmentspage.png)

* Students can see a list of assignments for each course and can add other courses to their profile
![Student Dashboard](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/StudentDash.png)

* Students can edit and save lab work to be edited later or submit for grading.

![Student Assignment Entry](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/StudentAssignment.png)

* Teachers can see how students are progressing on an assignment and when the assignment is submitted can add comments and grade each category or just provide one final set of comments and overall grade for an assignment.

![Specific Assignment Page - Shows list of students and the status of their assignment](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/TeacherSpecificAssign.png)

* Once a teacher has graded an assignment students can see the associated comments and grades.

![Graded Assignment page](https://raw.githubusercontent.com/maggiewiseman/labnotebook/master/assets/screenshots/StudentGraded.png)
