document.addEventListener('DOMContentLoaded', function () {
    const lastCommandElement = document.getElementById('last-command');
    let lastExecutedCommandId = null;  // Variable para almacenar el ID de la última orden ejecutada
  
    function executeCommand(command, id) {
      if (lastExecutedCommandId !== id) {
        console.log(`Ejecutando: ${command}`);
        // Aquí agregas la lógica específica para ejecutar los comandos que has definido
        switch (command) {
          case 'enciende la luz del cuarto':
          document.querySelector('.foco-recamara').src = 'img/foco_on.png';
            break;
          case 'apaga la luz del cuarto':
            document.querySelector('.foco-recamara').src = 'img/foco_off.png';
            break;
          case 'enciende la luz de la sala':
            document.querySelector('.foco-sala').src = 'img/foco_on.png';
            break;
          case 'apaga la luz de la sala':
            document.querySelector('.foco-sala').src = 'img/foco_off.png';
            break;
          case 'enciende las luces del jardín':
            document.querySelector('.foco-jardin1').src = 'img/foco_on.png';
            document.querySelector('.foco-jardin2').src = 'img/foco_on.png';
            document.querySelector('.foco-jardin3').src = 'img/foco_on.png';
            document.querySelector('.foco-jardin4').src = 'img/foco_on.png';
            document.querySelector('.foco-jardin5').src = 'img/foco_on.png';
            break;
          case 'apaga las luces del jardín':
            document.querySelector('.foco-jardin1').src = 'img/foco_off.png';
            document.querySelector('.foco-jardin2').src = 'img/foco_off.png';
            document.querySelector('.foco-jardin3').src = 'img/foco_off.png';
            document.querySelector('.foco-jardin4').src = 'img/foco_off.png';
            document.querySelector('.foco-jardin5').src = 'img/foco_off.png';
            break;
          case 'enciende el ventilador':
            document.querySelector('.ventilador').src = 'img/v_on.gif';
            break;
          case 'apaga el ventilador':
            document.querySelector('.ventilador').src = 'img/v_off.png';
            break;
          case 'abre las cortinas':
            document.querySelector('.cortina1').src = 'img/cortina2.gif';
            document.querySelector('.cortina2').src = 'img/cortina2.gif';
            break;
          case 'cierra las cortinas':
            document.querySelector('.cortina1').src = 'img/cortina1.png';
            document.querySelector('.cortina2').src = 'img/cortina1.png';
            break;
          case 'enciende la alarma de la casa':
            document.querySelector('.alarma').src = 'img/alarma_on.png';
            document.getElementById('alarma-sound').play();
            break;
          case 'apaga la alarma de la casa':
            document.querySelector('.alarma').src = 'img/alarma_off.png';
            break;
          case 'enciende las cámaras de seguridad':
            document.querySelector('.camara1').src = 'img/c_on.gif';
            document.querySelector('.camara2').src = 'img/c_on.gif';
            document.querySelector('.camara3').src = 'img/c_on.gif';
            break;
          case 'apaga las cámaras de seguridad':
            document.querySelector('.camara1').src = 'img/c_off.png';
            document.querySelector('.camara2').src = 'img/c_off.png';
            document.querySelector('.camara3').src = 'img/c_off.png';
            break;
          default:
            console.log('Comando no reconocido o no ejecutable en este contexto');
            break;
        }
        lastExecutedCommandId = id; // Actualizar el ID de la última orden ejecutada
      } else {
        console.log('Orden ya ejecutada:', command);
      }
    }
  
    function fetchLatestCommand() {
      const url = 'https://631f96f822cefb1edc4eda3a.mockapi.io/Smarthouse'; 
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
          }
          return response.json();
        })
        .then(data => {
          if (data.length > 0) {
            const lastItem = data[data.length - 1];
            lastCommandElement.innerText = `Última orden: ${lastItem.orden}`;
            executeCommand(lastItem.orden, lastItem.id);  // Utilizando el campo 'id' para evitar repeticiones
          } else {
            lastCommandElement.innerText = "No hay datos disponibles.";
          }
        })
        .catch(error => {
          console.error('Error al recuperar datos:', error);
          lastCommandElement.innerText = "Error al cargar los datos.";
        });
    }
  
    // Llamada inicial inmediata y establecer intervalo para actualizar cada 2 segundos
    fetchLatestCommand();
    setInterval(fetchLatestCommand, 2000);
});
