// src/pages/ListPresencas.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListPresencas.css';

const BASE_URL_API = process.env.REACT_APP_API_URL || "http://179.154.75.165:3001";

function ListPresencas() {
    const [presencas, setPresencas] = useState([]);
    const [error, setError] = useState(null);
    const [totalConfirmadas, setTotalConfirmadas] = useState(0);

    useEffect(() => {
        const fetchPresencas = async () => {
            try {
                const response = await axios.get(`${BASE_URL_API}/presencas`);
                setPresencas(response.data);
            } catch (error) {
                setError('Erro ao carregar presenças');
            }
        };
        fetchPresencas();
    }, []);

    useEffect(() => {
        setTotalConfirmadas(presencas.filter(presenca => presenca.eleitor.votou).length);
    }, [presencas]);

    return (
        <div className="list-presencas">
            <h2>Presenças Confirmadas</h2>
            {error && <p className="error">{error}</p>}

            {/* Card com a quantidade total de presenças confirmadas */}
            <div className="total-presencas-card">
                <h3>Total de Presenças Confirmadas</h3>
                <p>{totalConfirmadas}</p>
            </div>

            <Link to="/dashboard" className="back-button">Voltar</Link>

            <table>
                <thead>
                    <tr>
                        <th>Horário</th>
                        <th>Associado</th>
                        <th>Matricula</th>
                        <th>Sessão</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {presencas.map((presenca) => (
                        <tr key={presenca.id}>
                            <td>{new Date(presenca.dataPresenca).toLocaleTimeString()}</td>
                            <td>{presenca.eleitor.nome}</td>
                            <td>{presenca.eleitor.matricula}</td>
                            <td>{presenca.sessao.local} - {presenca.sessao.numero}</td>
                            <td
                                className={presenca.eleitor.votou ? 'status-confirmado' : 'status-nao-confirmado'}
                            >
                                {presenca.eleitor.votou ? 'Confirmado' : 'Não Confirmado'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListPresencas;
