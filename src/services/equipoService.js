import { supabase } from '../supabaseClient';

// Obtener datos de un equipo por ID
export const fetchEquipo = async (id) => {
  const { data, error } = await supabase
    .from('equipos') // Nombre de tu tabla en Supabase
    .select('*')
    .eq('id', id)
    .single(); // Obtener solo un registro

  if (error) {
    console.error('Error al obtener datos del equipo:', error);
    throw error;
  }

  return data;
};

// Actualizar estado del equipo
export const updateEstadoEquipo = async (id, nuevoEstado) => {
  const { error } = await supabase
    .from('equipos') // Nombre de tu tabla en Supabase
    .update({ estado_equipo: nuevoEstado })
    .eq('id_equipo', id);

  if (error) {
    console.error('Error al actualizar estado del equipo:', error);
    throw error;
  }

  return { message: 'Estado actualizado correctamente' };
};