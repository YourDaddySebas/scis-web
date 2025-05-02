import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdmxetswcpxwgznjfmnj.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbXhldHN3Y3B4d2d6bmpmbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyOTQ1MTAsImV4cCI6MjA1ODg3MDUxMH0.t1mLC2ubHkABtusYDz5os_Xj8s7vRZ09tQRYrExbfBw'; // Reemplaza con tu clave de API

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true, // Mantener la sesión en localStorage
      autoRefreshToken: true, // Refrescar el token automáticamente
      detectSessionInUrl: true, // Detectar sesión en la URL después del login
    },
  });