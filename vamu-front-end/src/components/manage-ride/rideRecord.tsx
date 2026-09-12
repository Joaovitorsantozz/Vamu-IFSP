import { ArrowRight } from "lucide-react";

export default function RideRecord(){
    return (
        <div className="bg-white rounded-2xl border border-vamu-border overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-vamu-gray text-[11px] font-bold text-vamu-gray-dark uppercase tracking-widest border-b border-vamu-border">
                  <th className="px-6 py-4">Rota</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Com quem</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-vamu-border hover:bg-vamu-gray/30 transition">
                  <td className="px-6 py-4 font-semibold text-vamu-dark">
                    Terminal Barra Funda{" "}
                    <ArrowRight className="inline w-3 h-3 mx-1 text-vamu-green" />{" "}
                    UNESP
                  </td>
                  <td className="px-6 py-4 text-vamu-gray-dark">
                    22 Out, 2024
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-vamu-gray-light rounded-full"></div>
                      <span className="text-vamu-gray-dark">Ana Julia L.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-vamu-gray-light text-vamu-gray-dark text-[10px] font-bold px-2 py-1 rounded">
                      FINALIZADA
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-vamu-gray/30 transition">
                  <td className="px-6 py-4 font-semibold text-vamu-dark">
                    Home Office{" "}
                    <ArrowRight className="inline w-3 h-3 mx-1 text-vamu-green" />{" "}
                    Mackenzie
                  </td>
                  <td className="px-6 py-4 text-vamu-gray-dark">
                    20 Out, 2024
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-vamu-gray-light rounded-full"></div>
                      <span className="text-vamu-gray-dark">Felipe M.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-vamu-gray-light text-vamu-gray-dark text-[10px] font-bold px-2 py-1 rounded">
                      FINALIZADA
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    );
}