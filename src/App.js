import { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState([""])
  let textRef = useRef();
  const [url] = useState("https://assets.breatheco.de/apis/fake/todos/user/AlexHerrerax")
  //GET
  const getTarea = () => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setState(data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    { getTarea() }
  }, [])
  //FIN GET
  //PUT
  function enviar() {
    let options = {
      method: 'PUT',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    fetch(url, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        if (textRef.value != "") {
          let nuevaTarea = { "label": textRef.value, "done": true }
          textRef.value = "";
          setState(
            state.concat(nuevaTarea)
          )
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // FIN PUT
  //DELETE
  const borrar = (index) => {
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    fetch("https://assets.breatheco.de/apis/fake/todos/user/AlexHerrerax" + index, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        state.splice(index, 1)
        setState(
          state.concat()
        )
        enviar()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  //FIN DELETE
  const borrarTodo = (index) => {
    let options = {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
      }
    }

    fetch("https://assets.breatheco.de/apis/fake/todos/user/AlexHerrerax" + index, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        state.splice(1, state.length)
        setState(
          state.concat()
        )
        enviar()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col mb-2">
                <input type="text" ref={t => textRef = t} className="form-control" placeholder="Ingresar tarea" />
              </div>
              <button className="btn btn-primary mb-2" onClick={enviar}>Agregar</button>
              <button className="btn btn-danger mb-2" onClick={borrarTodo}>Borrar Todo</button>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"></li>
          {state.map((item, index) => {
            return (
              <li key={index} className="list-group-item">{item.label} <span id="borrar" onClick={() => borrar(index)}> Borrar</span></li>
            )
          })}
        </ul>
      </div>
    </>
  );
}
export default App;
