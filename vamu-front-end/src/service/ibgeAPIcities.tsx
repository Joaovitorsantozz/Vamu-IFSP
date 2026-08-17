export type CityOption = {
  value: string;
  label: string;
};

export async function fetchBrazilianCities(
  text: string,
): Promise<CityOption[]> {
  if (!text || text.length < 2) return [];
  try {
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome",
    );
    const data = await response.json();
    const filtered = data.filter((city: any) =>
      city.nome.toLowerCase().includes(text.toLowerCase()),
    );
    return filtered.slice(0, 50).map((city: any) => {
      const uf =
        city?.microrregiao?.mesorregiao?.UF?.sigla ||
        city?.["regiao-imediata"]?.["regiao-intermediaria"]?.UF?.sigla ||
        "";

      const nameWithUf = uf ? `${city.nome} - ${uf}` : city.nome;

      return {
        value: nameWithUf,
        label: nameWithUf,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    return [];
  }
}
