import axios from 'axios'
import { mdToHTML } from '@/utils/MarkdownParser'
export const state = () => ({
    list: [],
    current:{}
  })
  export const getters = {
      workList(state) {
        return state.list
      },
      current(state) {
        return state.current
      }
  }
  export const mutations = {
    SET_WORK_LIST(state, data) {
        state.list = data;
    },
    SET_CURRENT_WORK(state, data) {
      data.credits = mdToHTML(data.credits)
      state.current = data;
  } 
  }
  export const actions = {
    async fetchWork({ commit }) {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await this.$strapi.find('projects')
            commit('SET_WORK_LIST', response)
            setTimeout(() => {
              resolve()
            }, 1500)
        }
        catch(e) {
          reject(e)
            console.log('Erreur', e)
        }
        })
    },
    async getWorkBySlug({ commit, state }, slug) {
      try {
          const response = state.list.find(item => item.slug === slug)
          console.log(response)
          if(response) {
            commit('SET_CURRENT_WORK', response)
          }
          else {
            console.log(this.$router.push('/work'))
          }
      }
      catch(e) {
          console.log('Erreur', e)
      }
  } 
  }