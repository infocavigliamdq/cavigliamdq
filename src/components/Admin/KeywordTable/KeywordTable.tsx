import React, { useEffect, useState } from 'react';
import Loading from '../../Loading/Loading'; // Asegúrate de que este path sea correcto

// Importa los íconos de react-icons (Font Awesome)
import { FaMousePointer, FaEye, FaChartLine, FaSearch } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function EstadisticasGSC() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'clicks' | 'impressions' | 'ctr' | 'position'>('clicks');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');


  useEffect(() => {
    // Realiza la solicitud a tu API de Search Console
    fetch('/api/searchconsole')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('No se pudieron cargar los datos. Inténtalo de nuevo más tarde.');
      });
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  // Muestra el componente de carga mientras se obtienen los datos
  if (!data) {
    return <Loading />;
  }

  // Muestra un mensaje de error si la carga falla
  if (error) {
    return <div className="p-4 text-red-600 bg-red-100 rounded-md">{error}</div>;
  }

  // Función para formatear números con separadores de miles (ej. 1.234.567)
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  // Prepara los datos para el gráfico comparativo
  const chartData = [
    {
      name: 'Últimos 7 días',
      clicks: data.last7?.clicks || 0,
      impressions: data.last7?.impressions || 0,
    },
    {
      name: 'Últimos 28 días',
      clicks: data.last28?.clicks || 0,
      impressions: data.last28?.impressions || 0,
    },
    {
      name: 'Últimos 3 meses', // Correspondiente a 90 días
      clicks: data.last90?.clicks || 0,
      impressions: data.last90?.impressions || 0,
    },
  ];

  // Lógica para ordenar las palabras clave:
  // 1. Copia el array para no mutar el estado original.
  // 2. Ordena primero por 'clicks' de forma descendente (más clics primero).
  // 3. Si los clics son iguales, ordena por 'position' de forma ascendente (mejor posición - número más bajo - primero).
const sortedTopQueries = data.topQueriesLast28Days
  ? [...data.topQueriesLast28Days].sort((a, b) => {
      const aVal = a[sortBy] ?? 0;
      const bVal = b[sortBy] ?? 0;

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    })
  : [];
  
  const handleSort = (key: 'clicks' | 'impressions' | 'ctr' | 'position') => {
  if (sortBy === key) {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  } else {
    setSortBy(key);
    setSortOrder('desc'); // Por defecto descendente
  }
};

  return (
    <div className="p-4 space-y-6 bg-gray-50 rounded-md shadow-md min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 border-b pb-3 mb-6">
        📊 Rendimiento (Google Search Console)
      </h2>

      {/* Sección de Tarjetas de Resumen por Período */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['last7', 'last28', 'last90'].map((key) => (
          <div key={key} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              {key === 'last7' ? 'Últimos 7 días' :
                key === 'last28' ? 'Últimos 28 días' : 'Últimos 3 meses'}
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600 text-lg">
                <FaMousePointer className="h-6 w-6 text-blue-500 mr-2" />
                <strong>Clics totales:</strong> <span className="ml-2 font-semibold text-blue-600">{formatNumber(data[key]?.clicks || 0)}</span>
              </p>
              <p className="flex items-center text-gray-600 text-lg">
                <FaEye className="h-6 w-6 text-green-500 mr-2" />
                <strong>Impresiones totales:</strong> <span className="ml-2 font-semibold text-green-600">{formatNumber(data[key]?.impressions || 0)}</span>
              </p>
              <p className="flex items-center text-gray-600 text-lg">
                <FaChartLine className="h-6 w-6 text-purple-500 mr-2" />
                <strong>CTR medio:</strong> <span className="ml-2 font-semibold text-purple-600">{(data[key]?.ctr * 100 || 0).toFixed(2)}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección del Gráfico Comparativo de Clics e Impresiones */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Comparativa de Clics e Impresiones por Período</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatNumber(value)} />
            <Legend />
            <Bar dataKey="clicks" fill="#4f46e5" name="Clics" />
            <Bar dataKey="impressions" fill="#10b981" name="Impresiones" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sección para las Palabras Clave Principales */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          <FaSearch className="inline-block h-6 w-6 text-indigo-600 mr-2" /> Palabras Clave Principales (Últimos 3 meses)
        </h3>
        {sortedTopQueries && sortedTopQueries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Palabra Clave
                  </th>
                  <th onClick={() => handleSort('clicks')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Clics {sortBy === 'clicks' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => handleSort('impressions')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Impresiones {sortBy === 'impressions' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => handleSort('ctr')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    CTR {sortBy === 'ctr' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => handleSort('position')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Posición Media {sortBy === 'position' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTopQueries.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.query}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatNumber(item.clicks)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatNumber(item.impressions)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.ctr * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.position.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No hay datos de palabras clave disponibles para el período.</p>
        )}
      </div>
    </div>
  );
}