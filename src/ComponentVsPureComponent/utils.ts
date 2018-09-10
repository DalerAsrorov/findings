export const getCurrentGeoLocation = (): Promise<Coords> =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }: { coords: Coords }) => {
          resolve({ longitude, latitude });
        },
        (error: PositionError) => reject(error)
      );
    } else {
      reject(Error('No navigator available in window object'));
    }
  });
