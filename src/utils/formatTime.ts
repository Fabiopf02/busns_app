export function formatTime(time: Date[]): string {
  let formated = '';
  time.forEach((t: Date, i: number) => {
    t = new Date(t);
    let f = t.toLocaleTimeString().substr(0, 5);

    formated += time.length > 1 ? (i + 1 === time.length ? f : f + ' - ') : f;
  });

  return formated;
}
