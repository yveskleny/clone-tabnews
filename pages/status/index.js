import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseInfo />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let databaseVersionText = "Carregando...";
  let maxConnectionsText = "Carregando...";
  let openedConnectionsText = "Carregando...";

  if (!isLoading && data) {
    databaseVersionText = data.dependencies.database.version;
    maxConnectionsText = data.dependencies.database.max_connections;
    openedConnectionsText = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <h2>Banco de Dados</h2>
      <p>
        Versão do PostgreSQL: {databaseVersionText}
        <br />
        Conexões disponíveis: {maxConnectionsText}
        <br />
        Conexões abertas: {openedConnectionsText}
        <br />
      </p>
    </div>
  );
}
