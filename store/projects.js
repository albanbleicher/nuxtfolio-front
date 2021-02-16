import axios from 'axios'
export const state = () => ({
    list: []
  })
  export const getters = {
      projectList(state) {
        return state.list
      }
  }
  export const mutations = {
    SET_PROJECT_LIST(state, data) {
        state.list = data;
    } 
  }
  export const actions = {
    async fetchProjects({ commit }) {
        try {
            const response = await axios.get('https://albanbleicher-back.herokuapp.com/projects')
            commit('SET_PROJECT_LIST', response.data)
        }
        catch(e) {
            console.log('Erreur', e)
        }
    } 
  }