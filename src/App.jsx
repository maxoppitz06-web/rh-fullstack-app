import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const urlBase = "http://localhost:8080/api/empleados";
  const empleadosFiltrados = empleados.filter((empleado) =>
  empleado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  empleado.departamento.toLowerCase().includes(busqueda.toLowerCase())
);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const respuesta = await axios.get(urlBase);
    setEmpleados(respuesta.data);
  };

  const eliminarEmpleado = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este empleado?");
    if (!confirmar) return;

    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
  };

  const seleccionarEmpleado = (empleado) => {
    setEditando(true);
    setIdEditar(empleado.idEmpleado);
    setNombre(empleado.nombre);
    setDepartamento(empleado.departamento);
    setSueldo(empleado.sueldo);
  };

  const guardarEmpleado = async (e) => {
    e.preventDefault();

    const empleado = {
      nombre,
      departamento,
      sueldo,
    };

    if (editando) {
      await axios.put(`${urlBase}/${idEditar}`, empleado);
    } else {
      await axios.post(urlBase, empleado);
    }

    setNombre("");
    setDepartamento("");
    setSueldo("");
    setEditando(false);
    setIdEditar(null);

    cargarEmpleados();
  };

  return (
    <div className="container mt-5">
      <p className="text-center text-muted mb-4">
  Total empleados: {empleadosFiltrados.length}
</p>

      <div className="card mb-4 shadow-lg border-0">
        <div className="card-header bg-dark text-white">
          {editando ? "Editar empleado" : "Agregar empleado"}
        </div>

        <div className="card-body">
          <form onSubmit={guardarEmpleado} className="row g-3">
            <div className="col-md-3">
              <input
                className="form-control"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                type="text"
                placeholder="Departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                type="number"
                placeholder="Sueldo"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100" type="submit">
                {editando ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
{empleadosFiltrados.length === 0 && (
  <div className="alert alert-warning text-center">
    No se encontraron empleados.
  </div>
)}
      <table className="table table-striped table-bordered">
        <div className="mb-3">
  <input
    className="form-control"
    type="text"
    placeholder="Buscar por nombre o departamento..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
  />
</div>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Sueldo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {empleadosFiltrados.map((empleado) => (
            <tr key={empleado.idEmpleado}>
              <td>{empleado.idEmpleado}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.departamento}</td>
              <td>{empleado.sueldo} €</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => seleccionarEmpleado(empleado)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;