import create from 'zustand'

const useStore = create(set => ({
    language: 'en',
    setLanguage: (lang) => set(state => ({
        language: lang
    }))
}))

export default useStore;