import React from 'react'
import { useEffect, useState } from 'react'
import { GameContext } from './GameContext'
export const CardProvider = ({ children }) => {
  const url = 'http://localhost:3000/games'

  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try{
      const response = await fetch(url)
      const data = await response.json()
      setGames(data)
    }
    catch(e){
      console.log("error en api"+e)
    }
  }

  useEffect(() => {
      fetchGames()

  }, [])

  return (
      <GameContext.Provider value={{games}}>
          {children}
      </GameContext.Provider>
  )
}
