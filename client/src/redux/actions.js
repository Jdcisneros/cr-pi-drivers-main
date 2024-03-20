import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS"
export const GET_BY_NAME = "GET_BY_NAME"
export const CREATE_DRIVER = "CREATE_DRIVER"
export const ORDER_NAME = "ORDER_NAME" 
export const ORDER_DOB = "ORDER_DOB"
export const GET_TEAMS = "GET_TEAMS"

export function getDrivers(){
    return async function(dispatch){
        const apiResponse = await axios("http://localhost:3001/drivers")
        return dispatch({
            type:"GET_DRIVERS",
            payload: apiResponse.data
        })
    }
}

export function getByName(name){
    return async function(dispatch){
        const Response = await axios(`http://localhost:3001/drivers?name=${name}`)
        return dispatch({
            type:"GET_BY_NAME",
            payload: Response.data
        })
    }
}

export function createDriver(driverData){
    return async function(dispatch){
        try {
            
        const Response = await axios.post("http://localhost:3001/drivers", driverData)
        return dispatch({
            type:"CREATE_DRIVER",
            payload: Response.data
        })
    
    } catch (error) {
        console.error('Error al crear el conductor:', error);
        console.error('Error en la configuración de la solicitud:', error.message);
        }
      }
         }

    
    export const orderName= (ascending) =>{
        return ({
            type: ORDER_NAME,
            ascending
        })
    }

    export const orderDob= (ascending) =>{
        return ({
            type: ORDER_DOB,
            ascending
        })
    }

    export const getTeams = () => {
        return async function(dispatch) {
            try {
                const response = await axios.get("http://localhost:3001/teams");
                const teamsData = response.data;
                dispatch({
                    type: GET_TEAMS,
                    payload: teamsData
                });
            } catch (error) {
                console.error("Error al obtener los equipos:", error);
            }
        }
    }
