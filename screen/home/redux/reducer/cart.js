const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const initialBucketState = {
  item: [],
  tpw: {
    totalPrice: 0,
    totalWeight: 0
  }
}

export function bucket(state = initialBucketState, action) {
  var newArray = [], tp = 0, tw = 0;
  switch (action.type) {
    case 'ADD_TO_BUCKET':
      newArray = [...state.item, action.data];
      tp = state.tpw.totalPrice + action.data.totalPrice;
      tw = state.tpw.totalWeight + action.data.netWeight;
      var value = Number(Math.round(tw + 'e2') + 'e-2');
      state = {
        ...state,
        item: newArray,
        tpw: { totalPrice: tp, totalWeight: value }
      }
      return state;

    case 'UPDATE_TO_BUCKET':
      const index = action.data.index;
      newArray = [...state.item]
      newArray[index] = action.data.obj;
      if (action.data.INCREMENT === INCREMENT) {
        tp = state.tpw.totalPrice + newArray[index].price;
        tw = state.tpw.totalWeight + newArray[index].calculate;
      }
      else if (action.data.DECREMENT === DECREMENT) {
        tp = state.tpw.totalPrice - newArray[index].price;
        tw = state.tpw.totalWeight - newArray[index].calculate;
      }
      var value = Number(Math.round(tw + 'e2') + 'e-2');
      state = {
        ...state,
        item: newArray,
        tpw: { totalPrice: tp, totalWeight: value }
      }
      return state;

    case 'REMOVE_FROM_BUCKET':
      tp = state.tpw.totalPrice  - state.item[action.data].totalPrice;
      tw = state.tpw.totalWeight - state.item[action.data].netWeight;
      var value = Number(Math.round(tw + 'e2') + 'e-2');
      state = {
        ...state,
        item: [
          ...state.item.slice(0, action.data),
          ...state.item.slice(action.data + 1)
        ],
        tpw: { totalPrice: tp, totalWeight: value }
      }
      return state;

    case 'IN_ORDER_BUCKET':
      return {
        ...state,
        item: action.data
      }

    case 'BUCKET_RESET':
      return {
        item: []
      };

    default:
      return state;
  }
}

