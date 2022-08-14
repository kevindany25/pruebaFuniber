import React, { useEffect, useState } from "react";
import { areas, ciudades, paises, provincias, saveAndSend } from "../services/service";
import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countries, setCountries] = useState([]);
  const [countrySelect, setCountrySelect] = useState("");
  const [states, setStates] = useState([]);
  const [stateSelect, setStateSelect] = useState("");
  const [cities, setCities] = useState([]);
  const [citySelect, setCitySelect] = useState("");
  const [comments, setComments] = useState("");
  const [area, setArea] = useState("");
  const [program, setProgram] = useState("");

  useEffect(() => {
    paises().then((res) => {
      setCountries(res);
    });
  }, []);

  const data =
    {
      name,
      lastName,
      email,
      phone,
      country: countrySelect,
      state: stateSelect,
      city: citySelect,
      area,
      program,
      comments,
    };

  const elegirAreas = (a) => {
    const programSelector = document.getElementsByName("programas")[0];
    programSelector.textContent = "";
    const area = areas[a - 1].programs;
    for (let programas in area) {
      let opcion = document.createElement("option");
      opcion.text = area[programas];
      programSelector.add(opcion);
    }
    setProgram(programSelector.value)
  };

  const clear =() => {
    const inputs = document.getElementsByTagName("input");
    const textarea = document.getElementsByTagName("textarea");
    const selects = document.getElementsByTagName("select");
    for (let i = 0; i<=4; i++){
      selects[i].selectedIndex = 0
      inputs[i].value = ""
    }
    selects[3].value = "Seleccione un programa"
    inputs[4].checked = false
    textarea[0].value = ""
  }
  return (
    <div className="container p-2 mt-5">
    <div>
    <Toaster
  position="top-center"
  reverseOrder={true}
/>
    </div>
      <form onSubmit={(e)=> saveAndSend(e, data).then((res)=> {toast.success(res); clear()})}>
        <h4>Información Requerida</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Areas de Conocimiento</label>
              <select
                id="areas"
                name="areas"
                className="form-control"
                required
                onChange={(e) => {
                  elegirAreas(e.target.value);
                  setArea(e.target[e.target.selectedIndex].text);
                }}
              >
                <option hidden>Selecione un área</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label> Nombres</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombres"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label> E-mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="E-mail"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>País de residencia</label>
              <select
                className="form-control"
                onChange={(e) => {
                  provincias(parseInt(e.target.value)).then((res) => {
                    setStates(res);
                  });
                  setCountrySelect(e.target[e.target.selectedIndex].text);
                }}
              >
                <option hidden>Selecione un país</option>
                {countries.map((p) => (
                  <option key={p.id} value={p.id} name={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ciudad</label>
              <select
                className="form-control"
                onChange={(e) => {
                  setCitySelect(e.target[e.target.selectedIndex].text);
                }}
              >
                <option hidden>Selecione la ciudad</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Programas</label>
              <select
                id="programas"
                name="programas"
                className="form-control"
                onChange={(e) => {
                  setProgram(e.target[e.target.selectedIndex].text);
                }}
              >
                <option hidden>Selecione un programa</option>
              </select>
            </div>
            <div className="form-group">
              <label> Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label> Teléfono</label>
              <input
                type="text"
                className="form-control"
                placeholder="Teléfono"
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Estado / Provincia</label>
              <select
                className="form-control"
                onChange={(e) => {
                  ciudades(parseInt(e.target.value)).then((res) => {
                    setCities(res);
                  });
                  setStateSelect(e.target[e.target.selectedIndex].textContent);
                }}
              >
                <option hidden>Selecione el Estado / Provincia</option>
                {states.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Comentarios</label>
              <textarea
                className="form-control"
                placeholder="Comentarios"
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                className="m-3"
                style={{ transform: "scale(1.5)" }}
                type="checkbox"
                required
              ></input>
              <label>Acepto las</label> <span style={{color: "blue"}}>Políticas de Privacidad</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-info"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
