/* eslint-disable array-callback-return */
import axios from "axios";
export const areas = [
  {
    id: 1,
    value: "Department of Environment and Sustainability",
    programs: ["Master's Degree in Environmental Management and Audits"],
  },
  {
    id: 2,
    value: "Department of Innovation, Business and New Technologies",
    programs: [
      "Master's Degree in Training of Teachers of Spanish as a Foreign Language",
      "Master's Degree in Education with a specialization in Higher Education",
      "Master's Degree in Education with a specialization in Organization and Management of Educational Centers",
    ],
  },
  {
    id: 3,
    value: "Department of Language, Education and Communications Sciences",
    programs: [
      "Master's Degree in Training of Teachers of Spanish as a Foreign Language",
      "Master's Degree in Education with a specialization in Higher Education",
      "Master's Degree in Education with a specialization in Organization and Management of Educational Centers",
    ],
  },
  {
    id: 4,
    value: "Department of Health Sciences",
    programs: [
      "Master's Degree in Physical Activity: Training and Sports Management",
      "Master's Degree in Naturopathic Sciences",
    ],
  },
  {
    id: 5,
    value: "Department of Projects",
    programs: [
      "Master's Degree in Project Design, Management and Direction",
      "Master's Degree in Design, Management and Project Management with specialization in Innovation and Products",
      "Master's Degree in Design, Management and Project Management with a specialization in Architecture and Urban Planning",
    ],
  },
];

export const paises = async () => {
  let datos = [];
  const response = await axios.get(
    "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  response.data.map((data) => {
    return datos.push({
      id: data.id,
      name: data.name,
    });
  });
  return datos;
};

export const provincias = async (cId) => {
  let datos = [];
  const response = await axios.get(
    "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  response.data.map((data) => {
    if (data.country_id === cId) {
      return datos.push({
        id: data.id,
        name: data.name,
      });
    }
  });
  return datos;
};

export const ciudades = async (pId) => {
  let datos = [];
  const response = await axios.get(
    "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  response.data.map((data) => {
    if (data.state_id === pId) {
      return datos.push({
        id: data.id,
        name: data.name,
      });
    }
  });
  return datos;
};

export const saveAndSend = async (e, data) => {
  e.preventDefault();
  await axios.post("http://localhost:4000/api/formData", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return "Formulario Guardado y Enviado";
};
