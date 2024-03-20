const validation = (FormData) =>{
    const errors = {}

    if(FormData.forename.length > 10){
        errors.forename = 'Debe ser menor a 10 caracteres'
    }
    if(FormData.surname.length > 15){
        errors.surname = 'Debe ser menor a 10 caracteres'
    }

    if(FormData.nationality.length > 20){
        errors.nationality = 'Debe ser menor a 10 caracteres'
    }
    if(!/\bhttps?:\/\/\S+?\.(?:jpg|jpeg|gif|png|bmp)\b/.test(FormData.image)){
        errors.image = 'No es una url de una imagen'
    }

    if(FormData.nationality.length > 150){
        errors.nationality = 'Debe ser menor a 150 caracteres'
    }


    return errors;
}
    export default validation