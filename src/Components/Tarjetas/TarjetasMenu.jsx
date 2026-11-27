import React from 'react'; 
import './TarjetasMenu.css'

function TarjetasMenu({imagen,titulo,descripcion,clase, onClick}){
    return(
             
            <div className="mini-card"> {clase}
            <div className="mini-card-img">{imagen}</div>
            <div className="mini-card-body">

                  <h4>{titulo}</h4>
                  <p>{descripcion}</p>
                </div>
                </div>
    );
}export default TarjetasMenu;