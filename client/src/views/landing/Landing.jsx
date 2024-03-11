import { Link } from "react-router-dom"
import style from './landing.module.css'
import f1 from '../../../../F1.svg'


const Landing = () =>{
    return (
        <div  className={style.containerLanding}>
            <img src={f1} className={style.logosize}/>
            <Link to={"/drivers"}>
            <button className={style.button}>
                Go to Drivers 
            </button>
            </Link>
        </div>
    )
}

export default Landing