export const getCurrentGeoLocation = (): Promise<Coords> =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({
          coords: { longitude, latitude }
        }: {
          coords: { latitude: number; longitude: number };
        }) => {
          resolve({ longitude, latitude });
        },
        (error: PositionError) => reject(error)
      );
    } else {
      reject(Error('No navigator available in window object'));
    }
  });
