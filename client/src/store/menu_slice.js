import { createSlice } from "@reduxjs/toolkit";

import { menuController } from "@ionic/core/components";

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        "chat": false,
        "profile": false,
    },
    reducers: {
        off: (state) => {
            state.chat = false;
            state.profile = false;
            menuController.enable(false, "profile-menu");
            menuController.enable(false, "chat-menu");
        },
        chat: (state) => {
            state.chat = true;
            state.profile = false;
            menuController.enable(true, "chat-menu");
            menuController.enable(false, "profile-menu");
        },
        profile: (state) => {
            state.chat = false;
            state.profile = true;
            menuController.enable(false, "chat-menu");
            menuController.enable(true, "profile-menu");
        },
    },
});

export const { off, chat, profile } = menuSlice.actions;
export default menuSlice.reducer;
