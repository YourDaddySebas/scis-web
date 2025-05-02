import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./ControlPanel.css";

const ControlPanel = () => {
  const [equipo, setEquipo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const [horaEncendido, setHoraEncendido] = useState("00");
  const [minutoEncendido, setMinutoEncendido] = useState("00");
  const [horaApagado, setHoraApagado] = useState("00");
  const [minutoApagado, setMinutoApagado] = useState("00");
  const navigate = useNavigate();

  // Actualiza la hora local de Los Mochis, Sinaloa
  const actualizarHoraLocal = () => {
    const now = new Date();
    const options = { timeZone: "America/Mazatlan", hour12: false };
    const localDate = now.toLocaleDateString("es-MX", options);
    const localTime = now.toLocaleTimeString("es-MX", options);
    setLocalTime(`${localDate}, ${localTime}`);
  };

  // Obtiene los datos del equipo
  const ActualizarDatos = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));

      if (!usuario || !usuario.equipo_id) {
        setError("No se pudo identificar al usuario o su equipo asociado.");
        setLoading(false);
        return;
      }

      const equipoId = usuario.equipo_id;

      const { data: equipoData, error: equipoError } = await supabase
        .from("equipos")
        .select("*")
        .eq("id", equipoId)
        .single();

      if (equipoError || !equipoData) {
        setError("No se pudo actualizar la información del equipo.");
        setLoading(false);
        return;
      }

      setEquipo(equipoData);
      setLoading(false);
    } catch (err) {
      setError("Ocurrió un error inesperado al actualizar los datos.");
      setLoading(false);
    }
  };

  // Monitorea la hora para encender o apagar la bomba
  const monitorizarHorario = async () => {
    if (!equipo || !equipo.programado) {
      console.log("El equipo no está programado o no existe.");
      return;
    }
  
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
  
    const horaEncendido = parseInt(equipo.hora_encendido, 10);
    const minutoEncendido = parseInt(equipo.minuto_encendido, 10);
    const horaApagado = parseInt(equipo.hora_apagado, 10);
    const minutoApagado = parseInt(equipo.minuto_apagado, 10);
  
    console.log(`Hora actual: ${hour}:${minute}`);
    console.log(`Programado para encender a las ${horaEncendido}:${minutoEncendido}`);
    console.log(`Programado para apagar a las ${horaApagado}:${minutoApagado}`);
    console.log(`Estado actual del equipo: ${equipo.estado_equipo}`);
  
    // Verifica si es tiempo de encender
    if (hour === horaEncendido && minute === minutoEncendido && !equipo.estado_equipo) {
      console.log("Activando la bomba...");
      await cambiarEstadoEquipo(true);
    }
    // Verifica si es tiempo de apagar
    else if (hour === horaApagado && minute === minutoApagado && equipo.estado_equipo) {
      console.log("Desactivando la bomba...");
      await cambiarEstadoEquipo(false);
    } else {
      console.log("No es momento de cambiar el estado.");
    }
  };
  
  const cambiarEstadoEquipo = async (nuevoEstado) => {
    try {
      console.log(`Intentando cambiar el estado del equipo a: ${nuevoEstado}`);
      const { error } = await supabase
        .from("equipos")
        .update({ estado_equipo: nuevoEstado })
        .eq("id", equipo.id);
  
      if (error) {
        console.error("Error al cambiar el estado del equipo:", error);
        setError("No se pudo cambiar el estado del equipo.");
        return;
      }
  
      console.log("Estado cambiado exitosamente en la base de datos.");
      setEquipo((prevEquipo) => ({
        ...prevEquipo,
        estado_equipo: nuevoEstado,
      }));
    } catch (err) {
      console.error("Error desconocido al cambiar el estado del equipo:", err);
      setError("Ocurrió un error inesperado al cambiar el estado del equipo.");
    }
  };

  const guardarProgramacion = async () => {
    try {
      const { error } = await supabase
        .from("equipos")
        .update({
          programado: true,
          hora_encendido: horaEncendido,
          minuto_encendido: minutoEncendido,
          hora_apagado: horaApagado,
          minuto_apagado: minutoApagado,
        })
        .eq("id", equipo.id);

      if (error) {
        setError("No se pudo guardar la programación.");
        return;
      }

      console.log("Programación guardada exitosamente.");
      setEquipo({
        ...equipo,
        programado: true,
        hora_encendido: horaEncendido,
        minuto_encendido: minutoEncendido,
        hora_apagado: horaApagado,
        minuto_apagado: minutoApagado,
      });
    } catch (err) {
      setError("Ocurrió un error inesperado al guardar la programación.");
    }
  };

  const cancelarProgramacion = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas cancelar la programación?");
    if (!confirmacion) return;

    try {
      const { error } = await supabase
        .from("equipos")
        .update({ programado: false })
        .eq("id", equipo.id);

      if (error) {
        setError("No se pudo cancelar la programación.");
        return;
      }

      console.log("Programación cancelada exitosamente.");
      setEquipo({ ...equipo, programado: false });
    } catch (err) {
      setError("Ocurrió un error inesperado al cancelar la programación.");
    }
  };

  const calcularTiempoRiego = () => {
    const inicio = parseInt(equipo.hora_encendido) * 60 + parseInt(equipo.minuto_encendido);
    const fin = parseInt(equipo.hora_apagado) * 60 + parseInt(equipo.minuto_apagado);
    const total = fin - inicio;

    const horas = Math.floor(total / 60);
    const minutos = total % 60;

    return `${horas} horas y ${minutos} minutos`;
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const generarOpciones = (limite) => {
    const opciones = [];
    for (let i = 0; i <= limite; i++) {
      opciones.push(
        <option key={i} value={i.toString().padStart(2, "0")}>
          {i.toString().padStart(2, "0")}
        </option>
      );
    }
    return opciones;
  };

  useEffect(() => {
    actualizarHoraLocal();
    const intervalHora = setInterval(() => {
      actualizarHoraLocal();
      monitorizarHorario();
    }, 1000); // Monitorea cada minuto

    ActualizarDatos();
    const intervalDatos = setInterval(() => {
      ActualizarDatos();
    }, 5000);

    return () => {
      clearInterval(intervalHora);
      clearInterval(intervalDatos);
    };
  }, [equipo]);

  if (loading) return <div className="loading">Cargando...</div>;

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="control-panel">
      <header className="header">
        <button className="logout-button" onClick={handleLogout}>
          Salir
        </button>
        <div>
          <h1>{equipo.nombre_equipo}</h1>
          <p>Panel de Control de Riego</p>
        </div>
      </header>
      <main className="main">
        <p className="local-time">🕒 Los Mochis, Sinaloa: {localTime}</p>

        <section className="status-section">
          <h2>Estado Actual</h2>
          <p className={`status ${equipo.estado_equipo ? "active" : "inactive"}`}>
            {equipo.estado_equipo ? "ENCENDIDA" : "APAGADA"}
          </p>
        </section>

        <section className="details-section">
          <div className="detail">
            <h3>Voltaje</h3>
            <p>{equipo.valor_sensor_voltage} V</p>
          </div>
          <div className="detail">
            <h3>Corriente</h3>
            <p>{equipo.valor_sensor_corriente} A</p>
          </div>
          <div className="detail">
            <h3>Nivel de Batería</h3>
            <div className="battery-bar">
              <div
                className="battery-fill"
                style={{
                  width: `${equipo.bateria_porcentaje}%`,
                  backgroundColor: equipo.bateria_porcentaje > 20 ? "green" : "red",
                }}
              >
                {equipo.bateria_porcentaje}%
              </div>
            </div>
          </div>
        </section>
        <section className="status-section">
          <h2>Estado Actual</h2>
          <p className={`status ${equipo?.estado_equipo ? "active" : "inactive"}`}>
            {equipo?.estado_equipo ? "ENCENDIDA" : "APAGADA"}
          </p>
          <button
            className="toggle-button"
            style={{
              backgroundColor: equipo?.estado_equipo ? "red" : "green",
              color: "white",
              fontSize: "18px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => cambiarEstadoEquipo(!equipo.estado_equipo)}
          >
            {equipo?.estado_equipo ? "Apagar" : "Encender"}
          </button>
        </section>

        <section className="programacion-section">
          <h2>Programación de Riego</h2>
          <div className="programacion-inputs">
            <div>
              <h3>Hora de Encendido</h3>
              <select value={horaEncendido} onChange={(e) => setHoraEncendido(e.target.value)}>
                {generarOpciones(23)}
              </select>
              :
              <select value={minutoEncendido} onChange={(e) => setMinutoEncendido(e.target.value)}>
                {generarOpciones(59)}
              </select>
            </div>
            <div>
              <h3>Hora de Apagado</h3>
              <select value={horaApagado} onChange={(e) => setHoraApagado(e.target.value)}>
                {generarOpciones(23)}
              </select>
              :
              <select value={minutoApagado} onChange={(e) => setMinutoApagado(e.target.value)}>
                {generarOpciones(59)}
              </select>
            </div>
          </div>
          <div className="programacion-buttons">
            <button className="guardar-button" onClick={guardarProgramacion}>
              <i className="bi bi-save"></i> Guardar Programación
            </button>
            <button className="cancelar-button" onClick={cancelarProgramacion}>
              <i className="bi bi-trash"></i> Cancelar Programación
            </button>
          </div>
        </section>

        {equipo.programado && (
          <section className="programacion-activa">
            <h2>Programación Activa</h2>
            <p>Tiempo total de riego: {calcularTiempoRiego()}</p>
            <h2>Programación Activa</h2>
            <p>Tiempo total de riego: {calcularTiempoRiego()}</p>
          </section>
          
        )}
      </main>
    </div>
  );
};

export default ControlPanel;