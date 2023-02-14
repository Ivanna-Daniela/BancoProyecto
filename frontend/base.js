'use strict';
window.addEventListener('load', () => {
  let form = document.querySelector('#login');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the form from submitting
    let nombre = document.querySelector('#name').value;
    let correo = document.querySelector('#mail').value;
    let password = document.querySelector('#password').value;
    if (nombre && correo && password) {
      localStorage.setItem(nombre, JSON.stringify({ nombre, correo, password }));
      form.reset(); // Reset the form
      let divsection = document.querySelector('#secciones');
      divsection.innerHTML = ''; // Clear the previous results

      for (let i in localStorage) {
        try {
          let user = JSON.parse(localStorage[i]);
          if (user.nombre) {
            let h2 = document.createElement('h2');
            h2.innerHTML = `<b> Nombre:</b> ${user.nombre}<br><b>Correo:</b> ${user.correo}<br>`;
            divsection.appendChild(h2);
          }
        } catch (error) {
          // for data that is not json
        }
      }
    } else {
      console.log('Datos incorrectos!');
    }
  });
});