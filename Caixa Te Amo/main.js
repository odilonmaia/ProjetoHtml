// main.js

const { app, BrowserWindow } = require('electron');
const path = require('path');

// Função que cria a janela do navegador.
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800, // Largura da janela
    height: 600, // Altura da janela
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Opcional, para scripts mais seguros
    }
  });

  // Carrega o seu arquivo index.html na janela.
  win.loadFile('index.html');

  // Opcional: Abre as ferramentas de desenvolvedor (como o "Inspecionar Elemento")
  // win.webContents.openDevTools();
};

// Este método será chamado quando o Electron terminar de inicializar.
app.whenReady().then(() => {
  createWindow();

  // Garante que o app abra uma janela no macOS mesmo se não houver nenhuma
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Encerra o aplicativo quando todas as janelas forem fechadas (exceto no macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});