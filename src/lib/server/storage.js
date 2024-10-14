import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export class StateStore {
  constructor() {
    this.store = new Map(); // Mapを使用
  }

  async get(key) {
    return this.store.get(key); // keyから値を取得
  }

  async set(key, val) {
    this.store.set(key, val); // keyに対して値を設定
  }

  async del(key) {
    this.store.delete(key); // keyのデータを削除
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
