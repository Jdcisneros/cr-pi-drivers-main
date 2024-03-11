import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../../redux/actions';
import style from './form.module.css'
import Navbar from '../../components/navbar/navbar';

const Form = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.forename || !formData.surname || !formData.description || !formData.dob || !formData.teams) {
      console.error("Algunos campos son undefined");
      return;
    }
    dispatch(createDriver(formData));
    setFormData({
      forename: "",
      surname: "",
      description: "",
      image: "",
      nationality: "",
      dob: "",
      teams: [],
    });
  };

  return ( 
     <div>
    <Navbar/>
    
    <div className={style.formContainer}>
    
      <h2>CREATE DRIVER</h2>
      <form onSubmit={handleSubmit} className={style.formTextContainer}>
      <label>NAME:
         <input
          className={style.formInput}
          type="text"
          name="forename"
          value={formData.forename}
          onChange={handleChange}
          required
          />
        </label>
        <label >SURNAME:
        <input
        className={style.formInput}
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        </label>
        <label>NATIONALITY:
        <input
        className={style.formInput}
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        />
        </label>
        <label>Imagen:
        <input
        className={style.formInput}
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
        </label>
        <label>DATE OF BIRTH:
        <input
        className={style.formInput}
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        </label>

        <label >DESCRIPTION:
        <input
        className={style.formInput}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></input>
        </label >

        <label>TEAMS:
        <input
        className={style.formInput}
          type="text"
          name="teams"
          value={formData.teams}
          onChange={handleChange}
          required
        />
        </label>
        <button className={style.formButton} type="submit">Agregar Conductor</button>
      </form>
    </div>
    </div>
  );
};

export default Form;

//   return (
//     <div>
//       <h2>Formulario de Creación de Conductor</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Nombre:
//         <input
//           type="text"
//           name="forename"
//           value={formData.forename}
//           onChange={handleChange}
//           required
//         />
//         </label>
//         <label >Apellido:
//         <input
//           type="text"
//           name="surname"
//           value={formData.surname}
//           onChange={handleChange}
//           required
//         />
//         </label>
//         <label>Nacionalidad:
//         <input
//           type="text"
//           name="nationality"
//           value={formData.nationality}
//           onChange={handleChange}
//           required
//         />
//         </label>
//         <label>Imagen:
//         <input
//           type="text"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//           required
//         />
//         </label>
//         <label>Fecha de Nacimiento:
//         <input
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           required
//         />
//         </label>

//         <label>Descripción:
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         ></textarea>
//         </label>

//         <label>Escuderías:
//         <input
//           type="text"
//           name="teams"
//           value={formData.teams}
//           onChange={handleChange}
//           required
//         />
//         </label>
//         <button type="submit">Crear Conductor</button>
//       </form>
//     </div>
//   );
// };

// export default Form;