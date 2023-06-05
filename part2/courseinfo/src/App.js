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

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
