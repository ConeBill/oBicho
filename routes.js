document.addEventListener('DOMContentLoaded', () => {

  const iniciarButton = document.getElementById('iniciar');
  const returnHomeButton = document.getElementById('returnHome');

  if (iniciarButton) {
    console.log('a'),
    
    iniciarButton.addEventListener('click', () => {
      window.location.href = 'jogo.html';
    });
  }

  if (returnHomeButton) {
    returnHomeButton.addEventListener('click', () => {
      console.log('botão de retorno clicado');
      window.location.href = 'index.html';
    });
  }
});
