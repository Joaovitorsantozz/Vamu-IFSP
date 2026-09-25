import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Flag, Share2 } from "lucide-react";

import UserNavbar from "../components/userNavbar";
import DashFooter from "../components/dashFooter";

import {
  getDriverCarInformation,
  getDriverInfoService,
} from "../service/driverReview";
import type { DriverCar, DriverInformation } from "../types/driver";
import DriverCompliments from "../components/driver-review-page/driverCompliments";
import DriverNextRideCard from "../components/driver-review-page/driverNextRide";
import DriverRatings from "../components/driver-review-page/driverRatings";
import DriverReports from "../components/driver-review-page/driverReports";
import DriverHeader from "../components/driver-review-page/driverReviewHeader";
import DriverSafetyRules from "../components/driver-review-page/driverSafetyRules";

export default function DriverReviewPage() {
  const { driver_id } = useParams<{ driver_id: string }>();
  const [driver, setDriver] = useState<DriverInformation>();
  const [driverCar, setDriverCar] = useState<DriverCar>();

  useEffect(() => {
    if (!driver_id) return;

    const fetchDriverInfo = async () => {
      try {
        const driverInfoResponse = await getDriverInfoService(driver_id);
        setDriver(driverInfoResponse.data.userInformation);

        const driverCarResponse = await getDriverCarInformation(driver_id);
        setDriverCar(driverCarResponse.data.result);
      } catch (error) {
        console.error("Erro ao buscar informações do motorista:", error);
      }
    };

    fetchDriverInfo();
  }, [driver_id]);

  if (!driver_id) return null;

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
            <span className="w-2 h-2 bg-vamu-green rounded-full animate-pulse" />
            Motorista verificado ativo no Campus Central
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
     
        <div className="lg:col-span-8 space-y-6">
          <DriverHeader driver={driver} driverCar={driverCar} />
          <DriverRatings />
          <DriverCompliments driverName={driver?.nome} />
          <DriverReports />
        </div>

       
        <div className="lg:col-span-4 space-y-6">
          <DriverNextRideCard driverName={driver?.nome} />
          <DriverSafetyRules />

    
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
