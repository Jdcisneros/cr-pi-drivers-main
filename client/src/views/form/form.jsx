import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../../redux/actions';
import style from './form.module.css'
import Navbar from '../../components/navbar/navbar';
import validation from "./validation"


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

  const [errors, setErrors] = useState({});

  



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

  useEffect(() => {
    if(formData.forename !== '' || formData.surname !== '' || formData.description !== '' 
    || formData.image !== '' || formData.nationality !== '' || formData.dob !== '' || formData.teams != []){
    const driverValidated = validation(formData);
    setErrors(driverValidated);
    }
}, [formData])

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
          {errors.forename && <p style ={{color : 'red'}} >{errors.forename}</p>}
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
        {errors.surname && <p style ={{color : 'red'}} >{errors.surname}</p>}
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
        {errors.nationality && <p style ={{color : 'red'}} >{errors.nationality}</p>}
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
        {errors.image && <p style ={{color : 'red'}} >{errors.image}</p>}
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
        {errors.dob && <p style ={{color : 'red'}} >{errors.dob}</p>}
        </label>

        <label >DESCRIPTION:
        <input
        className={style.formInput}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {errors.description && <p style ={{color : 'red'}} >{errors.description}</p>}
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
        {errors.teams && <p style ={{color : 'red'}} >{errors.teams}</p>}
        </label>
      
        <button className={style.formButton} type="submit">Agregar Conductor</button>
      </form>
    </div>
    </div>
  );
};

export default Form;

