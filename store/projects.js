import axios from 'axios'
import { mdToHTML } from '@/utils/MarkdownParser'
export const state = () => ({
    list: [],
    current:{}
  })
  export const getters = {
      projectList(state) {
        return state.list
      },
      current(state) {
        return state.current
      }
  }
  export const mutations = {
    SET_PROJECT_LIST(state, data) {
        state.list = data;
    },
    SET_CURRENT_PROJECT(state, data) {
      data.credits = mdToHTML(data.credits)
      state.current = data;
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
    },
    async getProjectBySlug({ commit, state }, slug) {
      try {
          const response = state.list.find(item => item.slug === slug)
          console.log(response)
          if(response) {
            commit('SET_CURRENT_PROJECT', response)
          }
          else {
            console.log(this.$router.push('/projects'))
          }
      }
      catch(e) {
          console.log('Erreur', e)
      }
  } 
  }