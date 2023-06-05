import axios from "axios";

const API_URL = "http://localhost:3001/persons";

const getPersons = () => {
  const response = axios.get(API_URL);
  return response.then((response) => response.data);
};

const addPerson = (person) => {
  const response = axios.post(API_URL, person);
  return response.then((response) => response.data);
};

const updatePerson = (person) => {
  const response = axios.put(`${API_URL}/${person.id}`, person);
  return response.then((response) => response.data);
};

const removePerson = (person) => {
  const response = axios.delete(`${API_URL}/${person.id}`);
  return response.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPersons, addPerson, updatePerson, removePerson };
