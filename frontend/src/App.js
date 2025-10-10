import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';
const BASE_URL = 'http://localhost:3001';

const AlertPopup = ({ message, type, onDismiss }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onDismiss, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message) return null;

  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className={`fixed top-5 right-5 z-50 max-w-sm w-full p-4 rounded-lg shadow-lg text-white font-semibold animate-fade-in-down ${typeClasses[type]}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onDismiss} className="font-bold text-xl ml-4 opacity-70 hover:opacity-100">&times;</button>
      </div>
    </div>
  );
};

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center animate-fade-in-up">
        <p className="text-lg font-semibold text-blue-900 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition"
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ setPage }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
    <div className="max-w-md w-full">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-3">Controle Financeiro</h1>
      <p className="text-gray-600 text-lg mb-10">Sua vida financeira, organizada de forma simples e eficaz.</p>
      <div className="space-y-4">
        <button
          onClick={() => setPage('login')}
          className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
        >
          Entrar na Minha Conta
        </button>
        <button
          onClick={() => setPage('register')}
          className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-transform transform hover:scale-105"
        >
          Criar Nova Conta
        </button>
      </div>
    </div>
  </div>
);

const AuthPageLayout = ({ children, title, setPage }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
      <button 
        onClick={() => setPage('home')}
        className="absolute top-6 left-6 text-gray-500 hover:text-blue-900 font-semibold transition"
      >
        &larr; Voltar
      </button>
      <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">{title}</h2>
      {children}
    </div>
  </div>
);

const LoginPage = ({ setPage, loginForm, setLoginForm, handleLogin, loading }) => (
  <AuthPageLayout title="Acesse sua conta" setPage={setPage}>
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={loginForm.email}
          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1 font-semibold">Senha</label>
        <input
          type='password'
          value={loginForm.password}
          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
          placeholder="••••••••"
        />
      </div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition disabled:bg-gray-300"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </div>
  </AuthPageLayout>
);

const RegisterPage = ({ setPage, registerForm, setRegisterForm, handleRegister, loading }) => (
  <AuthPageLayout title="Crie sua conta" setPage={setPage}>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1 font-semibold">Nome Completo</label>
        <input
          type="text"
          value={registerForm.name}
          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
          placeholder="Seu nome"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={registerForm.email}
          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
          placeholder="Seu melhor e-mail"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1 font-semibold">Senha</label>
        <input
          type="password"
          value={registerForm.password}
          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
          placeholder="Crie uma senha forte"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1 font-semibold">Confirme sua Senha</label>
        <input
          type="password"
          value={registerForm.confirmPassword}
          onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
          placeholder="Repita a senha"
        />
      </div>
      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-yellow-400 text-blue-900 py-3 mt-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition disabled:bg-gray-300"
      >
        {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
      </button>
    </div>
  </AuthPageLayout>
);

const DashboardPage = ({ 
  user, 
  stats, 
  transactions, 
  transactionForm, 
  setTransactionForm, 
  handleAddTransaction, 
  handleDeleteTransaction,
  handleLogout,
  loading,
  categories 
}) => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-400">Painel Financeiro</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium hidden sm:block">Olá, {user.name.split(' ')[0]}</span>
          <button
            onClick={handleLogout}
            className="font-bold bg-yellow-400 text-blue-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <span className="text-gray-600 font-semibold">Saldo Atual</span>
          <p className={`text-4xl font-bold mt-2 ${(Number(stats.saldo) || 0) >= 0 ? 'text-blue-900' : 'text-red-600'}`}>
            R$ {(Number(stats.saldo) || 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <span className="text-gray-600 font-semibold">Total de Receitas</span>
          <p className="text-3xl font-bold text-green-600 mt-2">R$ {(Number(stats.total_receitas) || 0).toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <span className="text-gray-600 font-semibold">Total de Despesas</span>
          <p className="text-3xl font-bold text-red-600 mt-2">R$ {(Number(stats.total_despesas) || 0).toFixed(2)}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Nova Transação</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setTransactionForm({...transactionForm, type: 'receita', category: ''})}
                className={`py-2 rounded-lg font-bold transition ${transactionForm.type === 'receita' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                Receita
              </button>
              <button 
                onClick={() => setTransactionForm({...transactionForm, type: 'despesa', category: ''})}
                className={`py-2 rounded-lg font-bold transition ${transactionForm.type === 'despesa' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                Despesa
              </button>
            </div>
            <input
              type="text"
              value={transactionForm.description}
              onChange={(e) => setTransactionForm({...transactionForm, description: e.target.value})}
              className="w-full px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
              placeholder="Descrição (ex: Salário)"
            />
            <select
              value={transactionForm.category}
              onChange={(e) => setTransactionForm({...transactionForm, category: e.target.value})}
              className="w-full px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
            >
              <option value="">Selecione a Categoria</option>
              {categories[transactionForm.type].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-4">
              <input
                type="number"
                step="0.01"
                value={transactionForm.amount}
                onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                className="w-1/2 px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
                placeholder="Valor (R$)"
              />
              <input
                type="date"
                value={transactionForm.date}
                onChange={(e) => setTransactionForm({...transactionForm, date: e.target.value})}
                className="w-1/2 px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cupom Fiscal (Opcional)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setTransactionForm({...transactionForm, receipt: e.target.files[0]})}
                className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <button
              onClick={handleAddTransaction}
              disabled={loading}
              className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition disabled:bg-gray-300"
            >
              {loading ? 'Adicionando...' : 'Adicionar'}
            </button>
          </div>
        </div>
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Histórico</h2>
          <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-2">
            {transactions.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mt-4 text-lg">Nenhuma transação registrada.</p>
              </div>
            ) : (
              transactions.map(t => (
                <div key={t.id} className="flex items-center gap-4 p-3 border-b border-gray-200 last:border-b-0">
                  <div className={`w-3 h-12 rounded-full ${t.tipo === 'receita' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{t.descricao}</p>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-500">{t.categoria}</p>
                      {t.cupom_fiscal && (
                        <a
                          href={`${BASE_URL}/uploads/${t.cupom_fiscal}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline font-semibold"
                        >
                          Ver Cupom
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.tipo === 'receita' ? '+' : '-'} R$ {parseFloat(t.valor).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(t.data).toLocaleDateString('pt-BR')}</p>
                  </div>
                   <button
                      onClick={() => handleDeleteTransaction(t.id)}
                      className="text-gray-400 hover:text-red-600 font-bold text-2xl"
                      title="Excluir transação"
                    >
                      &times;
                    </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  </div>
);

const SecureFintech = () => {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ total_receitas: 0, total_despesas: 0, saldo: 0 });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [confirmation, setConfirmation] = useState({ message: '', onConfirm: null });
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [transactionForm, setTransactionForm] = useState({
    type: 'receita',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    receipt: null
  });

  const categories = {
    receita: ['Salário', 'Freelance', 'Investimentos', 'Vendas', 'Bônus', 'Outros'],
    despesa: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Compras', 'Impostos', 'Outros']
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setPage('dashboard');
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadTransactions();
      loadStats();
    }
  }, [user]);

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const loadTransactions = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/transactions/${user.id}`);
      const data = await response.json();
      setTransactions(Array.isArray(data) ? data.sort((a, b) => new Date(b.data) - new Date(a.data)) : []);
    } catch (error) {
      showAlert('Erro ao carregar transações.', 'error');
    }
  };

  const loadStats = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/stats/${user.id}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      showAlert('Erro ao carregar estatísticas.', 'error');
    }
  };

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      return showAlert('Preencha todos os campos!', 'error');
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        setPage('dashboard');
        setLoginForm({ email: '', password: '' });
      } else {
        showAlert(data.error || 'Erro ao fazer login.', 'error');
      }
    } catch (error) {
      showAlert('Erro de conexão com o servidor.', 'error');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      return showAlert('Preencha todos os campos!', 'error');
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      return showAlert('As senhas não coincidem!', 'error');
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerForm.name, email: registerForm.email, password: registerForm.password })
      });
      const data = await response.json();
      if (response.ok) {
        showAlert('Cadastro realizado com sucesso! Faça o login.', 'success');
        setPage('login');
        setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        showAlert(data.error || 'Erro ao cadastrar.', 'error');
      }
    } catch (error) {
      showAlert('Erro de conexão com o servidor.', 'error');
    }
    setLoading(false);
  };

  const handleAddTransaction = async () => {
    if (!transactionForm.description || !transactionForm.amount || !transactionForm.category) {
      return showAlert('Preencha descrição, valor e categoria!', 'error');
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('type', transactionForm.type);
    formData.append('description', transactionForm.description);
    formData.append('amount', transactionForm.amount);
    formData.append('date', transactionForm.date);
    formData.append('category', transactionForm.category);
    if (transactionForm.receipt) {
      formData.append('receipt', transactionForm.receipt);
    }

    try {
      const response = await fetch(`${API_URL}/transactions`, { method: 'POST', body: formData });
      if (response.ok) {
        showAlert('Transação adicionada com sucesso!', 'success');
        setTransactionForm({ type: 'receita', description: '', amount: '', date: new Date().toISOString().split('T')[0], category: '', receipt: null });
        loadTransactions();
        loadStats();
      } else {
        const data = await response.json();
        showAlert(data.error || 'Erro ao adicionar transação.', 'error');
      }
    } catch (error) {
      showAlert('Erro de conexão com o servidor.', 'error');
    }
    setLoading(false);
  };

  const handleDeleteTransaction = (id) => {
    setConfirmation({
      message: 'Tem certeza que deseja excluir esta transação?',
      onConfirm: () => executeDelete(id),
    });
  };

  const executeDelete = async (id) => {
    setConfirmation({ message: '', onConfirm: null });
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, { method: 'DELETE' });
      if (response.ok) {
        showAlert('Transação excluída com sucesso!', 'success');
        loadTransactions();
        loadStats();
      } else {
        showAlert('Erro ao excluir transação.', 'error');
      }
    } catch (error) {
      showAlert('Erro de conexão com o servidor.', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setTransactions([]);
    setStats({ total_receitas: 0, total_despesas: 0, saldo: 0 });
    setPage('home');
  };

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage setPage={setPage} loginForm={loginForm} setLoginForm={setLoginForm} handleLogin={handleLogin} loading={loading} />;
      case 'register':
        return <RegisterPage setPage={setPage} registerForm={registerForm} setRegisterForm={setRegisterForm} handleRegister={handleRegister} loading={loading} />;
      case 'dashboard':
        return user ? <DashboardPage user={user} stats={stats} transactions={transactions} transactionForm={transactionForm} setTransactionForm={setTransactionForm} handleAddTransaction={handleAddTransaction} handleDeleteTransaction={handleDeleteTransaction} handleLogout={handleLogout} loading={loading} categories={categories} /> : <HomePage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="font-sans">
      <AlertPopup 
        message={alert.message} 
        type={alert.type} 
        onDismiss={() => setAlert({ message: '', type: '' })} 
      />
      <ConfirmationPopup
        message={confirmation.message}
        onConfirm={confirmation.onConfirm}
        onCancel={() => setConfirmation({ message: '', onConfirm: null })}
      />
      {renderPage()}
    </div>
  );
};

export default SecureFintech;