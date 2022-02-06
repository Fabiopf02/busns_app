const days = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];
const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function formatDate(date: Date) {
  date = new Date(date);
  const day = date.getDay();
  const monthDay = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${days[day]}, ${monthDay} de ${months[month]} de ${year}`;
}
