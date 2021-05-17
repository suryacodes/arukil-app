const initialState = {
    item: [],
};

export function grocery(state = initialState, action) {

    switch (action.type) {
        case 'ADD_GROCERY':
            return {
                item: [...state.item,action.data]
            };
        case 'RESET_GROCERY':
            return {
                item: []
            }
        default:
            return state;
    }
}

