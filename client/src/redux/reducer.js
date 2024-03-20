import {
  GET_BY_NAME,
  GET_DRIVERS,
  CREATE_DRIVER,
  ORDER_NAME,
  ORDER_DOB,
  GET_TEAMS,
} from "./actions";

let inicialState = { allDrivers: [], allTeams:[] };

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allDrivers: action.payload,
      };
    case CREATE_DRIVER:
      return {
        ...state,
        allDrivers: [...state.allDrivers, action.payload],
      };
    case ORDER_NAME:
      return {
        ...state,
        allDrivers: state.allDrivers
          .slice()
          .sort((a, b) =>
            (action.acending
              ? a.name?.forename || a.forename
              : b.name?.forename || b.forename) >
            (action.acending
              ? b.name?.forename || b.forename
              : a.name?.forename || a.forename)
              ? 1
              : -1
          ),
      };

    case ORDER_DOB:
      return {
        ...state,
        allDrivers: state.allDrivers
        .slice()
        .sort((a, b) => {
            const dobA = new Date(a.dob);
            const dobB = new Date(b.dob);
            if (action.ascending) {
              return dobA - dobB;
            } else {
              return dobB - dobA;
            }
        }),
      }

      case GET_TEAMS:
        return {
          ...state,
          allTeams: action.payload,
        };

    default:
      return state;
  }
}

export default rootReducer;
