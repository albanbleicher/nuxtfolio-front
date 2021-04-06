import axios from 'axios'
import { mdToHTML } from '@/utils/MarkdownParser'
export const state = () => ({
    resume:{}
  })
  export const getters = {
      data(state) {
        return state.resume
      },
  }
  export const mutations = {
    SET_RESUME(state, data) {
        state.resume = data;
    },
  }
  export const actions = {
    async fetchResume({ commit }) {
          try {
            const response = await this.$strapi.find('resume')
            commit('SET_RESUME', response)
        }
        catch(e) {
            console.log('Erreur', e)
        }
    },
  }