import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export class StateStore {
  async get(key) {
    const { data, error } = await supabase
      .from('auth_state')
      .select('*')
      .eq('key', key)
      .single();

    if (error || !data) return;

    return JSON.parse(data.state);
  }

  async set(key, val) {
    const state = JSON.stringify(val);
    const { data, error } = await supabase
      .from('auth_state')
      .upsert({ key, state, updated_at: new Date() }, { onConflict: ['key'] });

    if (error) {
      throw new Error(`Failed to set state: ${error.message}`);
    }
    return data;
  }

  async del(key) {
    const { error } = await supabase
      .from('auth_state')
      .delete()
      .eq('key', key);

    if (error) {
      throw new Error(`Failed to delete state: ${error.message}`);
    }
  }
}

export class SessionStore {
  async get(key) {
    const { data, error } = await supabase
      .from('auth_session')
      .select('*')
      .eq('key', key)
      .single();

    if (error || !data) return;

    return JSON.parse(data.session);
  }

  async set(key, val) {
    const session = JSON.stringify(val);
    const { data, error } = await supabase
      .from('auth_session')
      .upsert({ key, session, updated_at: new Date() }, { onConflict: ['key'] });

    if (error) {
      throw new Error(`Failed to set session: ${error.message}`);
    }
    return data;
  }

  async del(key) {
    const { error } = await supabase
      .from('auth_session')
      .delete()
      .eq('key', key);

    if (error) {
      throw new Error(`Failed to delete session: ${error.message}`);
    }
  }
}
