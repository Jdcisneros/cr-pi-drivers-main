import { GET_BY_NAME, GET_DRIVERS, CREATE_DRIVER, ORDER_NAME, ORDER_DOB} from "./actions"


let inicialState = {allDrivers:[],
    orderByBirthDate: false}


function rootReducer(state = inicialState, action){
switch(action.type){
    case GET_DRIVERS:
        return{
            ...state,
            allDrivers:action.payload,
        }
        case GET_BY_NAME:
        return{
            ...state,
            allDrivers:action.payload,
        }
        case CREATE_DRIVER:
            return{
                ...state,
                allDrivers:[...state.allDrivers, action.payload],
            }
        case ORDER_NAME:
             return{
                 ...state,
                 allDrivers: state.allDrivers.slice().sort((a,b) =>(
                    action.acending ? a.name?.forename || a.forename : b.name?.forename || b.forename) > 
                    (action.acending ? b.name?.forename || b.forename : a.name?.forename || a.forename) ? 1 : -1)
                    }
                    
                    case ORDER_DOB:
                        return {
                          ...state,
                          allDrivers: state.allDrivers.slice().sort((a, b) => {
                            const dateA = new Date(a.dateOfBirth).getTime();
                            const dateB = new Date(b.dateOfBirth).getTime();
                            return action.ascending ? dateA - dateB : dateB - dateA;
                          }),
                          orderByBirthDate: action.ascending,
                        };
      default:
        return state
}
}



export default rootReducer