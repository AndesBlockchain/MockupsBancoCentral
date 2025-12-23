import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginBancoCentral from './pages/LoginBancoCentral'
import LoginParticipante from './pages/LoginParticipante'
import ConectarMetamaskBCentral from './pages/ConectarMetamaskBCentral'
import ConectarMetamaskParticipante from './pages/ConectarMetamaskParticipante'
import HomeBancoCentral from './pages/HomeBancoCentral'
import HomeParticipante from './pages/HomeParticipante'
import AdministrarBancos from './pages/AdministrarBancos'
import AdministrarCBDC from './pages/AdministrarCBDC'
import ManejarWalletBCentral from './pages/ManejarWalletBCentral'
import CartolaBancoCentral from './pages/CartolaBancoCentral'
import AdministrarUsuarios from './pages/AdministrarUsuarios'
import EmisionIIFBCentral from './pages/EmisionIIFBCentral'
import IIFsEmitidosBCentral from './pages/IIFsEmitidosBCentral'
import MiWalletParticipante from './pages/MiWalletParticipante'
import CartolaParticipante from './pages/CartolaParticipante'
import MisIIFsParticipante from './pages/MisIIFsParticipante'
import MercadoSecundarioParticipante from './pages/MercadoSecundarioParticipante'
import UsuariosParticipante from './pages/UsuariosParticipante'
import TransferirParticipante from './pages/TransferirParticipante'
import GenerarValeVistaParticipante from './pages/GenerarValeVistaParticipante'
import PedirValeVistaParticipante from './pages/PedirValeVistaParticipante'
import EmisionPrimariaParticipante from './pages/EmisionPrimariaParticipante'
import IIFsParticipante from './pages/IIFsParticipante'
import ValoresPrendadosParticipante from './pages/ValoresPrendadosParticipante'
import GenerarWalletPivoteParticipante from './pages/GenerarWalletPivoteParticipante'
import EmitirIIFParticipante from './pages/EmitirIIFParticipante'
import AdministrarUF from './pages/AdministrarUF'
import AdministrarCalendario from './pages/AdministrarCalendario'
import ImpuestosRetenidos from './pages/ImpuestosRetenidos'
import PagoPDBCBCU from './pages/PagoPDBCBCU'
import VencimientosPagados from './pages/VencimientosPagados'
import CrearIIF from './pages/CrearIIF'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-banco-central" element={<LoginBancoCentral />} />
        <Route path="/login-participante" element={<LoginParticipante />} />
        <Route path="/conectar-metamask-bcentral" element={<ConectarMetamaskBCentral />} />
        <Route path="/conectar-metamask-participante" element={<ConectarMetamaskParticipante />} />
        <Route path="/home-banco-central" element={<HomeBancoCentral />} />
        <Route path="/home-participante" element={<HomeParticipante />} />
        <Route path="/administrar-bancos" element={<AdministrarBancos />} />
        <Route path="/administrar-cbdc" element={<AdministrarCBDC />} />
        <Route path="/wallet-banco-central" element={<ManejarWalletBCentral />} />
        <Route path="/cartola-banco-central" element={<CartolaBancoCentral />} />
        <Route path="/administrar-usuarios" element={<AdministrarUsuarios />} />
        <Route path="/emision-iif-bcentral" element={<EmisionIIFBCentral />} />
        <Route path="/iifs-emitidos-bcentral" element={<IIFsEmitidosBCentral />} />
        <Route path="/pago-pdbc-bcu" element={<PagoPDBCBCU />} />
        <Route path="/vencimientos-pagados" element={<VencimientosPagados />} />
        <Route path="/crear-iif" element={<CrearIIF />} />
        <Route path="/mi-wallet-participante" element={<MiWalletParticipante />} />
        <Route path="/cartola-participante" element={<CartolaParticipante />} />
        <Route path="/mis-iifs-participante" element={<MisIIFsParticipante />} />
        <Route path="/mercado-secundario-participante" element={<MercadoSecundarioParticipante />} />
        <Route path="/usuarios-participante" element={<UsuariosParticipante />} />
        <Route path="/transferir-participante" element={<TransferirParticipante />} />
        <Route path="/generar-vale-vista-participante" element={<GenerarValeVistaParticipante />} />
        <Route path="/pedir-vale-vista-participante" element={<PedirValeVistaParticipante />} />
        <Route path="/emision-primaria-participante" element={<EmisionPrimariaParticipante />} />
        <Route path="/iifs-participante" element={<IIFsParticipante />} />
        <Route path="/emitir-iif-participante" element={<EmitirIIFParticipante />} />
        <Route path="/valores-prendados-participante" element={<ValoresPrendadosParticipante />} />
        <Route path="/generar-wallet-pivote-participante" element={<GenerarWalletPivoteParticipante />} />
        <Route path="/administrar-uf" element={<AdministrarUF />} />
        <Route path="/administrar-calendario" element={<AdministrarCalendario />} />
        <Route path="/impuestos-retenidos" element={<ImpuestosRetenidos />} />
      </Routes>
    </Router>
  )
}

export default App
