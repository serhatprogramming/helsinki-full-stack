import React from "react";

const Footer = ({ course }) => {
  return (
    <p>
      <strong>
        total of {course.parts.reduce((a, b) => a + b.exercises, 0)}
        exercises
      </strong>
    </p>
  );
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Footer course={course} />
    </div>
  );
};

export default Course;
