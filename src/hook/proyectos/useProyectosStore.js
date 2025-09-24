
import { ProyectoStore,OperadorStore,AdminOperadorStore} from "../../store/index";
import weimagro from '../../assets/logos/Weimagro.png';


export const useProyectoStore = () => {
    //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES  
    // const idproyecto = localStorage.getItem('proyectoactivo');   
    const proyectos = ProyectoStore(state => state.starLoadtProyectos);
    
    const operadores = OperadorStore(state => state.cargarTodosOperadores);
    const admiOperador = AdminOperadorStore( state => state.cargarTodosAdminOperadores);
    
    const user = JSON.parse(localStorage.getItem('autenticacion'));  

   /////////////////////////////////////////////////////  
    //////////////////////////////////////////////////////////////// 
      const cargarAdminProyectos = async()=>{
        try {
          const infoproyectos = await proyectos();
          // console.log("Proyectos cargados:", infoproyectos);
          const infooperadores = await operadores();
          // console .log("Operadores cargados:", infooperadores);
          const proyecadmin = await admiOperador();
          // console.log("Administradores de operadores cargados:", proyecadmin);
          
          // console.log(infoproyectos);
          const rol = user.state.user.rol;
          const uid = user.state.user.uid;
  
          if (infoproyectos && infooperadores && proyecadmin && rol && uid) {
              const tarjetaproyectos = tarjetaProyecto({infooperadores, infoproyectos, proyecadmin, uid, rol});
              return tarjetaproyectos;
          } else {
              throw new Error("Faltan datos requeridos o son inválidos");
          }
      } catch (error) {
          console.error("Error al crear tarjetaproyectos:", error);
          throw error; // Opcionalmente volver a lanzar el error para un manejo adicional
      }
      }  
         
    ////////////////////////////////////////////////////////////////   
    const tarjetaProyecto = ({ infooperadores, infoproyectos, proyecadmin, uid, rol }) => {
      // Función interna para construir la tarjeta

      const construirTarjeta = (proyecto, operadores) => {
        const operador = operadores.find(oper => (proyecto.operador === oper.id));
            // Determina la imagen según el nombre del operador
         let imgSrc = '';
         switch (operador ? operador.nombre : '') {
            case 'weimagro':
            imgSrc = weimagro;
            break;

            default:
            imgSrc = weimagro;
         }

        return {
          idPiloto: proyecto.idPiloto ? proyecto.idPiloto : 'NA',
          operador: operador ? operador.nombre : 'NA',
          estado: proyecto.estado ? proyecto.estado : 'NA',
          numeroplantulas: proyecto.numeroplantulas ? proyecto.numeroplantulas : 'NA',
          fechacreado: proyecto.fechacreado ? proyecto.fechacreado : 'NA',
          id: proyecto.id ? proyecto.id : 'NA',
          img: imgSrc 
        };
      };
    
      let tarjeta;
      
      if (rol === 'ADMIN_ROLE') {
        tarjeta = infoproyectos.map(proy => construirTarjeta(proy, infooperadores));
      } else {
        const proyrelacion = proyecadmin.filter(oper => (oper.usuario === uid));
        tarjeta = proyrelacion.map(proy => {
          const filproy = infoproyectos.find(inpro => (inpro.id === proy.proyecto));
          return construirTarjeta(filproy, infooperadores);
        });
      }
      
      return tarjeta;
    };
    ////////////////////////////////////////////////////////////////   

    ////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////          
      return{
        proyectos,
        cargarAdminProyectos,

    }   
    ////////////////////////////////////////////////////////////////    
  }