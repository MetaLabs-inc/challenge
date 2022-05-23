export type OuterProps = {
  // TODO: Improve typing with Prisma
  setStoredCurrentShift: (currentShift: any) => void
  setStoredShifts: (shifts: any) => void
  setTimer: (seconds: number) => void
  storedCurrentShift: any
  storedShifts: any
}

export const useShiftHandlers = (
  setStoredCurrentShift: OuterProps['setStoredCurrentShift'],
  setStoredShifts: OuterProps['setStoredShifts'],
  setTimer: OuterProps['setTimer'],
  storedCurrentShift: OuterProps['storedCurrentShift'],
  storedShifts: OuterProps['storedShifts']
) => {
  const startShift = async () =>{
    const response = await fetch(`http://localhost:3000/api/shifts`, {
      method: 'POST',
      body: JSON.stringify({
        startedAt: new Date(),
      })
    });
    setStoredCurrentShift(await response.json());
  }
  
  const endShift = async (shiftId: number) =>{
    // TODO: Move to endpoints to networking module
    const response = await fetch(`http://localhost:3000/api/shifts/${shiftId}/end`, {
      method: 'PUT',
      body: JSON.stringify({
        finishedAt: new Date(),
      })
    });
    setStoredCurrentShift(undefined)
    setStoredShifts([...storedShifts, await response.json()])
  }
  
  const handleOnShift = async () => {
    if(!!storedCurrentShift) {
      await endShift(storedCurrentShift?.id)
    }else{
      setTimer(0);
      await startShift();
    }
  }

  return { handleOnShift }
}