import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import BooksTable from './components/BooksTable';
import UsersTable from './components/UsersTable';
import LoansTable from './components/LoansTable';
import Encabezado from './components/Encabezado';
import Pie from './components/Pie';

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'libros':
        return <BooksTable />;
      case 'usuarios':
        return <UsersTable />;
      case 'prestamos':
        return <LoansTable />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className='App'>
      <Encabezado />
      <div className="app-layout">
        <Navbar onMenuChange={setActiveMenu} />
        <main className="app-content">
          {renderContent()}
        </main>
      </div>
      <Pie />
    </div>
  );
}

export default App;
