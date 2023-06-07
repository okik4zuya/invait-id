import { create } from 'zustand'

export const useInvitationStore = create((set) => ({
  pageIndex: -1,
  setPageIndex: (payload) => set({ pageIndex: payload }),
  
  isCoverShow: true,
  setIsCoverShow: (payload) => set({ isCoverShow: payload }),

  isModalGiftShow: false,
  setIsModalGiftShow: (payload) => set({ isModalGiftShow: payload }),

  isModalUcapanShow: false,
  setIsModalUcapanShow: (payload) => set({ isModalUcapanShow: payload }),

  isModalRsvpShow: false,
  setIsModalRsvpShow: (payload) => set({ isModalRsvpShow: payload }),

  isAudioPlay: false,
  setIsAudioPlay: (payload) => set({ isAudioPlay: payload })

}))