import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  User,
  Search,
  MoreVertical,
  Phone,
  Info,
  Plus,
  Smile,
  Send,
  Car,
  CheckCircle2,
  CheckCheck
} from 'lucide-react';

import UserNavbar from '../components/userNavbar';
import { Link } from 'react-router-dom';

export default function ChatCarona() {
  const [activeTab, setActiveTab] = useState('grupo');

  return (
    <div className="h-screen bg-[#F4F6F4] text-gray-800 flex flex-col font-sans overflow-hidden">
  
      <UserNavbar />

   
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col gap-3 overflow-hidden">
        
  
        <div className="flex justify-between items-center shrink-0">
          <div>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase tracking-wider mb-1"
            >
              <ArrowLeft size={14} className="mr-1" /> Voltar para minhas caronas
            </Link>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Chat da Carona</h1>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> AO VIVO
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Campus A &rarr; Campus B &bull; Hoje, 21:21</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-3 py-1 rounded-full uppercase">
              Você é passageiro
            </span>
            <span className="text-xs font-semibold bg-[#00C853] text-white px-3 py-1 rounded-full uppercase">
              Confirmada
            </span>
          </div>
        </div>

      
        <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
          
        
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-3 h-full min-h-0">
            
           
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3.5 flex flex-col flex-1 min-h-0">
              <div className="relative mb-2.5 shrink-0">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar mensagens ou membros..."
                  className="w-full bg-gray-50 text-xs rounded-lg pl-9 pr-3 py-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex bg-gray-100 p-1 rounded-lg mb-2.5 text-xs font-medium shrink-0">
                <button
                  onClick={() => setActiveTab('grupo')}
                  className={`flex-1 py-1 rounded-md transition text-center ${
                    activeTab === 'grupo' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'
                  }`}
                >
                  Grupo (1)
                </button>
                <button
                  onClick={() => setActiveTab('diretas')}
                  className={`flex-1 py-1 rounded-md transition text-center flex items-center justify-center gap-1 ${
                    activeTab === 'diretas' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'
                  }`}
                >
                  Diretas <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">1</span>
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto flex-1 pr-1">
              
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                        <Car size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Grupo da Carona</h4>
                        <p className="text-[10px] text-gray-500">Campus A &rarr; B</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">20:28</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate mb-2">
                    <span className="font-semibold">Motorista:</span> Combinado! Carro é o Polo prata...
                  </p>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">CONFIRMADA</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> 3 membros ativos
                    </span>
                  </div>
                </div>

             
                <div className="p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition border border-transparent">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        <User size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Motorista</h4>
                        <span className="text-[10px] text-emerald-600 font-medium">Motorista &bull; Engenharia</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">18:40</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">Combinado, até mais tarde!</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-gray-400">Privado</span>
                    <span className="w-4 h-4 bg-emerald-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>

        
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3.5 shrink-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">VEÍCULO & OCUPAÇÃO</span>
                <Car size={16} className="text-emerald-500" />
              </div>
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Car size={18} className="text-gray-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">VW Polo TSI &bull; Prata</h4>
                  <p className="text-[10px] text-gray-400 uppercase">ABC-1234</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 text-[10px]">Lugares preenchidos</span>
                  <span className="font-bold text-gray-800 text-[10px]">3 de 4</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00C853] h-full w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>

          </div>

          
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-0">
            
        
            <div className="p-3.5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500 text-[10px]">
                      <User size={12} />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600 text-[10px]">
                      <User size={12} />
                    </div>
                    <div className="h-6 w-6 rounded-full bg-emerald-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">
                      Você
                    </div>
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-gray-800">Grupo da Carona &bull; Campus A &rarr; B</h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">CONFIRMADA</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">3 passageiros + motorista &bull; partida prevista às 21:21</p>
              </div>

              <div className="flex items-center space-x-1.5 text-gray-500">
                <button className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50">
                  <Info size={14} /> Detalhes
                </button>
                <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Phone size={14} />
                </button>
                <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>

        
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-1.5 flex justify-between items-center text-xs text-gray-600 shrink-0">
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Campus A <span className="text-gray-400">(Portão 2)</span></span>
                <span>&rarr;</span>
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span>Campus B <span className="text-gray-400">(Biblioteca Central)</span></span>
              </div>
              <span className="text-gray-400 text-[10px]">21:21</span>
            </div>

           
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white min-h-0">
              <div className="flex justify-center">
                <span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-0.5 rounded-full font-medium">
                  Hoje &bull; 22 de Setembro
                </span>
              </div>

             
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex items-center space-x-2.5 max-w-md mx-auto my-1">
                <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <p className="text-xs text-emerald-900">
                  <span className="font-bold">Sua vaga foi confirmada.</span> Veículo: VW Polo Prata (ABC-1234).
                </p>
              </div>

             
              <div className="flex space-x-2 max-w-lg">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 shrink-0">
                  <User size={14} />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <span className="text-xs font-bold text-gray-800">Motorista</span>
                    <span className="text-[8px] bg-emerald-100 text-emerald-700 px-1 py-0.2 rounded font-bold uppercase">MOTORISTA</span>
                    <span className="text-[10px] text-gray-400">20:15</span>
                  </div>
                  <div className="bg-gray-100 text-gray-800 text-xs p-2.5 rounded-2xl rounded-tl-none">
                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error harum quia qui odio saepe nobis totam voluptatibus repudiandae.  
                  </div>
                </div>
              </div>

              
              <div className="flex space-x-2 max-w-lg">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 shrink-0">
                  <User size={14} />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <span className="text-xs font-bold text-gray-800">Passageiro 1</span>
                    <span className="text-[8px] bg-gray-100 text-gray-600 px-1 py-0.2 rounded font-bold uppercase">PASSAGEIRO</span>
                    <span className="text-[10px] text-gray-400">20:20</span>
                  </div>
                  <div className="bg-gray-100 text-gray-800 text-xs p-2.5 rounded-2xl rounded-tl-none">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </div>
                </div>
              </div>

             
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1.5 mb-0.5">
                  <span className="text-[10px] text-gray-400">20:25</span>
                  <span className="text-xs font-bold text-gray-800">Você</span>
                </div>
                <div className="bg-[#00C853] text-white text-xs p-2.5 rounded-2xl rounded-tr-none max-w-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, velit magnam inventore
                </div>
                <span className="text-[9px] text-gray-400 flex items-center gap-0.5 mt-0.5">
                  Lida <CheckCheck size={11} className="text-emerald-500" />
                </span>
              </div>
            </div>

         
            {/* <div className="px-3 py-1.5 border-t border-gray-100 bg-gray-50/50 flex items-center space-x-2 overflow-x-auto text-xs shrink-0">
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase shrink-0">ATALHOS:</span>
              {['Estou a caminho', 'Cheguei no ponto', 'Onde você está?', 'Já estou no carro '].map((text, idx) => (
                <button
                  key={idx}
                  className="bg-white border border-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full text-xs shrink-0 hover:bg-gray-100 transition"
                >
                  {text}
                </button>
              ))}
            </div> */}

           
            <div className="p-2.5 border-t border-gray-100 bg-white flex items-center space-x-2 shrink-0">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Plus size={18} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Smile size={18} />
              </button>
              <input
                type="text"
                placeholder="Digite sua mensagem para o grupo..."
                className="flex-1 bg-gray-50 border border-gray-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button className="p-2 bg-[#00C853] text-white rounded-lg hover:bg-emerald-600 transition">
                <Send size={15} />
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}