interface ICity {
  label: string;
  enabled?: boolean;
}
export const cities: ICity[] = [
  { label: "Ancón" },
  { label: "Ate Vitarte" },
  { label: "Barranco", enabled: true },
  { label: "Breña" },
  { label: "Carabayllo" },
  { label: "Chaclacayo" },
  { label: "Chorrillos" },
  { label: "Cieneguilla" },
  { label: "Comas" },
  { label: "El Agustino" },
  { label: "Independencia" },
  { label: "Jesús María", enabled: true },
  { label: "La Molina", enabled: true },
  { label: "La Victoria" },
  { label: "Lima" },
  { label: "Lince", enabled: true },
  { label: "Los Olivos" },
  { label: "Lurigancho" },
  { label: "Lurín" },
  { label: "Magdalena del Mar", enabled: true },
  { label: "Miraflores", enabled: true },
  { label: "Pachacamac" },
  { label: "Pucusana" },
  { label: "Pueblo Libre", enabled: true },
  { label: "Puente Piedra" },
  { label: "Punta Hermosa" },
  { label: "Punta Negra" },
  { label: "Rímac" },
  { label: "San Bartolo" },
  { label: "San Borja", enabled: true },
  { label: "San Isidro", enabled: true },
  { label: "San Juan de Lurigancho" },
  { label: "San Juan de Miraflores" },
  { label: "San Luis" },
  { label: "San Martín de Porres" },
  { label: "San Miguel", enabled: true },
  { label: "Santa Anita" },
  { label: "Santa María del Mar" },
  { label: "Santa Rosa" },
  { label: "Santiago de Surco", enabled: true },
  { label: "Surquillo", enabled: true },
  { label: "Villa El Salvador" },
  { label: "Villa María del Triunfo" },
];

export const citiesOptions: string[] = cities.filter(city => city.enabled).map(city => city.label);
