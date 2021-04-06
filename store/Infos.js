import axios from 'axios'
import { mdToHTML } from '@/utils/MarkdownParser'
export const state = () => ({
    name:'',
    baseline:'',
    content_baseline:'',
    contact_informations:{
        twitter:'',
        linkedin:'',
        mail:'',
        github:''
    }
  })
  export const getters = {
      siteName(state) {
        return state.name
      },
      siteBaseline(state) {
        return state.baseline
      },
      introduction(state) {
        return state.content_baseline
      },
      contactInfos(state) {
        return state.contact_informations
      } 
  }
  export const mutations = {
    SET_SETTINGS(state, data) {
        state.name = data.name;
        state.baseline = data.baseline
        state.content_baseline = mdToHTML(data.website_baseline)
        state.contact_informations.mail = data.mail
        state.contact_informations.twitter = data.twitter
        state.contact_informations.linkedin = data.linkedin
    } 
  }
  export const actions = {
    async fetchSettings({ commit }) {
        try {
            const response = await this.$strapi.find('settings')
            commit('SET_SETTINGS', response)
        }
        catch(e) {
            console.log('Erreur', e)
        }
    } 
  }