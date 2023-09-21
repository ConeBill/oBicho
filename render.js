document.addEventListener('DOMContentLoaded', () => {
  const numeroNivel = document.getElementById('numeroNivel'); // numero do nível
  const nivelProgress = document.getElementById('nivel'); // barra de nível
  const vidaProgress = document.getElementById('vida');
  const energiaProgress = document.getElementById('energia');
  const felicidadeProgress = document.getElementById('felicidade');
  const fomeProgress = document.getElementById('fome');
  const alimentarButton = document.getElementById('alimentar');
  const listaOpcoes = document.getElementById('listaOpcoes');
  const bifeButton = document.getElementById('bife');
  const bolachaButton = document.getElementById('bolacha');
  const dormirButton = document.getElementById('dormir');
  const brincarButton = document.getElementById('brincar');
  const passearButton = document.getElementById('passear');
  const caixaNotificacao = document.getElementById('notificacao'); // Para o Cone

  let nivel = 0;
  let vida = 100;
  let energia = 100;
  let felicidade = 100;
  let fome = 0;


  function updateUI() {
    nivel = Math.min(Math.max(nivel, 0), 100);
    vida = Math.min(Math.max(vida, 0), 100);
    energia = Math.min(Math.max(energia, 0), 100);
    felicidade = Math.min(Math.max(felicidade, 0), 100);
    fome = Math.min(Math.max(fome, 0), 100);

    nivelProgress.value = nivel;
    vidaProgress.value = vida;
    energiaProgress.value = energia;
    felicidadeProgress.value = felicidade;
    fomeProgress.value = fome;

    let vidaMaxima = true;
    let morte = false;

    if (vida != 100) { vidaMaxima = false };
    if (vida <= 0) { morte = true };

    if (nivel === 100) {
      numeroNivel.textContent = parseInt(numeroNivel.textContent) + 1;
      nivel = 0;
    } // passa de nível e reseta a barra
  };

  function habilitaBotao() {
    let botaoHabilitado = true;
    passearButton.disabled = false;
  };

  function eventoAleatorio() {
    const numeroAleatorio = Math.random();

    const chanceDoenca = 0.1; // 10%
    const chanceRecompensa = 0.2; // 20%

    if (numeroAleatorio < chanceDoenca) {
      return "Contraiu uma doença";
    } else if (numeroAleatorio < chanceDoenca + chanceRecompensa) {
      return "Encontrou recompensa"
    } else { return "Nenhum evento" };
  };

  setInterval(() => {
    energia -= 5,
      felicidade -= 5,
      fome += 5;

    if (fome >= 100) {
      felicidade -= 30,
        energia -= 10;
      vida -= 10;
    };

    if (energia <= 0) vida -= 5;

    updateUI();
  }, 60000);

  alimentarButton.addEventListener('click', () => {
    if (listaOpcoes.style.display === "none" || listaOpcoes.style.display === "") {
      listaOpcoes.style.display = "block";
    } else { listaOpcoes.style.display = "none"; };
  });

  bifeButton.addEventListener('click', () => {
    if (fome > 0) {
      vida += 15,
        fome -= 20,
        nivel += 2;
    } else { console.log('Cheio demais...') }; // BUG

    updateUI();
  });

  bolachaButton.addEventListener('click', () => {
    if (fome > 0) {
      vida += 5,
        fome -= 10,
        nivel += 1;
    } else { console.log('Cheio demais...') }; // BUG

    updateUI();
  });

  dormirButton.addEventListener('click', () => {
    if (energia < 100) {
      energia += 30,
        fome += 5;
      nivel += 2;
    } else { console.log('Sem sono...') }; // BUG

    updateUI();
  });

  brincarButton.addEventListener('click', () => {
    if (energia >= 10) {
      energia -= 10,
        felicidade += 10,
        fome += 10,
        nivel += 3;
    } else { console.log(energia); }; // BUG

    if (fome < 90) {
      energia -= 10,
        felicidade += 10,
        fome += 10,
        nivel += 3;
    } else { console.log('Muita fome para brincar...') }; // BUG

    updateUI();
  });

  passearButton.addEventListener('click', () => {
    if (botaoHabilitado = true) {
      felicidade += 50,
        fome += 20,
        nivel += 20,
        energia -= 20;

      passearButton.disabled = true;

      setTimeout(() => {
        habilitaBotao();
      }, 1200);
    } else if (energia < 20) { console.log(energia) } // BUG

    const resultadoEvento = eventoAleatorio();
    console.log(resultadoEvento);

    updateUI();
  });

  updateUI();
});