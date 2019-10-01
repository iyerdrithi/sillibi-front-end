export class EnvironmentService {
  static config(): {host: string, socketHost: string, schema: string, socketSchema: string} {
    const cached = JSON.parse(localStorage.getItem('env')) || {};
    return {
      host: cached.host || 'app.stage.fullmeasure.io',
      socketHost: cached.socketHost || 'app-ws.fullmeasure.io',
      schema: cached.schema || 'https',
      socketSchema: cached.socketSchema || 'wss'
    };
  }
}
