import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

        // Transform categories from fb to array
        // 1.
        // const categs = [];
        // Object.keys(categories).forEach(key => {
        //   categs.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key
        //   })
        // })
        // return categs;

        // 2. same ^
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }));

      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  }
}