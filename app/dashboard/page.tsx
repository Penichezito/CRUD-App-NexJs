export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards de estatísticas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total de Vendas</h2>
            <p className="text-3xl font-bold">R$ 15.75</p>
          </div>
          {/* Adicionar mais cards conforme necessário */}
        </div>
      </div>
    )
  }
  
  