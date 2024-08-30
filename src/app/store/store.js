import { atomWithReset, atomWithStorage, createJSONStorage } from "jotai/utils"

const session_storage = createJSONStorage(() => sessionStorage)

export const modalType = atomWithStorage('modalType', "", session_storage);
export const showButton = atomWithStorage('showButton', false, session_storage);
export const loadingData = atomWithStorage('loading', false, session_storage);

export const dummyChatData = atomWithStorage('chatData', []);
