import Userpic from "../assets/icons/usericon.png";
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Clock,
  ThumbsUp,
  Share2,
  Flag,
  MessageSquare,
  Leaf,
  Check,
} from "lucide-react";
import UserNavbar from "../components/userNavbar";
import DashFooter from "../components/dashFooter";
import Axios from "axios";
import Header from "./header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DriverReviewPage() {
 const { driver_id } = useParams<{ driver_id: string }>();
  const [driver, setDriver] = useState();
  const getdriver = () => {
    const token = localStorage.getItem("token");
    Axios.get(`http://localhost:3000/driver-review/${driver_id}`, {
   
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDriver(response.data);
      console.log(response.data);
    });
  };

  useEffect(()=>{
    console.log("userid",driver_id);
    getdriver();
  },[]);
  return (
    <div className="min-h-screen bg-vamu-gray font-jakarta text-vamu-dark pb-12">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button className="inline-flex items-center gap-2 text-sm font-medium text-vamu-gray-dark hover:text-vamu-green-dark transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para Resultados de Busca
          </button>
          <span className="text-xs font-semibold text-vamu-gray-dark tracking-wider uppercase">
            Perfil do Motorista
          </span>
          <div className="flex items-center gap-1.5 text-xs text-vamu-green-dark font-medium bg-vamu-green-light px-2.5 py-1 rounded-full border border-vamu-green/20">
            <span className="w-2 h-2 bg-vamu-green rounded-full animate-pulse"></span>
            Motorista verificado ativo no Campus Central
          </div>
        </div>
      </div>

      {/* Conteúdo Principal (Grid 2 Colunas) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda (Principal - 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Perfil do Motorista */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="relative">
                <img
                  src={Userpic}
                  alt="Lucas Mendes"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-vamu-green-light shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-vamu-green text-white p-1 rounded-full shadow-sm">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-vamu-green-dark bg-vamu-green-light px-2.5 py-0.5 rounded-full border border-vamu-green/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Conta Universitária
                    Verificada
                  </span>
                  <span className="text-xs font-mono text-vamu-gray-dark">
                    RA 2021****-SP
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-vamu-dark">
                    Lucas Mendes da Silva
                  </h1>
                  <p className="text-sm text-vamu-gray-dark">
                    Engenharia de Software • 7º Semestre • Universidade Central
                    (Campus A)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-vamu-gray-dark pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-vamu-gray-dark" /> Membro
                    desde Março de 2023
                  </span>
                  <span>•</span>
                  <span>Habitual de seg. a qui. às 18h20</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
              <div className="bg-vamu-gray/50 p-3 rounded-xl">
                <span className="text-xs uppercase font-semibold text-vamu-gray-dark tracking-wider block">
                  Caronas Dadas
                </span>
                <span className="text-2xl font-bold text-vamu-dark">
                  148{" "}
                  <span className="text-xs font-normal text-vamu-gray-dark">
                    viagens
                  </span>
                </span>
              </div>
              <div className="bg-vamu-gray/50 p-3 rounded-xl">
                <span className="text-xs uppercase font-semibold text-vamu-gray-dark tracking-wider block">
                  Conclusão
                </span>
                <span className="text-2xl font-bold text-vamu-green-dark">
                  96%{" "}
                  <span className="text-xs font-normal text-vamu-gray-dark">
                    142 viagens
                  </span>
                </span>
              </div>
              {/* <div className="bg-vamu-gray/50 p-3 rounded-xl">
                <span className="text-xs uppercase font-semibold text-vamu-gray-dark tracking-wider block">
                  Impacto Verde
                </span>
                <span className="text-2xl font-bold text-vamu-green-dark flex items-center justify-center gap-1">
                  <Leaf className="w-4 h-4 text-vamu-green" /> ~320kg{" "}
                  <span className="text-xs font-normal text-vamu-gray-dark">
                    CO₂ poupados
                  </span>
                </span>
              </div> */}
            </div>

            {/* Veículo Cadastrado */}
            <div className="mt-6 bg-vamu-gray/40 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-24 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0 border border-slate-300">
                  <img
                    src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200&auto=format&fit=crop&q=80"
                    alt="VW Polo TSI"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 text-[9px] bg-vamu-dark/80 text-white font-bold px-1 rounded">
                    OFICIAL
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-vamu-gray-dark uppercase tracking-wider">
                    Veículo Cadastrado
                  </div>
                  <div className="font-bold text-vamu-dark text-sm">
                    VW Polo TSI 1.0
                  </div>
                  <div className="flex items-center gap-3 text-xs text-vamu-gray-dark mt-0.5">
                    <span>
                      <strong>Cor:</strong> Prata Metálico
                    </span>
                    <span>
                      <strong>Placa:</strong> ABC-1234
                    </span>
                    <span>
                      <strong>Ano:</strong> 2022
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs bg-vamu-green-light text-vamu-green-dark font-semibold px-3 py-1.5 rounded-full text-center w-full sm:w-auto">
                4 vagas livres
              </span>
            </div>
          </div>

          {/* Card 2: Avaliações da Comunidade */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-vamu-dark">
                  Avaliações da Comunidade
                </h2>
                <p className="text-xs text-vamu-gray-dark">
                  Notas calculadas unicamente a partir de passageiros acadêmicos
                  confirmados
                </p>
              </div>
              <span className="text-xs font-semibold text-vamu-green-dark bg-vamu-green-light px-2.5 py-1 rounded-full border border-vamu-green/20">
                Nível Diamante VAMU
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Nota Grande */}
              <div className="sm:col-span-4 bg-vamu-gray/50 rounded-2xl p-6 text-center border border-slate-100">
                <div className="text-5xl font-black text-vamu-dark tracking-tight">
                  4.9
                </div>
                <div className="flex justify-center my-2 text-amber-400 text-lg">
                  ★★★★★
                </div>
                <div className="text-xs font-medium text-vamu-gray-dark">
                  118 avaliações totais
                </div>
                <span className="inline-block mt-3 text-[10px] uppercase tracking-wider font-bold text-vamu-green-dark bg-vamu-green-light px-2.5 py-0.5 rounded-full">
                  Excelente Reputação
                </span>
              </div>

              {/* Barras de Progresso */}
              <div className="sm:col-span-8 space-y-2">
                {[
                  { star: 5, pct: 88, count: 104 },
                  { star: 4, pct: 8, count: 10 },
                  { star: 3, pct: 2, count: 3 },
                  { star: 2, pct: 1, count: 1 },
                  { star: 1, pct: 0, count: 0 },
                ].map((item) => (
                  <div
                    key={item.star}
                    className="flex items-center gap-3 text-xs text-vamu-dark"
                  >
                    <span className="w-4 font-medium flex items-center">
                      {item.star}{" "}
                      <span className="text-amber-400 text-xs ml-0.5">★</span>
                    </span>
                    <div className="flex-1 bg-vamu-gray h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-vamu-green h-full rounded-full"
                        style={{ width: `${item.pct}%` }}
                      ></div>
                    </div>
                    <span className="w-12 text-right text-vamu-gray-dark font-mono">
                      {item.count} ({item.pct}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Elogios Mais Recorrentes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-vamu-dark">
                  Elogios Mais Recorrentes
                </h2>
                <p className="text-xs text-vamu-gray-dark">
                  Reconhecimentos frequentes enviados por quem já viajou com o
                  Lucas
                </p>
              </div>
              <ThumbsUp className="w-5 h-5 text-vamu-green" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { tag: "Super Pontual", count: 56, icon: "⭐" },
                { tag: "Direção Segura", count: 48, icon: "🛡️" },
                { tag: "Carro Impecável", count: 42, icon: "✨" },
                { tag: "Ótima Conversa", count: 35, icon: "💬" },
                { tag: "Boa Escolha Musical", count: 28, icon: "🎵" },
                { tag: "Ar-condicionado", count: 22, icon: "❄️" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-vamu-gray/40 border border-slate-200/80 rounded-xl p-3 hover:border-vamu-green transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-xs font-semibold text-vamu-dark">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-vamu-dark bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Reports e Histórico de Incidentes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg font-bold text-vamu-dark">
                  Reports da Comunidade & Histórico de Incidentes
                </h2>
                <p className="text-xs text-vamu-gray-dark">
                  Auditoria contínua para segurança coletiva e transparência
                  recíproca entre estudantes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-vamu-gray-dark bg-vamu-gray px-2 py-1 rounded">
                  Últimos 6 meses
                </span>
                <span className="text-[10px] font-semibold text-vamu-green-dark bg-vamu-green-light px-2 py-1 rounded border border-vamu-green/20">
                  Contabilidade Auditada
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {[
                {
                  title: "Atraso no embarque",
                  desc: "Relatado pontualmente na portaria",
                  val: "5 de 148",
                  alert: true,
                },
                {
                  title: "Cancelou em cima da hora / sem motivo",
                  desc: "Comunicação com antecedência reduzida",
                  val: "3 de 148",
                  alert: true,
                },
                {
                  title: "Mudou o trajeto sem avisar",
                  desc: "Desvio no trajeto sem aviso prévio",
                  val: "1 de 148",
                  alert: false,
                },
                {
                  title: "Direção imprudente/perigosa",
                  desc: "Nenhuma queixa registrada",
                  val: "0 ocorrências",
                  ok: true,
                },
                {
                  title: "Veículo sem condições de higiene",
                  desc: "Padrão limpo verificado",
                  val: "0 ocorrências",
                  ok: true,
                },
                {
                  title: "Falta de resposta no chat",
                  desc: "Tempo de resposta médio: 3 min",
                  val: "0 ocorrências",
                  ok: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-vamu-gray/30 rounded-xl p-3 border border-slate-200/70 flex items-center justify-between"
                >
                  <div className="pr-2">
                    <div className="text-xs font-semibold text-vamu-dark">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-vamu-gray-dark">
                      {item.desc}
                    </div>
                  </div>
                  {item.ok ? (
                    <span className="text-[11px] font-semibold text-vamu-green-dark bg-vamu-green-light border border-vamu-green/20 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                      <Check className="w-3 h-3 text-vamu-green" /> {item.val}
                    </span>
                  ) : (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        item.alert
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-vamu-gray text-vamu-dark"
                      }`}
                    >
                      {item.val}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 top-20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-vamu-green-dark uppercase bg-vamu-green-light px-2 py-0.5 rounded-full border border-vamu-green/20 tracking-wider">
                Disponibilidade Imediata
              </span>
              <span className="text-xs font-medium text-vamu-gray-dark">
                Hoje 18:20
              </span>
            </div>

            <h3 className="text-lg font-bold text-vamu-dark mb-4">
              Próxima Carona
            </h3>

            {/* Trajeto Simplificado */}
            <div className="space-y-3 relative pl-4 border-l-2 border-vamu-green/30 ml-2 mb-6">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-vamu-green rounded-full ring-4 ring-white"></div>
                <div className="text-[10px] uppercase font-bold text-vamu-gray-dark">
                  Origem
                </div>
                <div className="text-xs font-semibold text-vamu-dark">
                  Campus Central (Portão 2)
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-vamu-dark rounded-full ring-4 ring-white"></div>
                <div className="text-[10px] uppercase font-bold text-vamu-gray-dark">
                  Destino
                </div>
                <div className="text-xs font-semibold text-vamu-dark">
                  Estação Vila Madalena / Linha 2
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-vamu-gray/50 rounded-xl mb-5">
              <span className="text-xs text-vamu-gray-dark">
                Preço sugerido:
              </span>
              <span className="text-xl font-extrabold text-vamu-dark">
                R$ 8,50{" "}
                <span className="text-xs font-normal text-vamu-gray-dark">
                  /vaga
                </span>
              </span>
            </div>

            {/* Ações */}
            <div className="space-y-2">
              <button className="w-full bg-vamu-green hover:bg-vamu-green-dark text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-vamu-green/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer">
                Solicitar Carona com Lucas
              </button>
              <button className="w-full bg-vamu-gray hover:bg-slate-200 text-vamu-dark font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer">
                <MessageSquare className="w-4 h-4 text-vamu-gray-dark" /> Enviar
                Mensagem no Chat
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-vamu-gray-dark text-center">
              Reserva confirmada via protocolo institucional VAMU
            </div>
          </div>

          {/* Segurança Acadêmica */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-vamu-dark text-sm">
              <ShieldCheck className="w-4 h-4 text-vamu-green" /> Segurança
              Acadêmica
            </div>
            <p className="text-vamu-gray-dark leading-relaxed">
              Todas as caronas contam com rastreamento ativo em tempo real
              compartilhável com contatos de confiança do campus.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <div className="font-semibold text-vamu-dark mb-1">
                Regras de Convivência no Carro:
              </div>
              <ul className="list-disc list-inside text-vamu-gray-dark space-y-1 text-[11px]">
                <li>Uso de cinto obrigatório em todos os assentos</li>
                <li>Não é permitido fumar dentro do veículo</li>
                <li>Tolerância máxima no ponto de encontro: 5 min</li>
              </ul>
            </div>
          </div>

          {/* Denúncia e Links Discretos */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-vamu-gray-dark hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer">
              <span className="flex items-center gap-2 font-medium">
                <Flag className="w-3.5 h-3.5 text-vamu-gray-dark" /> Denunciar
                ou Sinalizar Perfil
              </span>
              <span>›</span>
            </button>
            <p className="text-[10px] text-vamu-gray-dark text-center px-2">
              A ouvidoria acadêmica da Universidade Central opera 100% dos
              relatos com sigilo absoluto.
            </p>

            <div className="flex items-center justify-between text-xs text-vamu-gray-dark pt-2 px-1">
              <span>Perfil ID: #VMU-89211</span>
              <button className="flex items-center gap-1 hover:text-vamu-dark cursor-pointer">
                <Share2 className="w-3.5 h-3.5" /> Compartilhar Perfil
              </button>
            </div>
          </div>
        </div>
      </main>

      <DashFooter />
    </div>
  );
}
