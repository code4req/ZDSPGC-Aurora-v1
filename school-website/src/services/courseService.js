import { supabase } from '../lib/supabase';

export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data;
}