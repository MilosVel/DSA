import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {


  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) {
      console.log('Ovo se izvrsava samo na pocetku', jsonValue)
      return JSON.parse(jsonValue)
    }

    if (typeof initialValue === "function") {
      return (initialValue as () => T)()
    }

    else {
      console.log('Inicijalna vrednost  ... ')
      return initialValue
    }
  })

  useEffect(() => {
    console.log('Izvrsnje use Effecta')
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}
