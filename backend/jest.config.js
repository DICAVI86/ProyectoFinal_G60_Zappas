export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest', // Usa Babel para transformar JS/TS
    },
    setupFiles: ['dotenv/config'], // Opcional: Carga variables de entorno
  };